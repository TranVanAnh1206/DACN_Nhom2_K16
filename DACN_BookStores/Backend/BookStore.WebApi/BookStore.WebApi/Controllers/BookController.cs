using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Book;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    public class BookController : BaseController<BookViewModel, BookCreateViewModel, BookUpdateViewModel>
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService) : base(bookService)
        {
            _bookService = bookService;
        }

        /// <summary>
        /// Lấy các quyển sách liên quan
        /// </summary>
        /// <param name="authorId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("book-related")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBookRelated([FromQuery] List<int> authorId, [FromQuery] int groupId, [FromQuery] PaginationParams pageParams)
        {
            try
            {
                if (pageParams.PageNumber <= 0)
                {
                    pageParams.PageNumber = 1;
                }

                var res = await _bookService.GetBookRelated(authorId, groupId, pageParams);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            };
        }

        public override async Task<IActionResult> GetAllPaging([FromQuery] BaseSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {
                var res = await _bookService.GetAllPagingAsync(spec, pageParams, new[] { "BookGroup", "Reviews", "BookAuthors.Author", "Reviews.User" } );

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public override async Task<IActionResult> GetById(int id)
        {
            try
            {
                var res = await _bookService.GetByIdAsync(id, new[] { "BookGroup", "Reviews", "BookAuthors.Author", "Reviews.User" });

                if (res == null)
                {
                    return NotFound();
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Tìm kiếm sách ( Search = Get-All + Get-All-Paging )
        /// </summary>
        /// <param name="spec"></param>
        /// <param name="pageParams"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpGet]
        [Route("searching")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [AllowAnonymous]
        public async Task<IActionResult> Search([FromQuery] BookSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {                
                var res = await _bookService.Search(spec, pageParams, new[] { "BookGroup", "Reviews", "BookAuthors.Author", "Reviews.User" });

                if (res == null || res.Datas == null || res.Datas.Count() == 0)
                    return NotFound("Không tìm thấy!");

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
