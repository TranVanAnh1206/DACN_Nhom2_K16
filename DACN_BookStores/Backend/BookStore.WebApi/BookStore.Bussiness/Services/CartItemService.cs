using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.CartItem;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class CartItemService 
        : BaseService<CartItemViewModel, CartItem, CartItemCreateViewModel, CartItemUpdateViewModel>, ICartItemService
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IMapper _mapper;

        public CartItemService(ICartItemRepository cartItemRepository, IMapper mapper) : base(cartItemRepository, mapper)
        {
            _cartItemRepository = cartItemRepository;
            _mapper = mapper;
        }

        public async Task<int> DeleteCartItem(int bookId, int cartid, string userId)
        {
            return await _cartItemRepository.DeleteCartItem(bookId, cartid, userId);
        }

        public async Task<CartItemViewModel> GetCartItemAsync(int cartId, int bookId)
        {
            return ChangeToViewModel(await _cartItemRepository.GetCartItemAsync(cartId, bookId));
        }

        public async Task<CartItemViewModel> GetCartItemIsExist(int bookId, int cartId, string userId)
        {
            return ChangeToViewModel(await _cartItemRepository.GetCartItemIsExist(bookId, cartId, userId));
        }

        public async Task<CartItemViewModel> UpdateCartItemQuantity(int bookId, int cartid, int quantity, string userid)
        {
            return ChangeToViewModel(await _cartItemRepository.UpdateCartItemQuantity(bookId, cartid, quantity, userid));
        }

        public async Task<CartItemViewModel> UpdateQuantity(int bookId, int cartid, int quantity, string userid)
        {
            return ChangeToViewModel(await _cartItemRepository.UpdateQuantity(bookId, cartid, quantity, userid));
        }

        protected override CartItem ChangeToEntity(CartItemCreateViewModel create)
        {
            return _mapper.Map<CartItem>(create);
        }

        protected override CartItem ChangeToEntity(CartItemUpdateViewModel update)
        {
            return _mapper.Map<CartItem>(update);
        }

        protected override CartItem ChangeToEntity(CartItemViewModel viewModel)
        {
            return _mapper.Map<CartItem>(viewModel);
        }

        protected override CartItemViewModel ChangeToViewModel(CartItem entity)
        {
            return _mapper.Map<CartItemViewModel>(entity);
        }
    }
}
