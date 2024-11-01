using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Bussiness.ViewModel.Review;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Identity;

namespace BookStore.Bussiness.Services
{
    public class ReviewService 
        : BaseService<ReviewViewModel, Review, ReviewCreateViewModel, ReviewUpdateViewModel>, IReviewService
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly UserManager<User> _userManager;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public ReviewService(IReviewRepository reviewRepository, UserManager<User> userManager, IBookRepository bookRepository, IMapper mapper) : base(reviewRepository, mapper)
        {
            _reviewRepository = reviewRepository;
            _userManager = userManager;
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        protected override Review ChangeToEntity(ReviewViewModel viewModel)
        {
            return _mapper.Map<Review>(viewModel);
        }

        protected override Review ChangeToEntity(ReviewCreateViewModel create)
        {
            return _mapper.Map<Review>(create);
        }

        protected override Review ChangeToEntity(ReviewUpdateViewModel update)
        {
            return _mapper.Map<Review>(update);
        }

        protected override ReviewViewModel ChangeToViewModel(Review entity)
        {
            return _mapper.Map<ReviewViewModel>(entity);
        }

        public override async Task<int> CreateAsync(ReviewCreateViewModel create)
        {
            var vm = ChangeToEntity(create);
            var isExist = await _reviewRepository.GetReviewByUserId(vm.UserId, vm.OrderId, vm.BookId);

            if (isExist != null)
            {
                return 0;
            }            

            var res = await _reviewRepository.CreateAsync(vm);
            var listRate = await _reviewRepository.GetRateOfBook(res.BookId);
            var averageRate = (listRate.Sum(x => x)) / listRate.Count();

            var bookRate = await _bookRepository.UpdateBookAverageRate(res.BookId, averageRate);

            if (res == null)
                return 0;

            return 1;
        }

        public override async Task<int> UpdateAsync(int id, ReviewUpdateViewModel update)
        {
            return await _reviewRepository.UpdateReview(ChangeToEntity(update));
        }

        public async Task<int> DeleteReview(int reviewId, string userId)
        {
            return await _reviewRepository.DeleteReview(reviewId, userId);
        }
    }
}
