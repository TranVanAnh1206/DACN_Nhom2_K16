using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface ICartItemRepository : IBaseRepository<CartItem>
    {
        Task<CartItem> GetCartItemAsync(int cartId, int bookId);
        Task<CartItem> AddToCart(CartItem cartItem);
        Task<CartItem> GetCartItemIsExist(int bookId, int cartId, string userId);
        Task<CartItem> UpdateCartItemQuantity(int bookId, int cartid, int quantity, string userid);
        Task<CartItem> UpdateQuantity(int bookId, int cartid, int quantity, string userid);
        Task<int> DeleteCartItem(int bookId, int cartid, string userId);
    }
}
