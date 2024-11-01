using BookStore.Bussiness.ViewModel.CartItem;

namespace BookStore.Bussiness.ViewModel.Cart
{
    public class CartCreateViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public List<CartItemCreateViewModel> CartItems { get; set; }
    }
}
