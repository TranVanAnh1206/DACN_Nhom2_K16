using BookStore.Datas.DbContexts;
using BookStore.Models.Models;

namespace BookStore.Datas.SeedingDatas
{
    public static class VoucherDataSeedContributor
    {
        public static async Task<List<Voucher>> VoucherSeederAsync(BookStoreDbContext context, IServiceProvider service)
        {
            if (!context.Vouchers.Any())
            {
                try
                {
                    await context.Vouchers.AddRangeAsync(_vouchers);

                    if (context.ChangeTracker.HasChanges())
                    {
                        await context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }

            return _vouchers;
        }
             
        private static List<Voucher> _vouchers = new List<Voucher>()
        {
            new Voucher
            {
                Code = "RMG55LMZ9QN",
                Description = "lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo.",
                ExpirationDate = new DateTime(2024, 2, 6),
                DiscountAmount = 42688,
                IsActive = true,
                MaxUsage = 160,
                CurrentUsage = 3
            },
            new Voucher
            {
                Code = "VYW59TUW4QD",
                Description = "magna sed dui. Fusce aliquam, enim nec",
                ExpirationDate = new DateTime(2025, 8, 5),
                DiscountAmount = 41410,
                IsActive = true,
                MaxUsage = 159,
                CurrentUsage = 1
            },
            new Voucher
            {
                Code = "JLY27OBX3OD",
                Description = "enim diam vel arcu. Curabitur ut",
                ExpirationDate = new DateTime(2023, 12, 31),
                DiscountAmount = 11267,
                IsActive = true,
                MaxUsage = 283,
                CurrentUsage = 9
            },
            new Voucher
            {
                Code = "INM15TGO8VI",
                Description = "dolor, nonummy ac, feugiat non,",
                ExpirationDate = new DateTime(2024, 5, 14),
                DiscountAmount = 35606,
                IsActive = true,
                MaxUsage = 133,
                CurrentUsage = 6
            },
            new Voucher
            {
                Code = "LKY38PBK9YB",
                Description = "erat, in consectetuer",
                ExpirationDate = new DateTime(2025, 4, 4),
                DiscountAmount = 12278,
                IsActive = true,
                MaxUsage = 126,
                CurrentUsage = 2
            },
            new Voucher{
                Code = "DLH47MQE1TA",
                Description = "magna. Suspendisse tristique neque venenatis lacus.",
                ExpirationDate =new DateTime(2023, 12, 2),
                DiscountAmount = 23414,
                IsActive = true,
                MaxUsage = 219,
                CurrentUsage = 8
            },
            new Voucher{
                Code = "XRY25ABK5FG",
                Description = "venenatis lacus. Etiam bibendum",
                ExpirationDate =new DateTime(2025, 2, 15),
                DiscountAmount = 23200,
                IsActive = true,
                MaxUsage = 209,
                CurrentUsage = 1
            },
            new Voucher{
                Code = "YCK20OIE4ME",
                Description = "elit, pellentesque a,",
                ExpirationDate =new DateTime(2024, 12, 22),
                DiscountAmount = 33659,
                IsActive = true,
                MaxUsage = 271,
                CurrentUsage = 8
            },
            new Voucher{
                Code = "BMD16QMX8GP",
                Description = "egestas.",
                ExpirationDate =new DateTime(2024, 05, 30),
                DiscountAmount = 36063,
                IsActive = true,
                MaxUsage = 157,
                CurrentUsage = 2
            },
            new Voucher{
                Code = "YSO30RQE1OE",
                Description = "enim. Nunc ut",
                ExpirationDate = new DateTime(2025, 1, 3),
                DiscountAmount = 29931,
                IsActive = true,
                MaxUsage = 150,
                CurrentUsage = 1
            }
        };
    }
}
