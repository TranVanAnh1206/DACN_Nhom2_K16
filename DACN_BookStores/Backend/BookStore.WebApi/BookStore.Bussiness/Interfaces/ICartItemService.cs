using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.CartItem;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Interfaces
{
    public interface ICartItemService : IBaseService<CartItemViewModel, CartItemCreateViewModel, CartItemUpdateViewModel>
    {
        Task<CartItemViewModel> GetCartItemAsync(int cartId, int bookId);
        Task<CartItemViewModel> GetCartItemIsExist(int bookId, int cartId, string userId);
        Task<CartItemViewModel> UpdateCartItemQuantity(int bookId, int cartid, int quantity, string userid);
        Task<CartItemViewModel> UpdateQuantity(int bookId, int cartid, int quantity, string userid);
        Task<int> DeleteCartItem(int bookId, int cartid, string userId);
    }
}
