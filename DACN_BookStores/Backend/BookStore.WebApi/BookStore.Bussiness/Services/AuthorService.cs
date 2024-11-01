using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Author;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Bussiness.Services
{
    public class AuthorService : BaseService<AuthorViewModel, Author, AuthorCreateViewModel, AuthorUpdateViewModel>, IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public AuthorService(IAuthorRepository authorRepository, IMapper mapper) : base(authorRepository, mapper)
        {
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        protected override Author ChangeToEntity(AuthorCreateViewModel create)
        {
            return _mapper.Map<Author>(create);
        }

        protected override Author ChangeToEntity(AuthorUpdateViewModel update)
        {
            return _mapper.Map<Author>(update);
        }

        protected override Author ChangeToEntity(AuthorViewModel viewModel)
        {
            return _mapper.Map<Author>(viewModel);
        }

        protected override AuthorViewModel ChangeToViewModel(Author entity)
        {
            return _mapper.Map<AuthorViewModel>(entity);
        }

        public override async Task<PaginationSet<AuthorViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _authorRepository.GetAllAsync(includes);

            if (spec != null && !string.IsNullOrEmpty(spec.Filter))
            {
                entities = entities.Where(x => x.FullName.Contains(spec.Filter));
            }

            entities = spec.Sorting switch
            {
                "name" => entities.OrderBy(x => x.FullName),
                _ => entities.OrderBy(x => x.FullName),
            };

            var pagingList = PaginationList<Author>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<AuthorViewModel>>(pagingList);

            return new PaginationSet<AuthorViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }
    }
}
