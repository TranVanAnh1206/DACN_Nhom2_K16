namespace BookStore.Models.Models
{
    public class Voucher
    {
        public int Id { get; set; }

        public int Percent { get; set; }

        public ICollection<VoucherUser> VoucherUsers { get; set; }
    }
}
