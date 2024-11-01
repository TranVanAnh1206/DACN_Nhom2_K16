namespace BookStore.Bussiness.ViewModel.Cart
{
    public class CartUpdateViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
