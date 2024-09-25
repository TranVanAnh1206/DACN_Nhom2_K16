using BookStore.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        public int VoucherId { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        [Required]
        public OrderStatusEnum Status { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;


        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
