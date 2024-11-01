using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Errors;
using BookStore.Bussiness.ViewModel.Voucher;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces
{
    public interface IVoucherService : IBaseService<VoucherViewModel, VoucherCreateViewModel, VoucherUpdateViewModel>
    {
        Task<ExceptionResponse> UseVoucher(int voucherId);
    }
}
