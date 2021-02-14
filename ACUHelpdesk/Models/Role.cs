using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ACUHelpdesk.Models
{
    public class Role
    {
        [Key]
        public int Id {get;set;}
        public string Name { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
