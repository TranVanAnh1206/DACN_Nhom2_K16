using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Voucher
{
    public class VoucherCreateViewModel
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public decimal DiscountAmount { get; set; }

        public string? Description { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        public bool IsActive { get; set; }

        public int MaxUsage { get; set; }

        public int CurrentUsage { get; set; }
    }
}
