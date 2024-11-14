using BookStore.Bussiness.ViewModel.Payment.Commons;
using BookStore.Bussiness.ViewModel.Payment.Momo;
using BookStore.Bussiness.ViewModel.Payment.Vnpay;

namespace BookStore.Bussiness.Interfaces
{
    public interface IPaymentService
    {
        Task<(bool, string?)> GetLinkMoMoPaymentAsync(string paymentUrl, string request);
        Task<string> SendMoMoPaymentRequestAsync(string endpoint, string postJsonString);
        Task<PaymentResultViewModel> HandleMoMoPaymentResultAsync(MomoPaymentResult resultDto);
        Task<PaymentResultViewModel> HandleVnpayPaymentResultAsync(VnpayPaymentResponse resultDto);

        //Task<string> SendVnpayPaymentRequestAsync();
    }
}
