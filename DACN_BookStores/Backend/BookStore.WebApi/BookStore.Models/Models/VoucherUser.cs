using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    public class VoucherUser
    {
        public int VoucherId { get; set; }
        public Voucher Voucher { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }

        public bool Used { get; set; } = false;
    }
}
