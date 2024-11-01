using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IOrderItemRepository : IBaseRepository<OrderItem>
    {
        Task<int> IsReviewed(int orderId, string userId, int bookId);
    }
}
