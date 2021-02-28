﻿// <auto-generated />
using System;
using ACUHelpdesk.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ACUHelpdesk.Migrations
{
    [DbContext(typeof(ACUContext))]
    partial class ACUContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ACUHelpdesk.Models.Country", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Alpha2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Alpha3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameAR")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Country");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Alpha2 = "DZ",
                            Alpha3 = "DZA",
                            Name = "Algeria",
                            NameAR = "الجزائر"
                        },
                        new
                        {
                            Id = 2,
                            Alpha2 = "BH",
                            Alpha3 = "BHR",
                            Name = "Bahrain",
                            NameAR = "البحرين "
                        },
                        new
                        {
                            Id = 3,
                            Alpha2 = "KM",
                            Alpha3 = "COM",
                            Name = "Comoros",
                            NameAR = "جزر القمر"
                        },
                        new
                        {
                            Id = 4,
                            Alpha2 = "DJ",
                            Alpha3 = "DJI",
                            Name = "Djibouti",
                            NameAR = "جيبوتي"
                        },
                        new
                        {
                            Id = 5,
                            Alpha2 = "EG",
                            Alpha3 = "EGY",
                            Name = "Egypt",
                            NameAR = "مصر"
                        },
                        new
                        {
                            Id = 6,
                            Alpha2 = "IQ",
                            Alpha3 = "IRQ",
                            Name = "Iraq",
                            NameAR = "العراق"
                        },
                        new
                        {
                            Id = 7,
                            Alpha2 = "JO",
                            Alpha3 = "JOR",
                            Name = "Jordan",
                            NameAR = "الأردن"
                        },
                        new
                        {
                            Id = 8,
                            Alpha2 = "KW",
                            Alpha3 = "KWT",
                            Name = "Kuwait",
                            NameAR = "الكويت"
                        },
                        new
                        {
                            Id = 9,
                            Alpha2 = "LB",
                            Alpha3 = "LBN",
                            Name = "Lebanon",
                            NameAR = "لبنان"
                        },
                        new
                        {
                            Id = 10,
                            Alpha2 = "LY",
                            Alpha3 = "LBY",
                            Name = "Libya",
                            NameAR = "ليبيا"
                        },
                        new
                        {
                            Id = 11,
                            Alpha2 = "MR",
                            Alpha3 = "MRT",
                            Name = "Mauritania",
                            NameAR = "موريتانيا"
                        },
                        new
                        {
                            Id = 12,
                            Alpha2 = "MA",
                            Alpha3 = "MAR",
                            Name = "Morocco",
                            NameAR = "المغرب"
                        },
                        new
                        {
                            Id = 13,
                            Alpha2 = "OM",
                            Alpha3 = "OMN",
                            Name = "Oman",
                            NameAR = "عمان"
                        },
                        new
                        {
                            Id = 14,
                            Alpha2 = "PL",
                            Alpha3 = "PSE",
                            Name = "Palestine",
                            NameAR = "فلسطين"
                        },
                        new
                        {
                            Id = 15,
                            Alpha2 = "QA",
                            Alpha3 = "QAT",
                            Name = "Qatar",
                            NameAR = "قطر"
                        },
                        new
                        {
                            Id = 16,
                            Alpha2 = "SA",
                            Alpha3 = "SAU",
                            Name = "Saudi Arabia",
                            NameAR = "السعودية"
                        },
                        new
                        {
                            Id = 17,
                            Alpha2 = "SM",
                            Alpha3 = "SOM",
                            Name = "Somalia",
                            NameAR = "الصومال"
                        },
                        new
                        {
                            Id = 18,
                            Alpha2 = "SD",
                            Alpha3 = "SDN",
                            Name = "Sudan",
                            NameAR = "السودان"
                        },
                        new
                        {
                            Id = 19,
                            Alpha2 = "SY",
                            Alpha3 = "SYR",
                            Name = "Syria",
                            NameAR = "سوريا"
                        },
                        new
                        {
                            Id = 20,
                            Alpha2 = "TN",
                            Alpha3 = "TUN",
                            Name = "Tunisia",
                            NameAR = "تونس"
                        },
                        new
                        {
                            Id = 21,
                            Alpha2 = "AE",
                            Alpha3 = "ARE",
                            Name = "United Arab Emirates",
                            NameAR = "الإمارات العربية المتحدة"
                        },
                        new
                        {
                            Id = 22,
                            Alpha2 = "YE",
                            Alpha3 = "YEM",
                            Name = "Yemen",
                            NameAR = "اليمن"
                        });
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Negotiation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("NegCreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NegInitiatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("NegName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NegStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NegSubject")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Negotiation");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationDiscussion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AttName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AttPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MessageType")
                        .HasColumnType("int");

                    b.Property<int?>("NegotiationId")
                        .HasColumnType("int");

                    b.Property<int?>("SenderId")
                        .HasColumnType("int");

                    b.Property<DateTime>("SentAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("NegotiationId");

                    b.HasIndex("SenderId");

                    b.ToTable("NegotiationDiscussion");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationMember", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("ActionAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("MemberStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NegotiationId")
                        .HasColumnType("int");

                    b.Property<bool>("Notified")
                        .HasColumnType("bit");

                    b.Property<bool>("OnlineStatus")
                        .HasColumnType("bit");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("isLeader")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("NegotiationId");

                    b.HasIndex("UserId");

                    b.ToTable("NegotiationMember");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("NegotiationId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Tariff")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("NegotiationId");

                    b.HasIndex("ProductId");

                    b.ToTable("NegotiationProduct");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NomenclatureCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ParentCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ParentID")
                        .HasColumnType("int");

                    b.Property<string>("ProductCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductDescriptionAR")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Tier")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            Name = "User"
                        });
                });

            modelBuilder.Entity("ACUHelpdesk.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("ActivationDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("CountryId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("NegPassCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("NegPassCodeExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("PassCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PassCodeExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CountryId");

                    b.HasIndex("RoleId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Active = true,
                            Avatar = "ismat.jpg",
                            CountryId = 9,
                            Email = "ismat.ayash@gmail.com",
                            FirstName = "عصمت",
                            LastName = "العياش",
                            Password = "AQAAAAEAACcQAAAAEOVQrrCPbmeGSgyix1j4eHNmLMsCfG5GXVdPrVeJlN42efks55KahBe8cTUtwuPWVA==",
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            Active = true,
                            Avatar = "layale.jpg",
                            CountryId = 7,
                            Email = "layale@gmail.com",
                            FirstName = "ليال",
                            LastName = "باسيل",
                            Password = "AQAAAAEAACcQAAAAEDQIROK6W833BSOhOt1LJrEY7iTrY/eKs3615GAfwx/BNj6eq+DjzDqqOFdH3JoG0Q==",
                            RoleId = 1
                        },
                        new
                        {
                            Id = 3,
                            Active = true,
                            Avatar = "",
                            CountryId = 12,
                            Email = "alexy.ayash@gmail.com",
                            FirstName = "أليكسي",
                            LastName = "العياش",
                            Password = "AQAAAAEAACcQAAAAEL+eEJUNUYVAxjEyCa54FnkRhLg0o981DKMlTp2Bglc1HBSJd0u98jDRa3aSP9tiXg==",
                            RoleId = 2
                        },
                        new
                        {
                            Id = 4,
                            Active = true,
                            Avatar = "",
                            CountryId = 1,
                            Email = "oayyash@bankofbeirut.com",
                            FirstName = "وردة",
                            LastName = "الجزائرية",
                            Password = "AQAAAAEAACcQAAAAEAbNe1RRR9GD4UxiJtHAI9Y3EmL9LHmIpgKIP4gIWBX6+vDoT3xnmzgA8oJkUFnbQw==",
                            RoleId = 2
                        });
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Negotiation", b =>
                {
                    b.HasOne("ACUHelpdesk.Models.User", "NegCreatedBy")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("NegCreatedBy");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationDiscussion", b =>
                {
                    b.HasOne("ACUHelpdesk.Models.Negotiation", "Negotiation")
                        .WithMany()
                        .HasForeignKey("NegotiationId");

                    b.HasOne("ACUHelpdesk.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId");

                    b.Navigation("Negotiation");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationMember", b =>
                {
                    b.HasOne("ACUHelpdesk.Models.Negotiation", "Negotiation")
                        .WithMany("NegotiationMembers")
                        .HasForeignKey("NegotiationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ACUHelpdesk.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Negotiation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.NegotiationProduct", b =>
                {
                    b.HasOne("ACUHelpdesk.Models.Negotiation", "Negotiation")
                        .WithMany("NegotiationProducts")
                        .HasForeignKey("NegotiationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ACUHelpdesk.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Negotiation");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.User", b =>
                {
                    b.HasOne("ACUHelpdesk.Models.Country", "Country")
                        .WithMany("User")
                        .HasForeignKey("CountryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ACUHelpdesk.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Country");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Country", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Negotiation", b =>
                {
                    b.Navigation("NegotiationMembers");

                    b.Navigation("NegotiationProducts");
                });

            modelBuilder.Entity("ACUHelpdesk.Models.Role", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
