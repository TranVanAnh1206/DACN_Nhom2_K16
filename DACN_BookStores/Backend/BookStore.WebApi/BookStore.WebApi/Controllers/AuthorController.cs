using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Author;

namespace BookStore.WebApi.Controllers
{
    public class AuthorController : BaseController<AuthorViewModel, AuthorCreateViewModel, AuthorUpdateViewModel>
    {
        public AuthorController(IAuthorService authorService) : base(authorService)
        {
        }
    }
}
