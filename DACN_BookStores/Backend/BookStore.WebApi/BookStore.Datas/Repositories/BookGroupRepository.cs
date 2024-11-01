using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class BookGroupRepository : BaseRepository<BookGroup>, IBookGroupRepository
    {
        public BookGroupRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
        }
    }
}
