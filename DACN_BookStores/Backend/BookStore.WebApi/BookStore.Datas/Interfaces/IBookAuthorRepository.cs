using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IBookAuthorRepository : IBaseRepository<BookAuthor>
    {
        Task<List<BookAuthor>> GetAllBookAuthorByBookId(int bookId);
        Task<int> DeleteAllBookAuthorByBookId(int bookId);

    }
}
