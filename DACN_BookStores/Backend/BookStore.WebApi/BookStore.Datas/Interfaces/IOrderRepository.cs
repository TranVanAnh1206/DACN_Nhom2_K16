using BookStore.Models.Enums;
using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        Task<int> CancelledOrder(int id, string userId);
        Task<Order> GetByIdAsync(int orderId, string userId, string[] includes = null);
        Task<int> UpdateOrderStatus(int id, OrderStatusEnum orderStatus);
        Task<IEnumerable<Order>> GetOrderUser(string userId, string[] includes);
        //Task<bool> CheckReviewedForOrderProduct(int orderId, int bookId, string userId);
    }
}
