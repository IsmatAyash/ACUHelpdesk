using ACUHelpdesk.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.ViewModels
{
    public class AuthResponse
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public string Alpha2 { get; set; }
        public string Token { get; set; }
        public string Avatar { get; set; }
        public string AvatarSrc { get; set; }


        public AuthResponse(User user, string token)
        {
            UserId = user.Id;
            Email = user.Email;
            FullName = user.FirstName + ' ' + user.LastName;
            Role = user.Role.Name;
            Alpha2 = user.Country.Alpha2;
            Avatar = user.Avatar;
            Token = token;
            AvatarSrc = "";
        }
    }
}
