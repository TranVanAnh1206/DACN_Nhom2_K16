using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class BookAuthorRepository : BaseRepository<BookAuthor>, IBookAuthorRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public BookAuthorRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> DeleteAllBookAuthorByBookId(int bookId)
        {
            var bas = _dbContext.BookAuthors.Where(x => x.BookId == bookId).ToList();

            if (!bas.Any())
            {
                return 0;
            }

            _dbContext.BookAuthors.RemoveRange(bas);

            return await _dbContext.SaveChangesAsync();
        }

        public async Task<List<BookAuthor>> GetAllBookAuthorByBookId(int bookId)
        {
            var res = _dbContext.BookAuthors.Where(x => x.BookId == bookId).ToList();

            return res;
        }
    }
}
