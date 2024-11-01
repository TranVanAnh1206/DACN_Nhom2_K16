using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel.Voucher
{
    public class VoucherViewModel
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public decimal DiscountAmount { get; set; }

        public string? Description { get; set; }

        public DateTime ExpirationDate { get; set; }

        public bool IsActive { get; set; }

        public int MaxUsage { get; set; }

        public int CurrentUsage { get; set; }

        public string Status { 
            get
            {
                if (ExpirationDate > DateTime.Now)
                {
                    return "Hết hạn sử dụng";
                }

                if (CurrentUsage >= MaxUsage)
                {
                    return "Hết lượt sử dụng";
                }

                var numberOfUse = MaxUsage - CurrentUsage;

                return $"Còn lại {numberOfUse} lượt sử dụng";
            }
        }
    }
}
