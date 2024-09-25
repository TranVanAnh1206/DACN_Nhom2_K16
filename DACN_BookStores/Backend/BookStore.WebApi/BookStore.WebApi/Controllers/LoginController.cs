using AutoMapper;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<LoginController> _logger;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public LoginController(IAuthService authService, ILogger<LoginController> logger, IEmailSender emailSender, UserManager<User> userManager, IMapper mapper)
        {
            _authService = authService;
            _logger = logger;
            _emailSender = emailSender;
            _userManager = userManager;
            _mapper = mapper;
        }


        /// <summary>
        /// Đăng nhập vào hệ thông
        /// </summary>
        /// <param name="login">
        ///     {
        ///         "userName",
        ///         "password"
        ///     }
        /// </param>
        /// <returns></returns>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/v1/Login/login
        ///     
        ///     {
        ///         "userName": "admin@example.com",
        ///         "password": "@Abc123456"
        ///     }
        /// 
        /// </remarks>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginViewModel login)
        {
            try
            {
                var res = await _authService.Login(login);

                if (res == null)
                    return BadRequest("Không thể đăng nhập");

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Đăng ký mới tài khoản
        /// </summary>
        /// <param name="register"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPost]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel register)
        {
            try
            {
                var userParse = _mapper.Map<User>(register);

                var userNameIsExist = await _userManager.FindByNameAsync(userParse.UserName);

                if (userNameIsExist != null)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, new
                    {
                        property = "UserName",
                        Message = "Tên người dùng đã tồn tại"
                    }));
                }

                var emailIsExist = await _userManager.FindByEmailAsync(userParse.Email);

                if (emailIsExist != null)
                {
                    return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, new
                    {
                        property = "Email",
                        Message = "Email đã tồn tại"
                    }));
                }

                var res = await _authService.Register(register);

                if (res == null)
                    return BadRequest("Không thể đăng ký người dùng mới");

                var userId = await _userManager.GetUserIdAsync(res);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(res);
                // code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var confirmEmailResult = await _userManager.ConfirmEmailAsync(res, code);

                ////var callbackUrl = Url.Page(
                ////"/Account/ConfirmEmail",
                ////pageHandler: null,
                ////values: new { area = "Identity", userId = userId, code = code, returnUrl = returnUrl },
                ////        protocol: Request.Scheme);

                //var callbackUrl = Url.Action("ConfirmEmail", "Login", new { userId = res.Id, token = code }, Request.Scheme);

                //await _emailSender.SendEmailAsync(res.Email, "Confirm your email",
                //    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                var uservm = _mapper.Map<UserViewModel>(res);

                return Ok(uservm);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ErrorDetails(StatusCodes.Status400BadRequest, ex.Message));
            }
        }

        /// <summary>
        /// Refresh token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <response code="200">Returns the newly created item</response>
        /// <response code="401">Unauthorize</response>
        /// <response code="404">If not found any item</response>
        /// <response code="403">Access denined</response>
        /// <response code="400">If the item is null</response>
        [HttpPost]
        [Route("refress-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestViewModel request)
        {
            try
            {
                var res = await _authService.RefreshToken(request);

                if (res == null)
                    return BadRequest("Không thể làm mới token");

                return Ok(res);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }

        ///// <summary>
        ///// Xác nhận email khi đăng ký mới được đăng nhập
        ///// </summary>
        ///// <param name="userId"></param>
        ///// <param name="token"></param>
        ///// <returns></returns>
        ///// <response code="200">Returns the newly created item</response>
        ///// <response code="401">Unauthorize</response>
        ///// <response code="404">If not found any item</response>
        ///// <response code="403">Access denined</response>
        ///// <response code="400">If the item is null</response>
        //[HttpGet]
        //[Route("confirm-email")]
        //public async Task<IActionResult> ConfirmEmail(string userId, string token)
        //{
        //    try
        //    {
        //        if (userId == null || token == null)
        //        {
        //            return BadRequest("Invalid user ID");
        //        }

        //        var user = await _userManager.FindByIdAsync(userId);
        //        if (user == null)
        //        {
        //            return NotFound($"Unable to load user with ID '{userId}'.");
        //        }

        //        token = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(token));
        //        var result = await _userManager.ConfirmEmailAsync(user, token);

        //        if (result.Succeeded)
        //        {
        //            return Ok("Thank you for confirming your email.");
        //        }
        //        else
        //        {
        //            return BadRequest("Error confirming your email.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex.Message);
        //        return BadRequest(ex);
        //    }
        //}
    }
}
