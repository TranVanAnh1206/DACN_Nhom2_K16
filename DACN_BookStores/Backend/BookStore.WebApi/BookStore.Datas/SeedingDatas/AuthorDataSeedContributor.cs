using BookStore.Datas.DbContexts;
using BookStore.Models.Models;
using System.Text.Json;

namespace BookStore.Datas.SeedingDatas
{
    public static class AuthorDataSeedContributor
    {
        public static async Task<List<Author>> AuthorSeeder(BookStoreDbContext context, IServiceProvider serviceProvider)
        {
            #region Dữ liệu Seeding Authors
            // Authors
            var authorDatas = File.ReadAllText("../BookStore.Datas/SeedingDatas/DataJsons/Author.json");
            var authors = JsonSerializer.Deserialize<List<Author>>(authorDatas);

            if (!context.Authors.Any())
            {
                try
                {
                    await context.Authors.AddRangeAsync(authors);

                    if (context.ChangeTracker.HasChanges())
                    {
                        await context.SaveChangesAsync();
                    }

                    return authors;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            #endregion

            return null;
        }
    }
}
