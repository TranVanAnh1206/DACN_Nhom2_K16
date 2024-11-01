using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Cart;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces
{
    public interface ICartService : IBaseService<CartViewModel, CartCreateViewModel, CartUpdateViewModel>
    {
        Task<int> UpdateQuantity(int id, int quantity);
        Task<CartViewModel> GetCartByUserId(string userId, string[] includes = null);
        Task<int> GetCartId(string userId);
    }
}
