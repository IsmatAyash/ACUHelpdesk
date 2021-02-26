using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.ViewModels
{
    public class Products
    {
        public string Label { get; set; }
        public int Value { get; set; }
        public bool Checked { get; set; }
        public int? ParentID { get; set; }
        public int? Tier { get; set; }
        public string ProductCode { get; set; }
    }
}
