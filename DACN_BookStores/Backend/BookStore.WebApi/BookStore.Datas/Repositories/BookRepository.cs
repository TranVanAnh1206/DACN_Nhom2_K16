using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class BookRepository : BaseRepository<Book>, IBookRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public BookRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<string>> GetAuthorNamesByBookIdAsync(int id)
        {
            var query = await _dbContext.Books
                .Include(x => x.BookAuthors)
                .ThenInclude(x => x.Author)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (query == null)
            {
                return null;
            }

            var authorNames = query.BookAuthors.Select(ba => ba.Author.FullName).ToList();

            return authorNames;
        }

        public async Task<IEnumerable<Book>> GetBookRelated(List<int>? authorId, int groupId)
        {
            var query = _dbContext.Books
                          .Include(x => x.BookGroup)
                          .Include(x => x.BookAuthors)
                          .ThenInclude(x => x.Author)
                          .AsQueryable();

            if (authorId != null && authorId.Any())
            {
                query = query.Where(x => x.BookAuthors.Any(e => authorId.Contains(e.AuthorId)));
            }

            if (groupId != 0)
            {
                query = query.Where(x => x.BookGroupId == groupId);
            }

            return query.AsEnumerable();
        }

        public override async Task<Book> GetByIdAsync(int id, string[] includes = null)
        {
            IQueryable<Book> query = _dbContext.Books;

            if (includes != null && includes.Count() > 0)
            {
                query = query.Include(includes.First());
                foreach (var include in includes.Skip(1))
                {
                    query = query.Include(include);
                }
            }

            return await query.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> UpdateBookAverageRate(int bookId, double averageRate)
        {
            var book = await _dbContext.Books.FindAsync(bookId);

            if (book == null)
                return 0;

            if (averageRate < 0 || averageRate > 5)
            {
                return 0;
            }

            if (averageRate >= 0 && averageRate <= 0.2)
            {
                averageRate = 0;
            }
            else if (averageRate > 0.2 && averageRate <= 0.6)
            {
                averageRate = 0.5;
            }
            else if (averageRate >= 0.6 && averageRate <= 1.2)
            {
                averageRate = 1;
            }
            else if (averageRate > 1.2 && averageRate <= 1.6)
            {
                averageRate = 1.5;
            }
            else if (averageRate > 1.6 && averageRate <= 2.2)
            {
                averageRate = 2;
            }
            else if (averageRate > 2.2 && averageRate <= 2.6)
            {
                averageRate = 2.5;
            }
            else if (averageRate > 2.6 && averageRate <= 3.2)
            {
                averageRate = 3;
            }
            else if (averageRate > 3.2 && averageRate <= 3.6)
            {
                averageRate = 3.5;
            }
            else if (averageRate > 3.6 && averageRate <= 4.2)
            {
                averageRate = 4;
            }
            else if (averageRate > 4.2 && averageRate <= 4.6)
            {
                averageRate = 4.5;
            }
            else if (averageRate > 4.6 && averageRate <= 5)
            {
                averageRate = 5;
            }

            book.Rate = averageRate;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
