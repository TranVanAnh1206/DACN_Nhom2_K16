using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface ICartRepository : IBaseRepository<Cart>
    {
        Task<int> UpdateQuantity(int id, int quantity);
        Task<Cart> GetCartByUserId(string userId, string[] includes = null);
        Task<int> GetCartId(string userId);

    }
}
