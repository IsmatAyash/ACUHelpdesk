using System.ComponentModel.DataAnnotations;
namespace ACUHelpdesk.ViewModels
{
    public class VerifyEmailRequest
    {
        [Required]
        public string PassCode { get; set; }
    }
}