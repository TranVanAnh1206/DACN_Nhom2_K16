using BookStore.Datas.DbContexts;
using BookStore.Models.Models;
using System.Text.Json;

namespace BookStore.Datas.SeedingDatas
{
    public static class BookGroupDataSeedContributor
    {
        public static async Task<List<BookGroup>> BookGroupSeeder(BookStoreDbContext context, IServiceProvider serviceProvider)
        {            
            if (!context.BookGroups.Any())
            {
                try
                {
                    var gengeDatas = File.ReadAllText("../BookStore.Datas/SeedingDatas/DataJsons/BookGroup.json");
                    var genges = JsonSerializer.Deserialize<List<BookGroup>>(gengeDatas);

                    await context.BookGroups.AddRangeAsync(genges);

                    if (context.ChangeTracker.HasChanges())
                    {
                        await context.SaveChangesAsync();
                    }

                    return genges;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return null;
        }
    }
}
