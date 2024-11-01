using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class CartItemRepository : BaseRepository<CartItem>, ICartItemRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public CartItemRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CartItem> AddToCart(CartItem cartItem)
        {
            var cart = await _dbContext.CartItems.AddAsync(cartItem);

            return cart.Entity;
        }

        public async Task<int> DeleteCartItem(int bookId, int cartid, string userId)
        {
            var itemOfCart = _dbContext.CartItems.Where(x => x.CartId == cartid && x.Cart.UserId == userId);

            var item = await itemOfCart.FirstOrDefaultAsync(x => x.BookId == bookId);

            _dbContext.CartItems.Remove(item);

            return await _dbContext.SaveChangesAsync();
        }

        public async Task<CartItem> GetCartItemAsync(int cartId, int bookId)
        {
            var res = await _dbContext.CartItems.Where(x => x.CartId == cartId).FirstOrDefaultAsync(x => x.BookId == bookId);

            return res;
        }

        public async Task<CartItem> GetCartItemIsExist(int bookId, int cartId, string userId)
        {
            var itemOfCart = _dbContext.CartItems.Where(x => x.CartId == cartId);

            var isExist = await itemOfCart.FirstOrDefaultAsync(x => x.BookId == bookId);

            return isExist;
        }

        public async Task<CartItem> UpdateCartItemQuantity(int bookId, int cartid, int quantity, string userid)
        {
            var itemOfCart = _dbContext.CartItems.Where(x => x.CartId == cartid && x.Cart.UserId == userid);

            var item = await itemOfCart.FirstOrDefaultAsync(x => x.BookId == bookId);

            item.Quantity += quantity;

            await _dbContext.SaveChangesAsync();

            return item;
        }

        public async Task<CartItem> UpdateQuantity(int bookId, int cartid, int quantity, string userid)
        {
            var itemOfCart = _dbContext.CartItems.Where(x => x.CartId == cartid && x.Cart.UserId == userid);

            var item = await itemOfCart.FirstOrDefaultAsync(x => x.BookId == bookId);

            item.Quantity = quantity;

            await _dbContext.SaveChangesAsync();

            return item;
        }
    }
}
