using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Author;

namespace BookStore.Bussiness.Interfaces
{
    public interface IAuthorService : IBaseService<AuthorViewModel, AuthorCreateViewModel, AuthorUpdateViewModel>
    {
    }
}
