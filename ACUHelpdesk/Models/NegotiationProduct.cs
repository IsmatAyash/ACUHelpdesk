using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class NegotiationProduct
    {
        [Key]
        public int Id { get; set; }
        public Nullable<decimal> Tariff { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        [ForeignKey("Negotiation")]
        public int NegotiationId { get; set; }
        public virtual Negotiation Negotiation { get; set; }
    }
}
