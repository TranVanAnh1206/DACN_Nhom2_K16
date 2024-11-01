using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Bussiness.ViewModel.CartItem
{
    public class CartItemViewModel
    {
        public int Id { get; set; }

        public int CartId { get; set; }

        public int BookId { get; set; }

        public string BookName { get; set; }

        public string BookImage { get; set; }

        public decimal BookPrice { get; set; }

        public int Quantity { get; set; }

        public decimal TotalPrice { get; set; }
    }
}
