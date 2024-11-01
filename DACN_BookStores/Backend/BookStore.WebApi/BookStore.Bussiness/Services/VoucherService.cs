using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Errors;
using BookStore.Bussiness.ViewModel.Voucher;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Http;

namespace BookStore.Bussiness.Services
{
    public class VoucherService 
        : BaseService<VoucherViewModel, Voucher, VoucherCreateViewModel, VoucherUpdateViewModel>, IVoucherService
    {
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMapper _mapper;

        public VoucherService(IVoucherRepository voucherRepository, IMapper mapper) : base(voucherRepository, mapper)
        {
            _voucherRepository = voucherRepository;
            _mapper = mapper;
        }

        public async Task<ExceptionResponse> UseVoucher(int voucherId)
        {
            var voucher = await _voucherRepository.GetByIdAsync(voucherId);

            if (voucher != null)
            {
                if (voucher.MaxUsage == voucher.CurrentUsage)
                {
                    return new ExceptionResponse
                    {
                        StatusCode = 123,
                        Message = "Đã đạt giới hạn sử dụng của voucher."
                    };
                }

                await _voucherRepository.UseVoucherForOrder(voucher);
            }

            return new ExceptionResponse
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = "Không tìm thấy thẻ giảm giá"
            };
        }

        protected override Voucher ChangeToEntity(VoucherCreateViewModel create)
        {
            return _mapper.Map<Voucher>(create);
        }

        protected override Voucher ChangeToEntity(VoucherUpdateViewModel update)
        {
            return _mapper.Map<Voucher>(update);
        }

        protected override Voucher ChangeToEntity(VoucherViewModel viewModel)
        {
            return _mapper.Map<Voucher>(viewModel);
        }

        protected override VoucherViewModel ChangeToViewModel(Voucher entity)
        {
            return _mapper.Map<VoucherViewModel>(entity);
        }

    }
}
