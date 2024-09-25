using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Auth
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Username là bắt buộc!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Email là bắt buộc!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password là bắt buộc!")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Address là bắt buộc!")]
        public string Address { get; set; }
        [Required(ErrorMessage = "PhoneNumber là bắt buộc!")]
        [DataType(DataType.PhoneNumber)]
        public string PhoneNumber { get; set; }
    }
}
