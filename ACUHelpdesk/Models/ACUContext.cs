using Microsoft.EntityFrameworkCore;
using CryptoHelper;

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
                        .HasOne(n => n.Negotiation)
                        .WithMany(np => np.NegotiationProducts)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NegotiationMember>()
                        .HasOne(n => n.Negotiation)
                        .WithMany(nm => nm.NegotiationMembers)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<NegotiationDiscussion>()
                        .HasOne(n => n.Negotiation)
                        .WithMany(nd => nd.NegotiationDiscussions)
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
                    Id = 2,
                    RoleId = 1,
                    CountryId = 7,
                    Email = "layale@gmail.com",
                    FirstName = "ليال",
                    LastName = "باسيل",
                    Password = Crypto.HashPassword("admin"),
                    Active = true,
                    Avatar = "layale.jpg"
                });
        }
    }
}
