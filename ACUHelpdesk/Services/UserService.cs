using ACUHelpdesk.Models;
using ACUHelpdesk.Helpers;
using ACUHelpdesk.ViewModels;
using CryptoHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ACUHelpdesk.Services
{
    public interface IUserService
    {
        AuthResponse Auth(AuthRequest model);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Register(AddUserRequest model, string origin);
        void VerifyEmail(string passcode);
        void ForgotPassword(ForgotPasswordRequest model, string origin);
    }
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly ACUContext _context;
        private readonly IEmailService _emailService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public UserService(IOptions<AppSettings> appSettings, ACUContext context, IEmailService emailService, IWebHostEnvironment hostEnvironment)
        {
            _appSettings = appSettings.Value;
            _context = context;
            _emailService = emailService;
            _hostEnvironment = hostEnvironment;
        }

        public AuthResponse Auth(AuthRequest model)
        {
            var user = _context.Users
                               .Include(r => r.Role)
                               .Include(c => c.Country)
                               .SingleOrDefault(x => x.Email == model.Email && x.Active == true);

            // return null if user is not active
            if (user == null) return null;

            var passwordValid = VerifyPassword(model.Password, user.Password);
            if (!passwordValid) return null;

            // authentication successful so generate jwt token
            var token = GenerateJwtToken(user);

            return new AuthResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(r => r.Role).Include(c => c.Country).ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

        public User Register(AddUserRequest model, string origin)
        {
            var usr = _context.Users.FirstOrDefault(x => x.Email == model.Email);
            if (usr != null) {
                sendAlreadyRegisteredEmail(model.Email, origin);
                return null;
            }


            User user = new User();
            _context.Users.Add(user);

            user.Email = model.Email;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.CountryId = (int)model.CountryId;
            user.RoleId = 2;
            user.Active = false;
            user.PassCode = randomPassCode();
            user.PassCodeExpires = DateTime.UtcNow.AddDays(1);
            user.Password = HashPassword(model.Password);
            user.Avatar = SaveImage(model.AvatarFile);
            _context.SaveChanges();

            sendActivationEmail(user, origin);

            return user;
        }

        public string SaveImage(IFormFile avatarFile) 
        {
            string avatarName = new String(Path.GetFileNameWithoutExtension(avatarFile.FileName).Take(10).ToArray()).Replace(' ','-');
            avatarName = avatarName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(avatarFile.FileName);
            var avatarPath = Path.Combine(_hostEnvironment.ContentRootPath, "Content/Avatars", avatarName);
            using (var fileStream = new FileStream(avatarPath, FileMode.Create))
            {
                avatarFile.CopyTo(fileStream);
            }
            return avatarName;
        }
        public void VerifyEmail(string passcode)
        {
            var user = _context.Users.SingleOrDefault(x => x.PassCode == passcode);

            if (user == null) throw new AppException("Activation failed");

            user.ActivationDate = DateTime.UtcNow;
            user.Active = true;

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void ForgotPassword(ForgotPasswordRequest model, string origin)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == model.Email);

            // always return ok response to prevent email enumeration
            if (user == null) return;

            // create reset passcode that expires after 1 day
            user.PassCode = randomPassCode();
            user.PassCodeExpires = DateTime.UtcNow.AddDays(1);

            _context.Users.Update(user);
            _context.SaveChanges();

            // send email
            sendPasswordResetEmail(user, origin);
        }

        // helper methods
        private string randomPassCode()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        private void sendActivationEmail(User user, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var verifyUrl = $"{origin}/verify-email?passcode={user.PassCode}";
                    message = $@"<p>Please click the below link to activate your ACU Helpdesk account:</p>
                                 <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below passcode to verify your email address with the 
                             <code>/verify-email</code> api route:</p>
                             <p><code>{user.PassCode}</code></p>";
            }

            _emailService.Send(
                to: user.Email,
                subject: "Sign-up to ACU Helpdesk - Verify Email",
                html: $@"<h4>Verify Email</h4>
                         <p>Thanks for registering!</p>
                         {message}"
            );
        }

        private void sendAlreadyRegisteredEmail(string email, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
                message = $@"<p>If you don't know your password please visit the <a href=""{origin}/account/forgot-password"">forgot password</a> page.</p>";
            else
                message = "<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>";

            _emailService.Send(
                to: email,
                subject: "Sign-up to ACU Helpdesk - Email Already Registered",
                html: $@"<h4>Email Already Registered</h4>
                         <p>Your email <strong>{email}</strong> is already registered.</p>
                         {message}"
            );
        }

        private void sendPasswordResetEmail(User user, string origin)
        {
            string message;
            message = $@"<p>Please use the below Passcode to reset your password using your user profile page 'Reset Password' option</p>
            <p><code>{user.PassCode}</code></p>";

            _emailService.Send(
                to: user.Email,
                subject: "Sign-up to ACU Helpdesk - Reset Password",
                html: $@"<h4>Reset Password Email</h4>
                         {message}"
            );
        }

        //private static byte[] ConvertToByteArray(string str, Encoding encoding)
        //{
        //    return encoding.GetBytes(str);
        //}

        //private static String ToBinary(Byte[] data)
        //{
        //    return string.Join(" ", data.Select(byt => Convert.ToString(byt, 2).PadLeft(8, '0')));
        //}

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.JWTSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return Crypto.VerifyHashedPassword(hashedPassword, actualPassword);
        }
    }
}