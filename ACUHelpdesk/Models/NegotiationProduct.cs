using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class NegotiationProduct
    {
        [Key]
        public int Id { get; set; }
        public Nullable<decimal> Tariff { get; set; }
        public virtual Product Product { get; set; }
        public virtual Negotiation Negotiation { get; set; }
    }
}
