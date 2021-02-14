
namespace ACUHelpdesk.Helpers
{
    public class AppSettings
    {
        public string JWTSecret { get; set; }

        // SMTP configuration setup properties
        public string EmailFrom { get; set; }
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUser { get; set; }
        public string SmtpPass { get; set; }
    }
}
