using BookStore.Bussiness.ViewModel.Author;
using BookStore.Bussiness.ViewModel.Review;

namespace BookStore.Bussiness.ViewModel.Book
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        // public string Author { get; set; }

        public decimal Price { get; set; }

        public int TotalPageNumber { get; set; } = 0;

        public double Rate { get; set; } = 0.0;

        public int BookGroupId { get; set; }

        public string BookGroupName { get; set; }
        // public BookGroupViewModel BookGroup { get; set; }

        public int Remaining { get; set; }

        public int PublisherId { get; set; }
        //public string PublisherName { get; set; }
        // public PublisherViewModel Publisher { get; set; }

        public DateTime PublishedAt { get; set; }

        public int TotalReviewNumber { get; set; }

        public List<AuthorViewModel> Author { get; set; }
        public List<ReviewViewModel> Reviews { get; set; }
    }
}
