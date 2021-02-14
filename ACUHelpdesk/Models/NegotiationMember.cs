using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class NegotiationMember
    {
        [Key]
        public int Id { get; set; }
        public int Status { get; set; }
        public DateTime ActionAt { get; set; }
        public virtual Negotiation Negotiation { get; set; }
        public virtual User User { get; set; }
    }
}
