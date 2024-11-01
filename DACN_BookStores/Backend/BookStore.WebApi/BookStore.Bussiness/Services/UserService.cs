using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public Task<UserViewModel> ChangeUserInfor(UserUpdateViewModel input, out User user)
    {
        throw new NotImplementedException();
    }
}