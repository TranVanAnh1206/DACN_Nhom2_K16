using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Payment.Commons;
using BookStore.Bussiness.ViewModel.Payment.Momo;
using BookStore.Bussiness.ViewModel.Payment.Vnpay;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Asn1.X9;

namespace BookStore.WebApi.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]s")]
    [Authorize]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly MomoConfig _momoConfig;
        private readonly VnpayConfig _vnpayConfig;

        public PaymentController(IOptions<MomoConfig> momo, IOptions<VnpayConfig> vnpay, IPaymentService paymentService, IHttpContextAccessor httpContextAccessor)
        {
            _paymentService = paymentService;
            _httpContextAccessor = httpContextAccessor;
            _momoConfig = momo.Value;
            _vnpayConfig = vnpay.Value;
        }

        [HttpPost]
        [Route("momo-payment")]
        public async Task<IActionResult> MoMoPaymentAsync([FromBody] MomoPaymentRequest input)
        {
            string endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            string partnerCode = _momoConfig.PartnerCode;
            string accessKey = _momoConfig.AccessKey;
            string secretKey = _momoConfig.SecretKey;
            string orderInfo = input.OrderInfo ?? "";
            string redirectUrl = _momoConfig.ReturnUrl;
            string ipnUrl = _momoConfig.IpnUrl;
            string requestType = "captureWallet";
            string amount = input.Amount ?? "";
            string orderId = input.OrderId ?? "";
            string requestId = Guid.NewGuid().ToString();
            string extraData = "";

            var rawHash = $"accessKey={accessKey}&amount={amount}&extraData={extraData}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={redirectUrl}&requestId={requestId}&requestType={requestType}";

            string Signature = PaymentHashSecurity.HmacSHA256(rawHash, secretKey);

            JObject message = new JObject
                {
                    { "partnerCode", partnerCode },
                    { "partnerName", "Test" },
                    { "storeId", "MomoTestStore" },
                    { "requestId", requestId },
                    { "amount", amount },
                    { "orderId", orderId },
                    { "orderInfo", orderInfo },
                    { "redirectUrl", redirectUrl },
                    { "ipnUrl", ipnUrl },
                    { "lang", "en" },
                    { "extraData", extraData },
                    { "requestType", requestType },
                    { "signature", Signature }
                };

            string responseFromMomo = await _paymentService.SendMoMoPaymentRequestAsync(endpoint, message.ToString());
            JObject jmessage = JObject.Parse(responseFromMomo);

            jmessage.Remove("partnerCode");
            jmessage.Remove("orderId");
            jmessage.Remove("requestId");
            jmessage.Remove("responseTime");
            jmessage.Remove("amount");

            return Ok(jmessage);
        }

        [HttpGet]
        [Route("momo-return")]
        public async Task<IActionResult> MoMoReturn([FromQuery] MomoPaymentResult response)
        {
            var res = await _paymentService.HandleMoMoPaymentResultAsync(response);

            return Ok(res);
        }

        [HttpPost]
        [Route("vnpay-payment")]
        public async Task<IActionResult> VnpayPayment( [FromBody] OrderRequestInfo request)
        {
            // Lấy thông tin cấu hình VNPAY từ appsettings
            var vnpayUrl = _vnpayConfig.Url;
            var version = _vnpayConfig.Version;
            var tmnCode = _vnpayConfig.TMNCode;
            var hashSecret = _vnpayConfig.HashSecret;
            var returnUrl = _vnpayConfig.ReturnUrl;
            var notifyUrl = _vnpayConfig.NotifyUrl;

            var ipAddrr = _httpContextAccessor?.HttpContext?.Connection?.LocalIpAddress?.ToString();

            var requestData = new VnpayPaymentRequest(version, tmnCode, DateTime.Now, ipAddrr, decimal.Parse(request.Amount), "VND", "other", request.OrderInfo, returnUrl, request.OrderId);
            
            var paymentUrl = requestData.GetLink(vnpayUrl, hashSecret);

            return Ok(new
            {
                PayUrl = paymentUrl
            });
        }

        [HttpGet]
        [Route("vnpay-return")]
        [AllowAnonymous]
        public async Task<IActionResult> VnpayReturn([FromQuery] VnpayPaymentResponse response)
        {
            var returnVM = await _paymentService.HandleVnpayPaymentResultAsync(response);

            return Ok(returnVM);
        }


    }
}
