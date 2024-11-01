using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class VoucherRepository : BaseRepository<Voucher>, IVoucherRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public VoucherRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task UseVoucherForOrder(Voucher voucher)
        {
            if (voucher != null)
            {
                voucher.CurrentUsage++;
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
