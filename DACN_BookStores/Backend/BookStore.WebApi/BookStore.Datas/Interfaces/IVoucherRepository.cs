using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IVoucherRepository : IBaseRepository<Voucher>
    {
        Task UseVoucherForOrder(Voucher voucher);
    }
}
