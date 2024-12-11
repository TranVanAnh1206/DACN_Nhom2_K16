using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel;
using BookStore.Bussiness.ViewModel.Book;
using BookStore.Bussiness.ViewModel.BookAuthor;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Services
{
    public class BookService : BaseService<BookViewModel, Book, BookCreateViewModel, BookUpdateViewModel>, IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IBookAuthorRepository _bookAuthorRepository;
        private readonly IMapper _mapper;

        public BookService(IBookRepository bookRepository, IBookAuthorRepository bookAuthorRepository, IMapper mapper) : base(bookRepository, mapper)
        {
            _bookRepository = bookRepository;
            _bookAuthorRepository = bookAuthorRepository;
            _mapper = mapper;
        }

        protected override Book ChangeToEntity(BookCreateViewModel create)
        {
            return _mapper.Map<Book>(create);
        }

        protected override Book ChangeToEntity(BookUpdateViewModel update)
        {
            return _mapper.Map<Book>(update);
        }

        protected override Book ChangeToEntity(BookViewModel viewModel)
        {
            return _mapper.Map<Book>(viewModel);
        }

        protected override BookViewModel ChangeToViewModel(Book entity)
        {
            return _mapper.Map<BookViewModel>(entity);
        }

        public override async Task<PaginationSet<BookViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _bookRepository.GetAllAsync(includes);

            if (spec != null && !string.IsNullOrEmpty(spec.Filter))
            {
                entities = entities.Where(x => x.Title.ToLower().Contains(spec.Filter.ToLower()));
            }

            entities = spec.Sorting switch
            {
                "name" => entities.OrderBy(x => x.Title),
                "publishedAt" => entities.OrderBy(x => x.PublishedAt),
                "rate" => entities.OrderBy(x => x.Rate),
                "price" => entities.OrderBy(x => x.Price),
                _ => entities.OrderBy(x => x.Title),
            };

            var pagingList = PaginationList<Book>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<BookViewModel>>(pagingList);

            return new PaginationSet<BookViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }

        public override async Task<int> UpdateAsync(int id, BookUpdateViewModel update)
        {
            var res = await _bookRepository.UpdateAsync(id, ChangeToEntity(update));

            if (res == 0)
                return 0;

            var bookAuthor = await _bookAuthorRepository.GetAllBookAuthorByBookId(id);

            var deletedBook = await _bookAuthorRepository.DeleteAllBookAuthorByBookId(id);

            if (deletedBook == 0) 
                return 0;

            if (update.AuthorId != null && update.AuthorId.Count() > 0)
            {
                foreach (var item in update.AuthorId)
                {
                    var ba = new BookAuthorCreateViewModel
                    {
                        AuthorId = item,
                        BookId = id
                    };

                    await _bookAuthorRepository.CreateAsync(_mapper.Map<BookAuthor>(ba));
                }
            }

            return 1;
        }

        public override async Task<int> CreateAsync(BookCreateViewModel create)
        {
            var res = await _bookRepository.CreateAsync(_mapper.Map<Book>(create));

            if (res == null) return 0;

            if (res != null && create.AuthorId != null && create.AuthorId.Count() > 0)
            {
                foreach (var item in create.AuthorId)
                {
                    var ba = new BookAuthorCreateViewModel
                    {
                        AuthorId = item,
                        BookId = res.Id
                    };

                    await _bookAuthorRepository.CreateAsync(_mapper.Map<BookAuthor>(ba));
                }
            }

            return 1;
        }

        public override async Task<BookViewModel> GetByIdAsync(int id, string[] includes = null)
        {
            var vm = _mapper.Map<BookViewModel>(await _bookRepository.GetByIdAsync(id, includes));

            // vm.AuthorName = await _bookRepository.GetAuthorNamesByBookIdAsync(id);

            return vm;
        }

        public async Task<PaginationSet<BookViewModel>> Search(BookSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _bookRepository.GetAllAsync(includes);

            if (entities != null && spec != null)
            {
                if (!string.IsNullOrEmpty(spec.Filter))
                {
                    entities = entities.Where(x => 
                        x.Title.ToLower().Contains(spec.Filter.ToLower()) ||
                        x.BookAuthors.Any(x => x.Author.FullName.ToLower().Contains(spec.Filter.ToLower()))
                    );
                }

                if (spec.AuthorIds != null)
                {
                    entities = entities.Where(x => x.BookAuthors.Any(s => spec.AuthorIds.Contains(s.AuthorId)));
                }

                //if (spec.PublisherId != null)
                //{
                //    entities = entities.Where(x => x.PublisherId == spec.PublisherId);
                //}

                if (spec.BookGroupIds != null)
                {
                    entities = entities.Where(x => spec.BookGroupIds.Contains(x.BookGroupId));
                }

                entities = spec.Sorting switch
                {
                    "name" => entities.OrderBy(x => x.Title),
                    "publishedAt" => entities.OrderBy(x => x.PublishedAt),
                    "rate" => entities.OrderBy(x => x.Rate),
                    "price" => entities.OrderBy(x => x.Price),
                    _ => entities.OrderBy(x => x.Title),
                };
            }

            var pagingList = PaginationList<Book>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<BookViewModel>>(pagingList);

            return new PaginationSet<BookViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }

        public async Task<PaginationSet<BookViewModel>> GetBookRelated(List<int>? authorId, int groupId, PaginationParams pageParams)
        {
            var res = await _bookRepository.GetBookRelated(authorId, groupId);

            var pagingList = PaginationList<Book>.Create(res, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<BookViewModel>>(pagingList);

            return new PaginationSet<BookViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }
    }
}
