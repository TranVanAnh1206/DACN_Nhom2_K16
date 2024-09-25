using BookStore.Datas.DbContexts;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using System.Text.Json;

namespace BookStore.Datas.SeedingDatas
{
    public static class UserDataSeedContributor
    {
        public async static Task UserDataSeeder (BookStoreDbContext context, IServiceProvider serviceProvider)
        {
            #region Dữ liệu Seeding User
            var roles = new List<IdentityRole>()
                {
                    new IdentityRole("Admin"),
                    new IdentityRole("User"),
                    new IdentityRole("No_User"),
                };

            // Users
            var userDatas = File.ReadAllText("../BookStore.Datas/SeedingDatas/DataJsons/User.json");
            var users = JsonSerializer.Deserialize<List<User>>(userDatas);

            if (!context.Roles.Any())
            {
                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                foreach (var role in roles)
                {
                    var roleResult = await roleManager.CreateAsync(role);
                }
            }

            if (!context.Users.Any())
            {
                try
                {
                    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

                    var user = new User
                    {
                        UserName = "admin@example.com",
                        Email = "admin@example.com",
                        PhoneNumber = "0123456789",
                        IsActive = true,
                        EmailConfirmed = true,
                    };

                    var userResult = await userManager.CreateAsync(user, "@Abc123456");

                    var userId = await userManager.GetUserIdAsync(user);
                    var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    await userManager.ConfirmEmailAsync(user, code);

                    if (userResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, roles[0].Name);
                    }

                    var user2 = new User
                    {
                        UserName = "admin2@gmail.com",
                        Email = "admin2@gmail.com",
                        PhoneNumber = "0123456789",
                        IsActive = true,
                        EmailConfirmed = true,
                    };

                    var user2Result = await userManager.CreateAsync(user2, "@Abc123456");

                    var user2Id = await userManager.GetUserIdAsync(user2);
                    var code2 = await userManager.GenerateEmailConfirmationTokenAsync(user2);
                    code2 = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code2));
                    await userManager.ConfirmEmailAsync(user2, code2);

                    if (user2Result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user2, roles[0].Name);
                    }

                    foreach (var item in users)
                    {
                        await userManager.CreateAsync(item, "@Abc123456");
                        await userManager.AddToRoleAsync(item, roles[1].Name);
                    }
                }
                catch (Exception ex)
                {

                }
            }
            #endregion
        }
    }
}
