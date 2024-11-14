using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Payment.Momo;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using Microsoft.Extensions.Options;
using BookStore.Bussiness.ViewModel.Payment.Vnpay;
using BookStore.Bussiness.ViewModel.Payment.Commons;
using Azure.Messaging;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using static System.Net.Mime.MediaTypeNames;
using System.Text.RegularExpressions;

namespace BookStore.Bussiness.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly MomoConfig _momoConfig;
        private readonly VnpayConfig _vnpayConfig;
        private readonly IOrderService _orderService;

        public PaymentService(IOptions<MomoConfig> momoConfigOptions, IOptions<VnpayConfig> vnpayConfigOptions, IOrderService orderService)
        {
            _momoConfig = momoConfigOptions.Value;
            _orderService = orderService;
            _vnpayConfig = vnpayConfigOptions.Value;
        }

        public async Task<string> SendMoMoPaymentRequestAsync(string endpoint, string postJsonString)
        {
            try
            {
                using HttpClient client = new HttpClient();
                var content = new StringContent(postJsonString, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(endpoint, content);

                response.EnsureSuccessStatusCode();

                var test = await response.Content.ReadAsStringAsync();
                return await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException e)
            {
                throw new Exception($"Request failed: {e.Message}");
            }
        }

        public async Task<(bool, string?)> GetLinkMoMoPaymentAsync(string paymentUrl, string request)
        {
            using HttpClient client = new HttpClient();

            var requestContent = new StringContent(request, System.Text.Encoding.UTF8, "application/json");

            var createPaymentLinkRes = await client.PostAsync(paymentUrl, requestContent);

            if (createPaymentLinkRes.IsSuccessStatusCode)
            {
                var responseContent = createPaymentLinkRes.Content.ReadAsStringAsync().Result;
                var responseData = JsonConvert.DeserializeObject<MoMoCreateLinkResponse>(responseContent);

                if (responseData.ResultCode == "")
                {
                    return (true, responseData.PayUrl);
                }
                else
                {
                    return (false, responseData.Message);
                }
            }
            else
            {
                return (false, createPaymentLinkRes.ReasonPhrase);
            }
        }

        public async Task<PaymentResultViewModel> HandleMoMoPaymentResultAsync(MomoPaymentResult resultDto)
        {
            var resultData = new PaymentResultViewModel();
            var isValidSignature = resultDto.IsValidSignature(_momoConfig.AccessKey, _momoConfig.SecretKey);

            if (isValidSignature)
            {
                string orderId = resultDto.OrderId.Split("_")[0];

                // Kiểm tra kết quả thanh toán
                if (resultDto.ResultCode == 0) // 0 là mã cho thanh toán thành công
                {

                    await _orderService.UpdateOrderStatus(int.Parse(orderId), Models.Enums.OrderStatusEnum.DaThanhToan);

                    resultData.Amount = resultDto.Amount;
                    resultData.PaymentMessage = resultDto.Message;
                    resultData.PaymentStatus = "00";
                    resultData.PaymentId = resultDto.OrderId;
                    resultData.Signature = Guid.NewGuid().ToString();
                }
                else
                {
                    await _orderService.UpdateOrderStatus(int.Parse(orderId), Models.Enums.OrderStatusEnum.ChuaThanhToan);

                    resultData.PaymentStatus = "10";
                    resultData.PaymentMessage = "Payment process failed";
                }
            }
            else
            {
                resultData.PaymentStatus = "99";
                resultData.PaymentMessage = "Invalid signature in response";
            }

            return resultData;
        }

        public async Task<PaymentResultViewModel> HandleVnpayPaymentResultAsync(VnpayPaymentResponse resultDto)
        {
            string returnUrl = string.Empty;
            var resultData = new PaymentResultViewModel();
            var isValidSignature = resultDto.IsValidSignature(_vnpayConfig.HashSecret);

            if (isValidSignature)
            {
                string orderId = Regex.Match(resultDto.vnp_OrderInfo, @"\b\d+$").Value;

                if (resultDto.vnp_ResponseCode == "00")
                {
                    await _orderService.UpdateOrderStatus(int.Parse(orderId), Models.Enums.OrderStatusEnum.DaThanhToan);
                    resultData.PaymentStatus = "00";
                    resultData.PaymentId = orderId;
                    resultData.Signature = Guid.NewGuid().ToString();
                }
                else
                {
                    resultData.PaymentStatus = "10";
                    resultData.PaymentMessage = "Payment process failed";
                }

            }
            else
            {
                resultData.PaymentStatus = "99";
                resultData.PaymentMessage = "Invalid signature in response";
            }

            return resultData;

        }
    }
}
