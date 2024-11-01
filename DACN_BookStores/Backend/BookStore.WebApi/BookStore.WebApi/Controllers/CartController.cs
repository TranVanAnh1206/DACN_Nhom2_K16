using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Cart;
using BookStore.Bussiness.ViewModel.CartItem;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly ICartItemService _cartItemService;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<CartController> _logger;

        public CartController(ICartService cartService, ICartItemService cartItemService, UserManager<User> userManager, ILogger<CartController> logger)
        {
            _cartService = cartService;
            _cartItemService = cartItemService;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        [Route("carts")]
        public async Task<IActionResult> GetCart ()
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _cartService.GetCartByUserId(userId, new[] { "CartItems", "CartItems.Book" });

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.ToString());
            }
        }

        /// <summary>
        /// Add to cart
        /// </summary>
        /// <param name="create"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("add-to-cart")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status304NotModified)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddToCart(CartItemCreateViewModel create)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var isExist = await _cartService.GetCartByUserId(userId);                

                if (isExist == null)
                {
                    var cartCreatevm = new CartCreateViewModel
                    {
                        UserId = userId,
                        CartItems = new List<CartItemCreateViewModel> { create }
                    };

                    var cart = await _cartService.CreateAsync(cartCreatevm);

                    isExist = await _cartService.GetCartByUserId(userId);
                }

                var cartItemIsExist = await _cartItemService.GetCartItemIsExist(create.BookId, isExist.Id, userId);

                if (cartItemIsExist != null)
                {
                    var civm = await _cartItemService.UpdateCartItemQuantity(create.BookId, isExist.Id, create.Quantity, userId);

                    if (civm == null) return BadRequest(0);

                    return Ok(1);
                }

                var res = await _cartItemService.CreateAsync(create);

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.ToString());
            }
        }

        /// <summary>
        /// Cập nhật số lượng của sách trong giỏ hàng
        /// </summary>
        /// <param name="id"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPut]
        [Route("update-quantity")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateQuantity (int cartid, int bookId, int quantity)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var isExist = await _cartItemService.GetCartItemIsExist(bookId, cartid, userId);

                if (isExist == null)
                {
                    return NotFound(new ErrorDetails(StatusCodes.Status404NotFound, "Không tìm thấy."));
                }

                var res = await _cartItemService.UpdateQuantity(bookId, cartid, quantity, userId);

                if (res == null) 
                    return BadRequest(new ErrorDetails(StatusCodes.Status304NotModified, "Không thể cập nhật số lượng"));

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete-cart-item")]
        public async Task<IActionResult> DeleteCartItem (int cartId,  int bookId)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _cartItemService.DeleteCartItem(bookId, cartId, userId);

                if (res == 0)
                    return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
