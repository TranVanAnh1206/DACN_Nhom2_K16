using BookStore.Bussiness.ViewModel.Payment.Commons;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace BookStore.Bussiness.ViewModel.Payment.Momo
{
    public class MomoPaymentRequest
    {

        public string? Amount { get; set; }

        public string? OrderId { get; set; }

        public string? OrderInfo { get; set; }
    }
}
