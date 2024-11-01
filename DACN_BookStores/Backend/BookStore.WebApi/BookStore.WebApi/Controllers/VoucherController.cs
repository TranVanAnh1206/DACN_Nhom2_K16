using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Voucher;
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
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherService _voucherService;
        private readonly UserManager<User> _userManager;

        public VoucherController(IVoucherService voucherService, UserManager<User> userManager)
        {
            _voucherService = voucherService;
            _userManager = userManager;
        }

        /// <summary>
        /// Lấy tất cả Voucher đang có
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("all-vouchers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllVouchers()
        {
            try
            {
                var res = await _voucherService.GetAllAsync();

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Get một voucher theo Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("voucher/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var res = await _voucherService.GetByIdAsync(id, new[] { "VoucherUsers" });

                if (res == null)
                {
                    return NotFound(new ErrorDetails(StatusCodes.Status404NotFound, "Không tìm thấy voucher"));
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Tạo mới voucher
        /// </summary>
        /// <param name="create"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateVoucher(VoucherCreateViewModel create)
        {
            try
            {
                var res = await _voucherService.CreateAsync(create);

                if (res == 0)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Không thể tạo mới voucher"));
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Cập nhật voucher
        /// </summary>
        /// <param name="id"></param>
        /// <param name="update"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateVoucher (int id, VoucherUpdateViewModel update)
        {
            try
            {
                var res = await _voucherService.UpdateAsync(id, update);

                if (res == 0)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Không thể Cập nhật voucher"));
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Xóa một Voucher
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteVoucher(int id)
        {
            try
            {
                var res = await _voucherService.DeleteAsync(id);

                if (res == 0)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, "Không thể xóa voucher"));
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }
    }
}
