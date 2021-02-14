using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string NomenclatureCode { get; set; }
        public Nullable<int> Tier { get; set; }
        public string ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public string ProductDescriptionAR { get; set; }
        public Nullable<int> ParentID { get; set; }
        public string ParentCode { get; set; }
    }
}
