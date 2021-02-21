using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class NegotiationMember
    {
        [Key]
        public int Id { get; set; }
        public string MemberStatus { get; set; }
        public DateTime? ActionAt { get; set; }
        public bool isLeader { get; set; }
        public bool OnlineStatus { get; set; }
        [ForeignKey("Negotiation")]
        public int NegotiationId { get; set; }
        public virtual Negotiation Negotiation { get; set; }
        [ForeignKey("User")]
        public int? UserId { get; set; }
        public virtual User User { get; set; }
    }
}
