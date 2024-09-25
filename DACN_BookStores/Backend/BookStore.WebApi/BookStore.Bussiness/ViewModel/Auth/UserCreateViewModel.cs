using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Auth
{
    public class UserCreateViewModel
    {
        [Required]
        public string UserName { get; set; }

        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }
        // public bool IsActive { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Required]
        public string PhoneNumber { get; set; }
        public string? Address { get; set; }

        [Required]
        public string Role { get; set; } = "Admin";

        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }
    }
}
