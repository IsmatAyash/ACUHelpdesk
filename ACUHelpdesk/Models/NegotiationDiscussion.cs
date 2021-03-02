using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static ACUHelpdesk.Helpers.GlobalHelpers;

namespace ACUHelpdesk.Models
{
    public class NegotiationDiscussion
    {
        [Key]
        public int Id { get; set; }
        public int NegotiationId { get; set; }
        public virtual Negotiation Negotiation { get; set; }
        public virtual User Sender { get; set; }
        public string Message { get; set; }
        public string AttName { get; set; }
        public string AttPath { get; set; }
        public DateTime SentAt { get; set; }
        public int MessageType { get; set; }

    }
}
