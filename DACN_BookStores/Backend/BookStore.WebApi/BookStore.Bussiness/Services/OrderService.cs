using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Book;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Datas.Interfaces;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;

namespace BookStore.Bussiness.Services
{
    public class OrderService
        : BaseService<OrderViewModel, Order, OrderCreateViewModel, OrderUpdateViewModel>, IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IVoucherService _voucherService;
        private readonly UserManager<User> _userManager;
        private readonly ICartService _cartService;
        private readonly ICartItemService _cartItemService;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository,
            IOrderItemRepository orderItemRepository,
            IBookRepository bookRepository,
            IVoucherService voucherService,
            UserManager<User> userManager,
            ICartService cartService,
            ICartItemService cartItemService,
            IMapper mapper) : base(orderRepository, mapper)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _bookRepository = bookRepository;
            _voucherService = voucherService;
            _userManager = userManager;
            _cartService = cartService;
            _cartItemService = cartItemService;
            _mapper = mapper;
        }

        protected override Order ChangeToEntity(OrderCreateViewModel create)
        {
            return _mapper.Map<Order>(create);
        }

        protected override Order ChangeToEntity(OrderUpdateViewModel update)
        {
            return _mapper.Map<Order>(update);
        }

        protected override Order ChangeToEntity(OrderViewModel viewModel)
        {
            return _mapper.Map<Order>(viewModel);
        }

        protected override OrderViewModel ChangeToViewModel(Order entity)
        {
            return _mapper.Map<OrderViewModel>(entity);
        }

        public async Task<JObject> CreateAsync(OrderCreateViewModel create)
        {
            if (create.OrderItems == null || create.OrderItems.Count() == 0)
            {
                return new JObject
                {
                    ["StatusCode"] = 0,
                    ["Message"] = "Không ông thể đặt hàng."
                };
            }

            decimal totalAmount = 0;
            foreach (var item in create.OrderItems)
            {
                var book = await _bookRepository.GetByIdAsync(item.BookId);

                totalAmount += item.Quantity * book.Price;
            }

            // Áp dụng mã giảm giá
            var voucher = await _voucherService.GetByIdAsync(create.VoucherId);
            if (voucher != null)
            {
                var resUseVoucher = await _voucherService.UseVoucher(create.VoucherId);

                if (resUseVoucher != null)
                {
                    if (resUseVoucher.StatusCode == 123)
                    {
                        return new JObject
                        {
                            ["StatusCode"] = 2,
                            ["Message"] = "Đã đạt giới hạn sử dụng của mã giảm giá."
                        }; ;
                    }

                    if (resUseVoucher.StatusCode == 404)
                    {
                        return new JObject
                        {
                            ["StatusCode"] = 3,
                            ["Message"] = "Không tìm thấy thẻ giảm giá"
                        }; ;
                    }

                    totalAmount = totalAmount - voucher.DiscountAmount;
                }

            }

            var entity = ChangeToEntity(create);
            entity.TotalAmount = totalAmount;

            var order = await _orderRepository.CreateAsync(entity);

            if (order == null)
            {
                return new JObject
                {
                    ["StatusCode"] = 0,
                    ["Message"] = "Không ông thể đặt hàng."
                };
            }

            var cart = await _cartService.GetCartByUserId(create.UserId, new[] { "CartItems" });

            if (cart != null)
            {
                foreach (var item in create.OrderItems)
                {
                    var cartItemOrdered = await _cartItemService.GetCartItemAsync(cart.Id, item.BookId);

                    if (cartItemOrdered != null)
                        await _cartItemService.DeleteAsync(cartItemOrdered.Id);
                }
            }

            return new JObject
            {
                ["StatusCode"] = 1,
                ["Message"] = "Đặt hàng thành công!",
                ["OrderId"] = order.Id,
                ["TotalAmount"] = totalAmount.ToString()
            };
        }

        public async Task<PaginationSet<OrderViewModel>> GetOrders(OrderSpecification spec, PaginationParams pageParams)
        {
            var entities = await _orderRepository.GetAllAsync(new[] { "OrderItems", "OrderItems.Book", "User" });

            if (spec != null)
            {
                if (spec.Status != Models.Enums.OrderStatusEnum.All)
                    entities = entities.Where(x => x.Status == spec.Status);

                entities = spec.Sorted switch
                {
                    "date" => entities.OrderByDescending(x => x.Date),
                    _ => entities.OrderByDescending(x => x.Date),
                };
            }

            var pagingList = PaginationList<Order>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var vm = _mapper.Map<PaginationList<OrderViewModel>>(pagingList);
            foreach (var item in vm)
            {
                var voucher = await _voucherService.GetByIdAsync(item.VoucherId);

                if (voucher != null)
                    item.VoucherDiscount = voucher.DiscountAmount;
            }

            return new PaginationSet<OrderViewModel>(pageParams.PageNumber, pageParams.PageSize, vm.TotalCount, vm.TotalPage, vm);
        }

        public async Task<int> CancelledOrder(int id, string userId)
        {
            var res = await _orderRepository.CancelledOrder(id, userId);

            if (res == 0)
                return 0;

            return res;
        }

        public async Task<int> UpdateOrderStatus(int id, OrderStatusEnum statusOrder)
        {
            return await _orderRepository.UpdateOrderStatus(id, statusOrder);
        }

        public async Task<IEnumerable<OrderViewModel>> GetOrdersUser(string userId, OrderSpecification spec, string[] includes)
        {
            var entities = await _orderRepository.GetOrderUser(userId, includes);

            if (spec != null)
            {
                if (spec.Status != Models.Enums.OrderStatusEnum.All)
                    entities = entities.Where(x => x.Status == spec.Status);

                entities = spec.Sorted switch
                {
                    "date" => entities.OrderByDescending(x => x.Date),
                    _ => entities.OrderByDescending(x => x.Date),
                };
            }

            var vm = entities.Select(x => ChangeToViewModel(x)).ToList();

            foreach (var item in vm)
            {
                var voucher = await _voucherService.GetByIdAsync(item.VoucherId);

                if (voucher != null)
                    item.VoucherDiscount = voucher.DiscountAmount;
            }

            return vm;
        }

        public async Task<OrderViewModel> GetOrder(int orderId, string userId, string[] includes = null)
        {
            var order = await _orderRepository.GetByIdAsync(orderId, userId, includes);

            return ChangeToViewModel(order);
        }
    }
}
