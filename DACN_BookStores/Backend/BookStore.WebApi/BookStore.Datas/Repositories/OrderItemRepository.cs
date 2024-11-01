using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Datas.Repositories
{
    public class OrderItemRepository : BaseRepository<OrderItem>, IOrderItemRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public OrderItemRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> IsReviewed(int orderId, string userId, int bookId)
        {
            var orderItem = 
                _dbContext.OrderItems.FirstOrDefault(x => x.OrderId == orderId && x.Order.UserId == userId && x.BookId == bookId);

            orderItem.IsReviewed = true;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
