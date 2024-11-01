using BookStore.Bussiness.ViewModel.CartItem;

namespace BookStore.Bussiness.ViewModel.Cart
{
    public class CartViewModel
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public List<CartItemViewModel> CartItems { get; set; }
    }
}
