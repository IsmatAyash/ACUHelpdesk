using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using System.Collections.Generic;

namespace ACUHelpdesk.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string FirstName { get; set; }
        [Column(TypeName = "nvarchar(50)")]

        public string LastName { get; set; }
        [Column(TypeName = "nvarchar(256)")]

        public string Avatar { get; set; }
        public string Password { get; set; }
        [DefaultValue(false)]
        public bool Active { get; set; }
        public string PassCode { get; set; }
        public DateTime? PassCodeExpires { get; set; }
        public string NegPassCode { get; set; }
        public DateTime? NegPassCodeExpires { get; set; }
        public int RoleId { get; set; }
        public int CountryId { get; set; }
        public DateTime? ActivationDate { get; set; }
        [DefaultValue(2)]

        public virtual Role Role { get; set; }
        public virtual Country Country { get; set; }
        [NotMapped]
        public string AvatarFile { get; set; }
        [NotMapped]
        [DefaultValue("/images/avatarPlaceholder.png")]

        public string AvatarSrc { get; set; }
    }
}
