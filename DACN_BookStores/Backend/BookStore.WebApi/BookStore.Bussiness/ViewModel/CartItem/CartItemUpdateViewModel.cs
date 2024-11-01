namespace BookStore.Bussiness.ViewModel.CartItem
{
    public class CartItemUpdateViewModel
    {
        public int Id { get; set; }

        public int CartId { get; set; }

        public int BookId { get; set; }

        public int Quantity { get; set; }
    }
}
