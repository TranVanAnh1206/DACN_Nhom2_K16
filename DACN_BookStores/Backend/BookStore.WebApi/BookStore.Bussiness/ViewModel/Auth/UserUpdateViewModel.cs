namespace BookStore.Bussiness.ViewModel.Auth;

public class UserUpdateViewModel
{
    public string Id { get; set; }

    public string UserName { get; set; }

    public string Email { get; set; }

    public bool IsActive { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; }

    public string DisplayName { get; set; }

    public string Gender { get; set; }

    public DateOnly Birthday { get; set; }
}