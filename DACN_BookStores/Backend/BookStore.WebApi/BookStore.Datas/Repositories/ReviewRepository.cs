using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using HealthcareAppointment.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.Repositories
{
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public ReviewRepository(BookStoreDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task<Review> CreateAsync(Review entity)
        {
            return base.CreateAsync(entity);
        }

        public async Task<int> DeleteReview(int reviewId, string userId)
        {
            var review = await _dbContext.Reviews.FirstOrDefaultAsync(x => x.Id ==  reviewId && x.UserId == userId);

            if (review == null)
            {
                return 0;
            }

            _dbContext.Reviews.Remove(review);
            return await _dbContext.SaveChangesAsync();
        }


        public async Task<List<int>> GetRateOfBook(int bookId)
        {
            return _dbContext.Reviews.Where(x => x.BookId == bookId).Select(x => x.Rate).ToList();
        }

        public async Task<Review> GetReviewByUserId(string userId, int orderId, int bookId)
        {
            return await _dbContext.Reviews.Where(x => x.BookId == bookId && x.OrderId == orderId && x.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task<int> UpdateReview(Review review)
        {
            var isExist = await _dbContext.Reviews.FindAsync(review.Id);

            if (isExist == null)
            {
                var error = new ErrorDetails(StatusCodes.Status404NotFound, "Không tồn tại comment này!");
                throw new ArgumentNullException(error.ToString());
            }

            isExist.Content = review.Content;
            isExist.Rate = review.Rate;
            isExist.Date = review.Date;
            isExist.BookId = review.BookId;

            return await _dbContext.SaveChangesAsync();
        }
    }
}
