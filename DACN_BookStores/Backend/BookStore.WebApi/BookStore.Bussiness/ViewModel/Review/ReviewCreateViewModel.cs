using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Review
{
    public class ReviewCreateViewModel
    {
        [Required]
        public DateTime Date { get; set; }
        public string? Content { get; set; }

        public string? UserId { get; set; }

        [Required]
        [Range(0, 5, ErrorMessage = "Đánh giá chỉ tử 0 - 5")]
        public int Rate { get; set; }

        [Required]
        public int BookId { get; set; }

        public int OrderId { get; set; }
    }
}
