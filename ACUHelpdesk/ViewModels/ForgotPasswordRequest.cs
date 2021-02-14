using System.ComponentModel.DataAnnotations;

namespace ACUHelpdesk.ViewModels
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
        
}