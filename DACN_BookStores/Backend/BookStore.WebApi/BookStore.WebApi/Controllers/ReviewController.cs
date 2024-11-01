using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.Services;
using BookStore.Bussiness.ViewModel.Review;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]s")]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IOrserItemService _orderItemService;
        private readonly UserManager<User> _userManager;

        public ReviewController(IReviewService reviewService, IOrserItemService orderItemService, UserManager<User> userManager)
        {
            _reviewService = reviewService;
            _orderItemService = orderItemService;
            _userManager = userManager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)] 
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Create([FromBody] ReviewCreateViewModel viewModel)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                viewModel.UserId = userId;
                var res = await _reviewService.CreateAsync(viewModel);

                if (res == 0)
                {
                    return BadRequest();
                }

                var reviewResult = await _orderItemService.IsReviewed(viewModel.OrderId, userId, viewModel.BookId);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Update(int id, [FromBody] ReviewUpdateViewModel createUpdate)
        {
            try
            {
                var review = await _reviewService.GetByIdAsync(id);
                var userId = _userManager.GetUserId(User);

                if (review.UserId != userId)
                    return BadRequest("Bạn không thể sửa review của người khác!");

                if (review.BookId != createUpdate.BookId) 
                    return BadRequest("Bạn đang sửa review củ sách khác với sách ban đầu!");

                var res = await _reviewService.UpdateAsync(id, createUpdate);

                if (res == 0)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Không thể cập nhật đánh giá"));
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteReview(int id)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _reviewService.DeleteReview(id, userId);

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }
    }
}
