using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel.Book;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces
{
    public interface IBookService : IBaseService<BookViewModel, BookCreateViewModel, BookUpdateViewModel>
    {
        Task<PaginationSet<BookViewModel>> Search(BookSpecification spec, PaginationParams pageParams, string[] includes = null);

        Task<IEnumerable<BookViewModel>> GetBookRelated(List<int>? authorId, int groupId);
    }
}
