using Microsoft.AspNetCore.Identity;

namespace BookStore.Models.Models
{
    public class User : IdentityUser
    {
        public string? Address { get; set; }

        public bool IsActive { get; set; } = true;

        public ICollection<VoucherUser> VoucherUsers { get; set; }

    }
}
