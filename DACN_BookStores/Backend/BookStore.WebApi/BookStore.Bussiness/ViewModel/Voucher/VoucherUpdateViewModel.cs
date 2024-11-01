using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Voucher
{
    public class VoucherUpdateViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        [Required]
        public decimal DiscountAmount { get; set; }

        public string? Description { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        public bool IsActive { get; set; }

        [Required]
        public int MaxUsage { get; set; }

        [Required]
        public int CurrentUsage { get; set; }
    }
}
