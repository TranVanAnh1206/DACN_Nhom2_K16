using AutoMapper;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Bussiness.ViewModel.Author;
using BookStore.Bussiness.ViewModel.Book;
using BookStore.Bussiness.ViewModel.BookAuthor;
using BookStore.Bussiness.ViewModel.BookGroup;
using BookStore.Bussiness.ViewModel.Cart;
using BookStore.Bussiness.ViewModel.CartItem;
using BookStore.Bussiness.ViewModel.Order;
using BookStore.Bussiness.ViewModel.OrderItem;
using BookStore.Bussiness.ViewModel.Publisher;
using BookStore.Bussiness.ViewModel.Report;
using BookStore.Bussiness.ViewModel.Review;
using BookStore.Bussiness.ViewModel.Voucher;
using BookStore.Models.Models;

namespace BookStore.Bussiness.ObjectMapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Publisher, PublisherViewModel>();            
            CreateMap<PublisherViewModel, Publisher>();
            CreateMap<PublisherCreateViewModel, Publisher>();
            CreateMap<PublisherUpdateViewModel, Publisher>();

            CreateMap<Author, AuthorViewModel>();
            CreateMap<AuthorViewModel, Author>();
            CreateMap<AuthorCreateViewModel, Author>();
            CreateMap<AuthorUpdateViewModel, Author>();

            CreateMap<Book, BookViewModel>()
                .ForMember(x => x.BookGroupName, s => s.MapFrom(x => x.BookGroup.Name))
                .ForMember(x => x.Author, s => s.MapFrom(x => x.BookAuthors.Select(x => x.Author)))
                .ForMember(x => x.TotalReviewNumber, s => s.MapFrom(x => x.Reviews.Count()));
                // .ForMember(x => x.AuthorName, s => s.MapFrom(x => x.BookAuthors.Select(a => a.Author.FullName)));
                //.ForMember(x => x.PublisherName, s => s.MapFrom(x => x.Publisher.Name));
            CreateMap<BookViewModel, Book>();
            CreateMap<BookCreateViewModel, Book>();
            CreateMap<BookUpdateViewModel, Book>();

            CreateMap<BookGroup, BookGroupViewModel>();
            CreateMap<BookGroupViewModel, BookGroup>();
            CreateMap<BookGroupCreateViewModel, BookGroup>();
            CreateMap<BookGroupUpdateViewModel, BookGroup>();

            CreateMap<BookAuthor, BookAuthorViewModel>();
            CreateMap<BookAuthorViewModel, BookAuthor>();
            CreateMap<BookAuthorCreateViewModel, BookAuthor>();
            CreateMap<BookAuthorUpdateViewModel, BookAuthor>();

            CreateMap<Cart, CartViewModel>();
                //.ForMember(x => x.BookName, x => x.MapFrom(e => e.Book.Title))
                //.ForMember(x => x.BookPrice, x => x.MapFrom(e => e.Book.Price));
            CreateMap<CartViewModel, Cart>();
            CreateMap<CartCreateViewModel, Cart>();
            CreateMap<CartUpdateViewModel, Cart>();

            CreateMap<CartItem, CartItemViewModel>()
                .ForMember(x => x.BookName, x => x.MapFrom(e => e.Book.Title))
                .ForMember(x => x.BookPrice, x => x.MapFrom(e => e.Book.Price))
                .ForMember(x => x.BookImage, x => x.MapFrom(e => e.Book.Image))
                .ForMember(x => x.TotalPrice, x => x.MapFrom(e => e.Book.Price * e.Quantity));
            CreateMap<CartItemViewModel, CartItem>();
            CreateMap<CartItemCreateViewModel, CartItem>();
            CreateMap<CartItemUpdateViewModel, CartItem>();

            CreateMap<User, UserViewModel>();
            CreateMap<RegisterViewModel, User>();
            CreateMap<UserCreateViewModel, User>();

            CreateMap<Order, OrderViewModel>()
                .ForMember(x => x.UserName, e => e.MapFrom(x => x.User.UserName))
                .ForMember(x => x.UserEmail, e => e.MapFrom(x => x.User.Email))
                .ForMember(x => x.UserPhoneNumber, e => e.MapFrom(x => x.User.PhoneNumber))
                .ForMember(x => x.UserAddress, e => e.MapFrom(x => x.User.Address));
            CreateMap<OrderViewModel, Order>();
            CreateMap<OrderCreateViewModel, Order>();
            CreateMap<OrderUpdateViewModel, Order>();

            CreateMap<OrderItem, OrderItemViewModel>()
                .ForMember(x => x.BookName, x => x.MapFrom(e => e.Book.Title))
                .ForMember(x => x.BookImage, x => x.MapFrom(e => e.Book.Image))
                .ForMember(x => x.BookPrice, x => x.MapFrom(e => e.Book.Price));
            CreateMap<OrderItemViewModel, OrderItem>();
            CreateMap<OrderItemCreateViewModel, OrderItem>();
            CreateMap<OrderItemUpdateViewModel, OrderItem>();

            CreateMap<Review, ReviewViewModel>()
                .ForMember(x => x.UserName, x=> x.MapFrom(s => s.User.UserName));
            CreateMap<ReviewViewModel, Review>();
            CreateMap<ReviewCreateViewModel, Review>();
            CreateMap<ReviewUpdateViewModel, Review>();

            CreateMap<ReportViewModel, Report>();
            CreateMap<Report, ReportViewModel>();

            CreateMap<VoucherViewModel, Voucher>();
            CreateMap<Voucher, VoucherViewModel>();
            CreateMap<VoucherCreateViewModel, Voucher>();
            CreateMap<VoucherUpdateViewModel, Voucher>();
            CreateMap<VoucherUser, VoucherUserViewModel>()
                .ForMember(x => x.Percent, x => x.MapFrom(e => e.Voucher.Percent));

            CreateMap(typeof(PaginationList<>), typeof(PaginationList<>))
                .ConvertUsing(typeof(PaginatedListConverter<,>));
        }
    }
}
