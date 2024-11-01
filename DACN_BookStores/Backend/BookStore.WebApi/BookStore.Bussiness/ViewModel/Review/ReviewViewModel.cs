using BookStore.Models.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.Review
{
    public class ReviewViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string? Content { get; set; }
        public int Rate { get; set; }
        public string UserId { get; set; }
        public int OrderId { get; set; }
        public string UserName { get; set; }
        public int BookId { get; set; }
    }
}
