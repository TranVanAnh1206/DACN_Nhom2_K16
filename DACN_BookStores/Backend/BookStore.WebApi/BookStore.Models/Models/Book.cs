using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Books")]
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [MinLength(3)]
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Image { get; set; }

        // public string Author { get; set; }

        public decimal Price { get; set; }

        public int TotalPageNumber { get; set; } = 0;

        public int Remaining { get; set; } = 0;

        [Range(0, 5)]
        public double Rate { get; set; } = 0.0;

        public int BookGroupId { get; set; }
        [ForeignKey(nameof(BookGroupId))]
        public BookGroup BookGroup { get; set; }

        [Required]
        public int PublisherId { get; set; }

        [ForeignKey(nameof(PublisherId))]
        public Publisher Publisher { get; set; }

        public DateTime PublishedAt { get; set; }

        public IEnumerable<BookAuthor> BookAuthors { get; set; }
        public IEnumerable<Review> Reviews { get; set; }

    }
}
