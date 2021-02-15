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
                name: "Products",
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
                    table.PrimaryKey("PK_Products", x => x.Id);
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
                name: "Negotiations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InitiatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Negotiations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Negotiations_User_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationDiscussions",
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
                    table.PrimaryKey("PK_NegotiationDiscussions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationDiscussions_Negotiations_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NegotiationDiscussions_User_SenderId",
                        column: x => x.SenderId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ActionAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NegotiationId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NegotiationMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationMembers_Negotiations_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NegotiationMembers_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NegotiationProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tariff = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    NegotiationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NegotiationProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NegotiationProducts_Negotiations_NegotiationId",
                        column: x => x.NegotiationId,
                        principalTable: "Negotiations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NegotiationProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                    { 14, "PL", "PSE", "Palestine", "فلسطين" },
                    { 13, "OM", "OMN", "Oman", "عمان" },
                    { 12, "MA", "MAR", "Morocco", "المغرب" },
                    { 11, "MR", "MRT", "Mauritania", "موريتانيا" },
                    { 10, "LY", "LBY", "Libya", "ليبيا" },
                    { 9, "LB", "LBN", "Lebanon", "لبنان" },
                    { 8, "KW", "KWT", "Kuwait", "الكويت" },
                    { 7, "JO", "JOR", "Jordan", "الأردن" },
                    { 6, "IQ", "IRQ", "Iraq", "العراق" },
                    { 5, "EG", "EGY", "Egypt", "مصر" },
                    { 4, "DJ", "DJI", "Djibouti", "جيبوتي" },
                    { 3, "KM", "COM", "Comoros", "جزر القمر" },
                    { 2, "BH", "BHR", "Bahrain", "البحرين " }
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
                values: new object[] { 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "ismat.jpg", 8, "ismat.ayash@gmail.com", "Ismat", "Ayash", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "AQAAAAEAACcQAAAAELvXCpJ+EE3Rw+2UbWV6aACXZsnqoSqdapn1sVzpc4sQW+2ADHQQb+6WM8XKxw67qA==", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationDiscussions_NegotiationId",
                table: "NegotiationDiscussions",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationDiscussions_SenderId",
                table: "NegotiationDiscussions",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationMembers_NegotiationId",
                table: "NegotiationMembers",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationMembers_UserId",
                table: "NegotiationMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationProducts_NegotiationId",
                table: "NegotiationProducts",
                column: "NegotiationId");

            migrationBuilder.CreateIndex(
                name: "IX_NegotiationProducts_ProductId",
                table: "NegotiationProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Negotiations_CreatedById",
                table: "Negotiations",
                column: "CreatedById");

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
                name: "NegotiationDiscussions");

            migrationBuilder.DropTable(
                name: "NegotiationMembers");

            migrationBuilder.DropTable(
                name: "NegotiationProducts");

            migrationBuilder.DropTable(
                name: "Negotiations");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Country");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
