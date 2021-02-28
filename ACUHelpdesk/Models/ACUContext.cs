using Microsoft.EntityFrameworkCore;
using CryptoHelper;
using System;
using ACUHelpdesk.Services;

namespace ACUHelpdesk.Models
{
    public class ACUContext : DbContext
    {
        public ACUContext(DbContextOptions<ACUContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Negotiation> Negotiations { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<NegotiationDiscussion> NegotiationDiscussions { get; set; }
        public DbSet<NegotiationMember> NegotiationMembers { get; set; }
        public DbSet<NegotiationProduct> NegotiationProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>().ToTable("Country");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Product>().ToTable("Product");
            modelBuilder.Entity<Negotiation>().ToTable("Negotiation");
            modelBuilder.Entity<NegotiationMember>().ToTable("NegotiationMember");
            modelBuilder.Entity<NegotiationProduct>().ToTable("NegotiationProduct");
            modelBuilder.Entity<NegotiationDiscussion>().ToTable("NegotiationDiscussion");

            modelBuilder.Entity<NegotiationProduct>()
                        .HasOne(np => np.Negotiation)
                        .WithMany(np => np.NegotiationProducts)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NegotiationMember>()
                        .HasOne(nm => nm.Negotiation)
                        .WithMany(nm => nm.NegotiationMembers)
                        .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "User" });

            //modelBuilder.Entity<Product>().HasData(
            //    new Product { Id = 1, NomenclatureCode = "HS", Tier = 2, ProductCode = "0101", ProductDescriptionAR = "خيول وحمير", ParentID = null, ParentCode = "" },
            //    new Product { Id = 2, NomenclatureCode = "HS", Tier = 3, ProductCode = "010101", ProductDescriptionAR = "خيول وحمير 2", ParentID = 1, ParentCode = "0101" },
            //    new Product { Id = 3, NomenclatureCode = "HS", Tier = 3, ProductCode = "010102", ProductDescriptionAR = "خيول وحمير 1", ParentID = 1, ParentCode = "0101" });


            modelBuilder.Entity<Country>().HasData(
                new Country { Id = 1, Name = "Algeria", NameAR = "الجزائر", Alpha2 = "DZ", Alpha3 = "DZA" },
                new Country { Id = 2, Name = "Bahrain", NameAR = "البحرين ", Alpha2 = "BH", Alpha3 = "BHR" },
                new Country { Id = 3, Name = "Comoros", NameAR = "جزر القمر", Alpha2 = "KM", Alpha3 = "COM" },
                new Country { Id = 4, Name = "Djibouti", NameAR = "جيبوتي", Alpha2 = "DJ", Alpha3 = "DJI" },
                new Country { Id = 5, Name = "Egypt", NameAR = "مصر", Alpha2 = "EG", Alpha3 = "EGY" },
                new Country { Id = 6, Name = "Iraq", NameAR = "العراق", Alpha2 = "IQ", Alpha3 = "IRQ" },
                new Country { Id = 7, Name = "Jordan", NameAR = "الأردن", Alpha2 = "JO", Alpha3 = "JOR" },
                new Country { Id = 8, Name = "Kuwait", NameAR = "الكويت", Alpha2 = "KW", Alpha3 = "KWT" },
                new Country { Id = 9, Name = "Lebanon", NameAR = "لبنان", Alpha2 = "LB", Alpha3 = "LBN" },
                new Country { Id = 10, Name = "Libya", NameAR = "ليبيا", Alpha2 = "LY", Alpha3 = "LBY" },
                new Country { Id = 11, Name = "Mauritania", NameAR = "موريتانيا", Alpha2 = "MR", Alpha3 = "MRT" },
                new Country { Id = 12, Name = "Morocco", NameAR = "المغرب", Alpha2 = "MA", Alpha3 = "MAR" },
                new Country { Id = 13, Name = "Oman", NameAR = "عمان", Alpha2 = "OM", Alpha3 = "OMN" },
                new Country { Id = 14, Name = "Palestine", NameAR = "فلسطين", Alpha2 = "PL", Alpha3 = "PSE" },
                new Country { Id = 15, Name = "Qatar", NameAR = "قطر", Alpha2 = "QA", Alpha3 = "QAT" },
                new Country { Id = 16, Name = "Saudi Arabia", NameAR = "السعودية", Alpha2 = "SA", Alpha3 = "SAU" },
                new Country { Id = 17, Name = "Somalia", NameAR = "الصومال", Alpha2 = "SM", Alpha3 = "SOM" },
                new Country { Id = 18, Name = "Sudan", NameAR = "السودان", Alpha2 = "SD", Alpha3 = "SDN" },
                new Country { Id = 19, Name = "Syria", NameAR = "سوريا", Alpha2 = "SY", Alpha3 = "SYR" },
                new Country { Id = 20, Name = "Tunisia", NameAR = "تونس", Alpha2 = "TN", Alpha3 = "TUN" },
                new Country { Id = 21, Name = "United Arab Emirates", NameAR = "الإمارات العربية المتحدة", Alpha2 = "AE", Alpha3 = "ARE" },
                new Country { Id = 22, Name = "Yemen", NameAR = "اليمن", Alpha2 = "YE", Alpha3 = "YEM" });

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    RoleId = 1,
                    CountryId = 9,
                    Email = "ismat.ayash@gmail.com",
                    FirstName = "عصمت",
                    LastName = "العياش",
                    Password = Crypto.HashPassword("admin"),
                    Active = true,
                    Avatar = "ismat.jpg"
                }, 
                new User
                {
                    Id = 2,
                    RoleId = 1,
                    CountryId = 7,
                    Email = "layale@gmail.com",
                    FirstName = "ليال",
                    LastName = "باسيل",
                    Password = Crypto.HashPassword("admin"),
                    Active = true,
                    Avatar = "layale.jpg"
                },
                new User
                {
                    Id = 3,
                    RoleId = 2,
                    CountryId = 12,
                    Email = "alexy.ayash@gmail.com",
                    FirstName = "أليكسي",
                    LastName = "العياش",
                    Password = Crypto.HashPassword("aa291009"),
                    Active = true,
                    Avatar = ""
                },
                new User
                {
                    Id = 4,
                    RoleId = 2,
                    CountryId = 1,
                    Email = "oayyash@bankofbeirut.com",
                    FirstName = "وردة",
                    LastName = "الجزائرية",
                    Password = Crypto.HashPassword("oam007"),
                    Active = true,
                    Avatar = ""
                });

            //modelBuilder.Entity<Negotiation>().HasData(
            //    new Negotiation
            //    {
            //        Id = 1,
            //        NegName = "منصة التفاوض لبنان الأردن",
            //        NegSubject = "التعريفة الجمركية الموح",
            //        NegStatus = "Active",
            //        NegCreatedAt = new DateTime(2021, 2, 14),
            //        UserId = 1
            //    },
            //    new Negotiation 
            //    {
            //        Id = 2,
            //        NegName = "آليات التعويض والتضامن",
            //        NegSubject = "منصة التفاوض لبنان الأردن",
            //        NegStatus = "Pending",
            //        NegCreatedAt = new DateTime(2021, 1, 20),
            //        UserId = 1
            //    });

            //modelBuilder.Entity<NegotiationMember>().HasData(
            //    new NegotiationMember
            //    {
            //        Id = 1,
            //        MemberStatus = "Active",
            //        ActionAt = new DateTime(2021, 2, 14),
            //        UserId = 1,
            //        NegotiationId = 1,
            //        isLeader = true,
            //        OnlineStatus = true
            //    },
            //    new NegotiationMember
            //    {
            //        Id = 2,
            //        MemberStatus = "Active",
            //        ActionAt = new DateTime(2021, 2, 14),
            //        UserId = 2,
            //        NegotiationId = 1,
            //        isLeader = false,
            //        OnlineStatus = true
            //    });

            //modelBuilder.Entity<NegotiationProduct>().HasData(
            //    new NegotiationProduct
            //    {
            //        Id = 1,
            //        ProductId = 2,
            //        NegotiationId = 1,
            //        Tariff = (decimal)12.12
            //    },
            //    new NegotiationProduct
            //    {
            //        Id = 2,
            //        ProductId = 3,
            //        NegotiationId = 1,
            //        Tariff = (decimal)11.10
            //    });


            //modelBuilder.Entity<NegotiationMember>().HasData(
            //    new NegotiationMember
            //    {
            //        Id = 3,
            //        MemberStatus = "Active",
            //        ActionAt = new DateTime(2021, 2, 14),
            //        UserId = 1,
            //        NegotiationId = 2,
            //        isLeader = true,
            //        OnlineStatus = true,
            //    },
            //    new NegotiationMember
            //    {
            //        Id = 4,
            //        MemberStatus = "Active",
            //        ActionAt = new DateTime(2021, 2, 14),
            //        UserId = 2,
            //        NegotiationId = 2,
            //        isLeader = false,
            //        OnlineStatus = false
            //    });

            //modelBuilder.Entity<NegotiationProduct>().HasData(
            //    new NegotiationProduct
            //    {
            //        Id = 3,
            //        ProductId = 3,
            //        NegotiationId = 2,
            //        Tariff = (decimal)10.23
            //    });

        }
    }
}
