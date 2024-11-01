using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IReviewRepository : IBaseRepository<Review>
    {
        Task<Review> GetReviewByUserId(string userId, int orderId, int bookId);
        Task<int> UpdateReview(Review review);
        Task<List<int>> GetRateOfBook(int bookId);
        Task<int> DeleteReview(int reviewId, string userId);
    }
}
