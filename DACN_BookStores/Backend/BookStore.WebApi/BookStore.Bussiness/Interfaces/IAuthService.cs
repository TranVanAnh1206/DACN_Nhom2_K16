using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultViewModel> Login(LoginViewModel login);
        Task<User> Register(RegisterViewModel register);
        Task<AuthResultViewModel> RefreshToken(RefreshTokenRequestViewModel request);
    }
}
