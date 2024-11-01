using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Services
{
    public class OrderItemService 
        : BaseService<OrderItemViewModel, OrderItem, OrderItemCreateViewModel, OrderItemUpdateViewModel>, IOrserItemService
    {
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IMapper _mapper;

        public OrderItemService(IOrderItemRepository orderItemRepository, IMapper mapper) : base(orderItemRepository, mapper)
        {
            _orderItemRepository = orderItemRepository;
            _mapper = mapper;
        }

        public async Task<int> IsReviewed(int orderId, string userId, int bookId)
        {
            var res = await _orderItemRepository.IsReviewed(orderId, userId, bookId);

            return res;
        }
    }
}
