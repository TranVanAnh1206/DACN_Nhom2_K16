namespace BookStore.Models.Models
{
    public class Voucher
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public decimal DiscountAmount { get; set; }

        public string? Description { get; set; }

        public DateTime ExpirationDate { get; set; }

        public bool IsActive { get; set; }

        public int MaxUsage { get; set; }

        public int CurrentUsage { get; set; }
    }
}
