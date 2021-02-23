using Microsoft.EntityFrameworkCore.Migrations;

namespace ACUHelpdesk.Migrations
{
    public partial class DBcascadeDel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEJnL4WIZf+3yJWMH6gKHcPFpNy9QZPYRZLeQUUxp1p0/kzG1R8RW+HjrSZ6+05XJEw==");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "AQAAAAEAACcQAAAAEMLGENRZN+mjr2Hr6GsaqN3OR2uWrY1NVfQKMIMny9Hl3cvr5h0cAxeCpO5rFEInnA==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "AQAAAAEAACcQAAAAENGbcmSv1pnFjqB4PsDiek/4kQMqrI4oz7CUJW1//OfuIqsgdGYy2cOXkRNPL9i2EA==");

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "AQAAAAEAACcQAAAAENum+ytpNIgyl9ctgnlql8YVJoYRFEGw8ZkjsHddmhd2hStAatcT49Pg0LQ7+f9jwA==");
        }
    }
}
