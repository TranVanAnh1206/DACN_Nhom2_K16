using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class AuthorRepository : BaseRepository<Author>, IAuthorRepository
    {
        public AuthorRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
        }
    }
}
