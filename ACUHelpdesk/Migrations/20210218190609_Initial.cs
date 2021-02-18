using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ACUHelpdesk.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Country",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameAR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Alpha2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Alpha3 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Country", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomenclatureCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tier = table.Column<int>(type: "int", nullable: true),
                    ProductCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductDescriptionAR = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ParentID = table.Column<int>(type: "int", nullable: true),
                    ParentCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Avatar = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    PassCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PassCodeExpires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NegPassCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NegPassCodeExpires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    CountryId = table.Column<int>(type: "int", nullable: false),
                    ActivationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Country_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Country",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Negotiation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InitiatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Negotiation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Negotiation_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationDiscussion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NegotiationId = table.Column<int>(type: "int", nullable: true),
                    SenderId = table.Column<int>(type: "int", nullable: true),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SentAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MessageType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NegotiationDiscussion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationDiscussion_Negotiation_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NegotiationDiscussion_User_SenderId",
                        column: x => x.SenderId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationMember",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActionAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isLeader = table.Column<bool>(type: "bit", nullable: false),
                    NegotiationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NegotiationMember", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationMember_Negotiation_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NegotiationMember_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tariff = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    NegotiationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NegotiationProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationProduct_Negotiation_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NegotiationProduct_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Country",
                columns: new[] { "Id", "Alpha2", "Alpha3", "Name", "NameAR" },
                values: new object[,]
                {
                    { 1, "DZ", "DZA", "Algeria", "الجزائر" },
                    { 22, "YE", "YEM", "Yemen", "اليمن" },
                    { 21, "AE", "ARE", "United Arab Emirates", "الإمارات العربية المتحدة" },
                    { 20, "TN", "TUN", "Tunisia", "تونس" },
                    { 19, "SY", "SYR", "Syria", "سوريا" },
                    { 18, "SD", "SDN", "Sudan", "السودان" },
                    { 17, "SM", "SOM", "Somalia", "الصومال" },
                    { 16, "SA", "SAU", "Saudi Arabia", "السعودية" },
                    { 15, "QA", "QAT", "Qatar", "قطر" },
                    { 13, "OM", "OMN", "Oman", "عمان" },
                    { 12, "MA", "MAR", "Morocco", "المغرب" },
                    { 14, "PL", "PSE", "Palestine", "فلسطين" },
                    { 10, "LY", "LBY", "Libya", "ليبيا" },
                    { 9, "LB", "LBN", "Lebanon", "لبنان" },
                    { 8, "KW", "KWT", "Kuwait", "الكويت" },
                    { 7, "JO", "JOR", "Jordan", "الأردن" },
                    { 6, "IQ", "IRQ", "Iraq", "العراق" },
                    { 5, "EG", "EGY", "Egypt", "مصر" },
                    { 4, "DJ", "DJI", "Djibouti", "جيبوتي" },
                    { 3, "KM", "COM", "Comoros", "جزر القمر" },
                    { 2, "BH", "BHR", "Bahrain", "البحرين " },
                    { 11, "MR", "MRT", "Mauritania", "موريتانيا" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "NomenclatureCode", "ParentCode", "ParentID", "ProductCode", "ProductDescription", "ProductDescriptionAR", "Tier" },
                values: new object[,]
                {
                    { 1, "HS", "", null, "0101", null, "خيول وحمير", 2 },
                    { 2, "HS", "0101", 1, "010101", null, "خيول وحمير 2", 3 },
                    { 3, "HS", "0101", 1, "010102", null, "خيول وحمير 1", 3 }
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "User" }
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "ActivationDate", "Active", "Avatar", "CountryId", "Email", "FirstName", "LastName", "NegPassCode", "NegPassCodeExpires", "PassCode", "PassCodeExpires", "Password", "RoleId" },
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "ismat.jpg", 9, "ismat.ayash@gmail.com", "Ismat", "Ayash", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "AQAAAAEAACcQAAAAEPD/Ny1UK1JmPdGkykNb8lf0icr0T3jknO3DQdQ/MciEsB/U3ayqk2Y9ziboatmu4g==", 1 });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "ActivationDate", "Active", "Avatar", "CountryId", "Email", "FirstName", "LastName", "NegPassCode", "NegPassCodeExpires", "PassCode", "PassCodeExpires", "Password", "RoleId" },
                values: new object[] { 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "layale.jpg", 7, "layale@gmail.com", "Layale", "Bassil", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "AQAAAAEAACcQAAAAENnThKJhDuHbU+6TDWFVLniupLTYJXF0JH1ALgiTh9g4ymK0PlFCzr9PXNpikEk2Gg==", 1 });

            migrationBuilder.InsertData(
                table: "Negotiation",
                columns: new[] { "Id", "CreatedAt", "InitiatedAt", "Status", "Subject", "UserId" },
                values: new object[] { 1, new DateTime(2021, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "منصة التفاوض لبنان الأردن", 1 });

            migrationBuilder.InsertData(
                table: "Negotiation",
                columns: new[] { "Id", "CreatedAt", "InitiatedAt", "Status", "Subject", "UserId" },
                values: new object[] { 2, new DateTime(2021, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "منصة التفاوض لبنان الأردن", 1 });

            migrationBuilder.InsertData(
                table: "NegotiationMember",
                columns: new[] { "Id", "ActionAt", "NegotiationId", "Status", "UserId", "isLeader" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 2, null, true },
                    { 2, new DateTime(2021, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, 2, null, false },
                    { 3, new DateTime(2021, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, null, true },
                    { 4, new DateTime(2021, 2, 14, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, 2, null, false }
                });

            migrationBuilder.InsertData(
                table: "NegotiationProduct",
                columns: new[] { "Id", "NegotiationId", "ProductId", "Tariff" },
                values: new object[,]
                {
                    { 1, 1, 2, 12.12m },
                    { 2, 2, 3, 10.23m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Negotiation_UserId",
                table: "Negotiation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationDiscussion_NegotiationId",
                table: "NegotiationDiscussion",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationDiscussion_SenderId",
                table: "NegotiationDiscussion",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationMember_NegotiationId",
                table: "NegotiationMember",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationMember_UserId",
                table: "NegotiationMember",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationProduct_NegotiationId",
                table: "NegotiationProduct",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationProduct_ProductId",
                table: "NegotiationProduct",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_User_CountryId",
                table: "User",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NegotiationDiscussion");

            migrationBuilder.DropTable(
                name: "NegotiationMember");

            migrationBuilder.DropTable(
                name: "NegotiationProduct");

            migrationBuilder.DropTable(
                name: "Negotiation");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
