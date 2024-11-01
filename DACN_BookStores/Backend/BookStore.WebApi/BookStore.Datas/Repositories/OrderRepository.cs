using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public OrderRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CancelledOrder(int id, string userId)
        {
            var order = await _dbContext.Orders.SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);

            if (order == null)
            {
                return 0;
            }

            if (order.Status == OrderStatusEnum.DaThanhToan || order.Status == OrderStatusEnum.DaHuy)
                return 0;

            order.Status = OrderStatusEnum.DaHuy;

            return await _dbContext.SaveChangesAsync();
        }

        //public async Task<bool> CheckReviewedForOrderProduct(int orderId, int bookId, string userId)
        //{
        //    var reviewOfOrder = await _dbContext.Reviews.SingleOrDefaultAsync(x => x.OrderId == orderId && x.BookId == bookId && x.UserId == userId);

        //    if (reviewOfOrder == null)
        //    {
        //        return false;
        //    }

        //    return true;
        //}

        public async Task<Order> GetByIdAsync(int orderId, string userId, string[] includes = null)
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = _dbContext.Orders.Include(includes.First());
                foreach (var include in includes.Skip(1))
                {
                    query = query.Include(include);
                }

                var res = await query.SingleOrDefaultAsync(x => x.Id == orderId && x.UserId == userId);

                return res;
            }

            return await _dbContext.Orders.SingleOrDefaultAsync(x => x.Id == orderId && x.UserId == userId);
        }

        public async Task<IEnumerable<Order>> GetOrderUser(string userId, string[] includes)
        {
            var orders = _dbContext.Orders.Where(x => x.UserId == userId).AsEnumerable();

            if (includes != null && includes.Count() > 0)
            {
                var query = _dbContext.Orders.Include(includes.First());
                foreach (var include in includes.Skip(1))
                {
                    query = query.Include(include);
                }

                query = query.Where(x => x.UserId == userId);

                return query.ToList();
            }

            return orders;
        }

        public async Task<int> UpdateOrderStatus(int id, OrderStatusEnum orderStatus)
        {
            var entity = _dbContext.Orders.Find(id);

            if (entity == null)
                return 0;

            entity.Status = orderStatus;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
