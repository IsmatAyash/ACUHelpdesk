using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACUHelpdesk.Models
{
    public class AppConfig
    {
        [Key]
        public int Id { get; set; }
        public string PassCode { get; set; }
    }
}
