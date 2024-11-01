using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces;

public interface IUserService
{
    Task<UserViewModel> ChangeUserInfor(UserUpdateViewModel input, out User user);
}