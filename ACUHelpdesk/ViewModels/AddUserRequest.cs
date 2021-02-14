using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace ACUHelpdesk.ViewModels
{
    public class AddUserRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public int CountryId { get; set; }
        public string Password { get; set; }
        public IFormFile AvatarFile { get; set; }
    }
}
