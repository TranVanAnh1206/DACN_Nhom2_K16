using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Reviews")]
    public class Review
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string? Content { get; set; }

        [Required]
        [Range(0, 5)]
        public int Rate { get; set; }

        [Required]
        public int OrderId { get; set; }

        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        public int BookId { get; set; }
        [ForeignKey(nameof(BookId))]
        public Book Book { get; set; }
    }
}
