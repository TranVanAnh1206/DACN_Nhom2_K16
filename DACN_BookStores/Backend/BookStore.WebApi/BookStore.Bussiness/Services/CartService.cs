using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Cart;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class CartService : BaseService<CartViewModel, Cart, CartCreateViewModel, CartUpdateViewModel>, ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;

        public CartService(ICartRepository cartRepository, IMapper mapper) : base(cartRepository, mapper)
        {
            _cartRepository = cartRepository;
            _mapper = mapper;
        }

        public async Task<CartViewModel> GetCartByUserId(string userId, string[] includes = null)
        {
            return ChangeToViewModel(await _cartRepository.GetCartByUserId(userId, includes));
        }

        public async Task<int> GetCartId(string userId)
        {
            return await _cartRepository.GetCartId(userId);
        }

        public async Task<int> UpdateQuantity(int id, int quantity)
        {
            return await _cartRepository.UpdateQuantity(id, quantity);
        }

        protected override Cart ChangeToEntity(CartCreateViewModel create)
        {
            return _mapper.Map<Cart>(create);
        }

        protected override Cart ChangeToEntity(CartUpdateViewModel update)
        {
            return _mapper.Map<Cart>(update);
        }

        protected override Cart ChangeToEntity(CartViewModel viewModel)
        {
            return _mapper.Map<Cart>(viewModel);
        }

        protected override CartViewModel ChangeToViewModel(Cart entity)
        {
            return _mapper.Map<CartViewModel>(entity);
        }
    }
}
