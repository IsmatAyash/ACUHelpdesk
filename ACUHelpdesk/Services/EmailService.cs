using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using ACUHelpdesk.Helpers;

namespace ACUHelpdesk.Services
{
    public interface IEmailService
    {
        void Send(string to, string subject, string html, string from = null);
    }
    public class EmailService : IEmailService
    {
        private readonly AppSettings _appSettings;

        public EmailService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public void Send(string to, string subject, string html, string from = null)
        {
            var tos = to.Split(',');
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_appSettings.EmailFrom));
            for(var i = 0; i < tos.Length; i++)
                email.To.Add(MailboxAddress.Parse(tos[i]));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect(_appSettings.SmtpHost, _appSettings.SmtpPort, SecureSocketOptions.StartTls);
            smtp.Authenticate(_appSettings.SmtpUser, _appSettings.SmtpPass);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
        
    }
}