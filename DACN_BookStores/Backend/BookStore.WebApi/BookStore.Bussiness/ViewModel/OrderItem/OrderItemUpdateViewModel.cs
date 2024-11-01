namespace BookStore.Bussiness.ViewModel.OrderItem
{
    public class OrderItemUpdateViewModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
