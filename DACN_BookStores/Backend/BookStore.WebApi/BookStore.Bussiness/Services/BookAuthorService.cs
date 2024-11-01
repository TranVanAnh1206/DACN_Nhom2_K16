using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.BookAuthor;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class BookAuthorService 
        : BaseService<BookAuthorViewModel, BookAuthor, BookAuthorCreateViewModel, BookAuthorUpdateViewModel>, IBookAuthorService
    {
        private readonly IBookAuthorRepository _bookAuthorRepository;
        private readonly IMapper _mapper;

        public BookAuthorService(IBookAuthorRepository bookAuthorRepository, IMapper mapper) : base(bookAuthorRepository, mapper)
        {
            _bookAuthorRepository = bookAuthorRepository;
            _mapper = mapper;
        }
    }
}
