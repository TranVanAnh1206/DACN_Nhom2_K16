using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.BookGroup;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class BookGroupController : BaseController<BookGroupViewModel, BookGroupCreateViewModel, BookGroupUpdateViewModel>
    {
        private readonly IBookGroupService _bookGroupService;

        public BookGroupController(IBookGroupService bookGroupService) : base(bookGroupService)
        {
            _bookGroupService = bookGroupService;
        }
    }
}
