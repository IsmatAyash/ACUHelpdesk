using ACUHelpdesk.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.ViewModels
{
    public class NegPasscodeResponse
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public string NegPassCode { get; set; }


        public NegPasscodeResponse(User user)
        {
            Email = user.Email;
            FullName = user.FirstName + ' ' + user.LastName;
            NegPassCode = user.NegPassCode;
        }

    }
}
