using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Models.Enums;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderUpdateViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderStatusEnum Status { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<OrderItemUpdateViewModel> OrderItems { get; set; }
    }
}
