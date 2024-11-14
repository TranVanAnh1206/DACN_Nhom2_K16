using AutoMapper;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Errors;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using MailKit.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]s")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, UserManager<User> userManager, IMapper mapper)
        {
            _orderService = orderService;
            _userManager = userManager;
            _mapper = mapper;
        }

        /// <summary>
        /// Hiển thị các đơn hàng của tất cả user (chức năng danh cho admin)
        /// </summary>
        /// <param name="spec"></param>
        /// <returns></returns>
        /// <remarks>
        /// Status: có các trạng thái sau
        /// DangXuLy = 4,
        ///   ----- DaThanhToan = 1,
        ///   ----- ChuaThanhToan = 2,
        ///   ----- DaGiaoHang = 3,
        ///   ----- DaHuy = 0,
        ///   ----- All = 15
        /// Sorted: mặc định sắp xếp theo ngày
        /// </remarks>
        [HttpGet]
        [Route("all-orders")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetOrders([FromQuery] OrderSpecification spec, [FromQuery] PaginationParams pageParams)
        {
            try
            {
                if (pageParams.PageNumber <= 0) pageParams.PageNumber = 1;

                var res = await _orderService.GetOrders(spec, pageParams);

                if (res == null)
                    return NotFound(new ErrorDetails(StatusCodes.Status404NotFound, "Không tìm thấy đơn hàng nào"));

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Lấy thông tin chi tiết của các order
        /// </summary>
        /// <param name="orderId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("order-detail")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> OrderDetails(int orderId)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _orderService.GetOrder(orderId, userId, new[] { "OrderItems", "OrderItems.Book", "User" });

                if (res == null)
                    return NotFound(new ErrorDetails(StatusCodes.Status404NotFound, "Không tìm thấy đơn hàng này"));

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex));
            }
        }

        /// <summary>
        /// Get tất cả order của user đang đăng nhập
        /// </summary>
        /// <param name="spec"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("orders-of-user")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserOrder([FromQuery] OrderSpecification spec)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _orderService.GetOrdersUser(userId, spec, new[] { "OrderItems", "OrderItems.Book", "User" });

                if (res == null)
                    return BadRequest();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Đặt hàng
        /// </summary>
        /// <param name="create"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///      POST /api/v1/Order/order
        ///      
        ///       {
        ///          "userId": "string",
        ///          "status": 4,
        ///          "date": "2024-08-15T13:41:59.192Z",
        ///          "voucherId": 7,
        ///          "orderItems": [
        ///            {
        ///              "bookId": 49,
        ///              "quantity": 3
        ///            }
        ///          ]
        ///        }
        /// 
        /// </remarks>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPost]
        [Route("order")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateOrder(OrderCreateViewModel create)
        {
            try
            {
                create.UserId = _userManager.GetUserId(User);

                var res = await _orderService.CreateAsync(create);
                int statusCode = int.Parse(res["StatusCode"].ToString());

                if (statusCode == 2)
                {
                    return BadRequest(new ExceptionResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Đã đạt giới hạn sử dụng của mã giảm giá."
                    });
                }

                if (statusCode == 3)
                {
                    return BadRequest(new ExceptionResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Không tìm thấy thẻ giảm giá"
                    });
                }

                if (statusCode == 0)
                    return BadRequest(new ExceptionResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Không ông thể đặt hàng."
                    });

                return Ok(new
                {
                    StatusCode = 200,
                    Message = res["Message"].ToString(),
                    OrderId = int.Parse(res["OrderId"].ToString()),
                    TotalAmount = int.Parse(res["TotalAmount"].ToString().Split(",")[0])
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new ExceptionResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message
                });
            }
        }

        /// <summary>
        /// Hủy đơn hàng
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPut]
        [Route("cancelled-order/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CancelledOrder(int id)
        {
            try
            {
                var userId = _userManager.GetUserId(User);

                var res = await _orderService.CancelledOrder(id, userId);

                if (res == 0)
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Không thể hủy đơn hàng này"));

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Thay đổi trang thái đơn hàng
        /// </summary>
        /// <param name="id"></param>
        /// <param name="orderStatus"></param>
        /// <returns></returns>
        /// <remarks>
        /// POST /api/v1.0/Order/update-status-order/6?orderStatus=1
        /// </remarks>
        [HttpPut]
        [Route("status-order-update/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateStatusOrder(int id, OrderStatusEnum orderStatus)
        {
            try
            {
                var userId = _userManager.GetUserId(User);
                var user = await _userManager.FindByIdAsync(userId);
                var roles = await _userManager.GetRolesAsync(user);

                if (roles[0] == "User")
                {
                    var donHangUser = await _orderService.GetByIdAsync(id);

                    if (donHangUser == null)
                        return NotFound("Không thể tìm thấy đơn hàng");

                    if (donHangUser.Status == OrderStatusEnum.DangXuLy && orderStatus == OrderStatusEnum.DaHuy)
                    {
                        var resUser = await _orderService.UpdateOrderStatus(id, orderStatus);

                        return Ok(resUser);
                    }

                    return BadRequest();
                }

                if (roles[0] == "Admin")
                {
                    var donHangAdmin = await _orderService.GetByIdAsync(id);

                    if (donHangAdmin == null)
                        return NotFound("Không thể tìm thấy đơn hàng");

                    if (donHangAdmin.Status == OrderStatusEnum.DaHuy)
                    {
                        return BadRequest("Không thể thay đổi trạng thái của đơn hàng đã hủy.");
                    }

                    var resAdmin = await _orderService.UpdateOrderStatus(id, orderStatus);

                    if (resAdmin == 1)
                        return Ok(resAdmin);

                    return BadRequest();
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
