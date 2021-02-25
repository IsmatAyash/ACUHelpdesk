using ACUHelpdesk.Services;
using ACUHelpdesk.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace ACUHelpdesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("auth")]
        public IActionResult Authenticate(AuthRequest model)
        {
            var response = _userService.Auth(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            response.AvatarSrc = string.Format("{0}://{1}{2}/Content/Avatars/{3}", Request.Scheme, Request.Host, Request.PathBase, response.Avatar);

            return Ok(response);
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            var users = _userService.GetAll();
            return Ok(users);
        }

        [HttpGet("members/{negId}")]
        public IActionResult GetMembers(int negId)
        {

            var users = _userService.GetMembers(negId);
            return Ok(users);
        }

        [HttpGet("members-antd")]
        public IActionResult GetMembersAntd()
        {

            var users = _userService.GetMembersAntd();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user =  _userService.GetById(id);

            if (user == null)
            {
                return NotFound();
            }

            user.AvatarSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.Avatar);
            return Ok(user);
        }


        [HttpPost("register")]
        public IActionResult Register([FromForm] AddUserRequest model)
        {
            var user = _userService.Register(model, Request.Headers["origin"]);

            if (user == null) return BadRequest(new { message = "User with this email already exist" });

            return Ok(new { message = "Registration successful, please check your email for activation instructions" });
        }


        [HttpPost("verify-email")]
        public IActionResult VerifyEmail(VerifyEmailRequest model)
        {
            _userService.VerifyEmail(model.PassCode);
            return Ok(new { message = "Verification successful, you can now login" });
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(ForgotPasswordRequest model)
        {
            _userService.ForgotPassword(model, Request.Headers["origin"]);
            return Ok(new { message = "Please check your email for password reset instructions" });
        }

        [HttpPost("neg-passcode")]
        public IActionResult NegPassCode(ForgotPasswordRequest model)
        {
            var response = _userService.NegPassCode(model.Email);

            if (response == null) return BadRequest(new { message = "User was not found to generate a passcode for, registration required first" });

            return Ok(response);
        }

        // Helpers 
        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

        // POST api/<UserController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        // PUT api/<UserController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<UserController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
