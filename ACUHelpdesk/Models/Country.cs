using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ACUHelpdesk.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameAR { get; set; }
        public string Alpha2 { get; set; }
        public string Alpha3 { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
