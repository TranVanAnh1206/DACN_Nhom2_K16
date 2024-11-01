using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.BookAuthor;

namespace BookStore.Bussiness.Interfaces
{
    public interface IBookAuthorService : IBaseService<BookAuthorViewModel, BookAuthorCreateViewModel, BookAuthorUpdateViewModel>
    {
    }
}
