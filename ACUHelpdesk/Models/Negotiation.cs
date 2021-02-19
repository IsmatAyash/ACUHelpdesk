using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ACUHelpdesk.Models
{
    public class Negotiation
    {
        [Key]
        public int Id { get; set; }
        public string NegName { get; set; }
        public string NegSubject { get; set; }
        public string NegStatus { get; set; }
        public DateTime NegCreatedAt { get; set; }
        public DateTime NegInitiatedAt { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<NegotiationMember> NegotiationMembers { get; set; }
        public virtual ICollection<NegotiationProduct> NegotiationProducts { get; set; }
    }
}
