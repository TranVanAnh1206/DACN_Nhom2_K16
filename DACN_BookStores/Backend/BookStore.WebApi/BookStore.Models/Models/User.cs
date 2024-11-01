using Microsoft.AspNetCore.Identity;

namespace BookStore.Models.Models
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }

        public string? Address { get; set; }

        public string? Gender { get; set; } = null;

        public DateOnly? Birthday { get; set; } = null;

        public bool IsActive { get; set; } = true;

    }
}
