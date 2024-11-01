using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.BookGroup;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Bussiness.Services
{
    public class BookGroupService : BaseService<BookGroupViewModel, BookGroup, BookGroupCreateViewModel, BookGroupUpdateViewModel>, IBookGroupService
    {
        private readonly IBookGroupRepository _bookGroupRepository;
        private readonly IMapper _mapper;

        public BookGroupService(IBookGroupRepository bookGroupRepository, IMapper mapper) : base(bookGroupRepository, mapper)
        {
            _bookGroupRepository = bookGroupRepository;
            _mapper = mapper;
        }

        protected override BookGroup ChangeToEntity(BookGroupCreateViewModel create)
        {
            return _mapper.Map<BookGroup>(create);
        }

        protected override BookGroup ChangeToEntity(BookGroupUpdateViewModel update)
        {
            return _mapper.Map<BookGroup>(update);
        }

        protected override BookGroup ChangeToEntity(BookGroupViewModel viewModel)
        {
            return _mapper.Map<BookGroup>(viewModel);
        }

        protected override BookGroupViewModel ChangeToViewModel(BookGroup entity)
        {
            return _mapper.Map<BookGroupViewModel>(entity);
        }

        public override async Task<PaginationSet<BookGroupViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _bookGroupRepository.GetAllAsync(includes);

            if (spec != null && !string.IsNullOrEmpty(spec.Filter))
            {
                entities = entities.Where(x => x.Name.Contains(spec.Filter));
            }

            entities = spec.Sorting switch
            {
                "name" => entities.OrderBy(x => x.Name),
                _ => entities.OrderBy(x => x.Name),
            };

            var pagingList = PaginationList<BookGroup>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<BookGroupViewModel>>(pagingList);

            return new PaginationSet<BookGroupViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }
    }
}
