using BookStore.Models.Enums;

namespace BookStore.Bussiness.ViewModel.Order
{
    public class OrderSpecification
    {
        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.All;
        public string Sorted { get; set; } = "date";
    }
}
