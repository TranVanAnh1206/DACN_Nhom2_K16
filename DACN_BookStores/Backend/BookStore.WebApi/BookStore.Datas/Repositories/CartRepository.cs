using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class CartRepository : BaseRepository<Cart>, ICartRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public CartRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Cart> GetCartByUserId(string userId, string[] includes = null)
        {
            IQueryable<Cart> cart = _dbContext.Carts;

            if (includes != null && includes.Count() > 0)
            {
                cart = cart.Include(includes.First());

                foreach (var include in includes)
                {
                    cart = cart.Include(include);
                }
            }

            var res = cart.SingleOrDefault(x => x.UserId == userId);

            return res;
        }

        public async Task<int> GetCartId(string userId)
        {
            var cart = await _dbContext.Carts.SingleOrDefaultAsync(x => x.UserId == userId);

            var cartId = cart.Id;

            cart = new Cart
            {
                CartItems = [],
                UserId = userId
            };

            if (cart == null)
            {
                await _dbContext.Carts.AddAsync(cart);
                await _dbContext.SaveChangesAsync();

                cartId = cart.Id;
            }

            return cartId;
        }

        public async Task<int> UpdateQuantity(int id, int quantity)
        {
            var enitity = await _dbContext.Carts.FindAsync(id);

            if (enitity == null)
            {
                return 0;
            }

            //enitity.Quantity = quantity;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
