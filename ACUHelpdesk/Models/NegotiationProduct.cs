using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ACUHelpdesk.Models
{
    public class NegotiationProduct
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "decimal(10,3)")]
        public decimal? Tariff { get; set; }
        public string Remarks { get; set; }
        
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        
        [ForeignKey("Negotiation")]
        public int NegotiationId { get; set; }
        public virtual Negotiation Negotiation { get; set; }
    }
}
