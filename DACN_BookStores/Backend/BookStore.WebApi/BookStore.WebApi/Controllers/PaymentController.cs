using BookStore.Bussiness.Services;
using BookStore.Bussiness.ViewModel.Payment.Momo;
using BookStore.WebApi.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace BookStore.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoMoController : ControllerBase
    {
        private readonly PaymentRequestService _paymentRequestService;
        private readonly MomoConfig _momoConfig;

        public MoMoController(IOptions<MomoConfig> momo,PaymentRequestService paymentRequestService)
        {
            _paymentRequestService = paymentRequestService;
            _momoConfig = momo.Value;
        }

        [HttpPost("pay")]
        public async Task<IActionResult> Pay([FromBody] PaymentRequest paymentRequest)
        {
            try
            {
                string endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
                string partnerCode = _momoConfig.PartnerCode;
                string accessKey = _momoConfig.AccessKey;
                string serectkey = _momoConfig.SecretKey;
                string orderInfo = paymentRequest.OrderInfo??"";
                string redirectUrl = _momoConfig.ReturnUrl;
                string ipnUrl = _momoConfig.IpnUrl;
                string requestType = "captureWallet";
                string amount = paymentRequest.Amount??"";
                string orderId = paymentRequest.OrderId ?? "";
                string requestId = Guid.NewGuid().ToString();
                string extraData = "";

                string rawHash = $"accessKey={accessKey}&amount={amount}&extraData={extraData}&ipnUrl={ipnUrl}&orderId={orderId}&orderInfo={orderInfo}&partnerCode={partnerCode}&redirectUrl={redirectUrl}&requestId={requestId}&requestType={requestType}";

                MoMoSecurity crypto = new MoMoSecurity();
                string signature = crypto.signSHA256(rawHash, _momoConfig.SecretKey);

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
                    { "signature", signature }                 
                };
                string responseFromMomo = await _paymentRequestService.SendPaymentRequestAsync(endpoint, message.ToString());
                JObject jmessage = JObject.Parse(responseFromMomo);

                jmessage.Remove("partnerCode");
                jmessage.Remove("orderId");
                jmessage.Remove("requestId");
                jmessage.Remove("responseTime");
                jmessage.Remove("amount");

                return Ok(jmessage);
            }
            catch(Exception exception)
            {
                return BadRequest(exception.Message);
            }

        }
    }
}
