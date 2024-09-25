using BookStore.Datas.DbContexts;
using BookStore.Models.Models;
using System.Text.Json;

namespace BookStore.Datas.SeedingDatas
{
    public static class PublisherDataSeedContributor
    {
        public static async Task<List<Publisher>> PublishersSeeder(BookStoreDbContext context, IServiceProvider serviceProvider)
        {
            var publisherData = File.ReadAllText("../BookStore.Datas/SeedingDatas/DataJsons/Publisher.json");
            var publishers = JsonSerializer.Deserialize<List<Publisher>>(publisherData);

            if (!context.Publishers.Any())
            {
                await context.Publishers.AddRangeAsync(publishers);
                await context.SaveChangesAsync();
            }

            return publishers;
        }
    }
}
