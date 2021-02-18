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
        public string Subject { get; set; }
        public int Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime InitiatedAt { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<NegotiationMember> Members { get; set; }
        public virtual ICollection<NegotiationProduct> Products { get; set; }
    }
}
