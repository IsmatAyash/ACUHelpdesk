using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.ViewModels
{
    public class NegInvitationRequest
    {
        [Required]
        public int Id { get; set; }
        public string Selection { get; set; }
    }
}
