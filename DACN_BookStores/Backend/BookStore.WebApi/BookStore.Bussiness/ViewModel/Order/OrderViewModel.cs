using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Models.Enums;
using BookStore.Models.Models;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPhoneNumber { get; set; }
        public string UserAddress { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderStatusEnum Status { get; set; }
        public int VoucherId { get; set; }
        public decimal VoucherDiscount { get; set; }
        public DateTime Date { get; set; }
        public IEnumerable<OrderItemViewModel> OrderItems { get; set; }
    }
}
