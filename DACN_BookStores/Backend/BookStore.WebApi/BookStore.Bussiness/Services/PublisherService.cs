using AutoMapper;
using BookStore.Businesses.Services;
using BookStore.Bussiness.Extensions;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Publisher;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using HealthcareAppointment.Data.Repositories;

namespace BookStore.Bussiness.Services
{
    public class PublisherService : BaseService<PublisherViewModel, Publisher, PublisherCreateViewModel, PublisherUpdateViewModel>, IPublisherService
    {
        private readonly IPublisherRepository _publisherRepository;
        private readonly IMapper _mapper;

        public PublisherService(IPublisherRepository publisherRepository, IMapper mapper) : base(publisherRepository, mapper)
        {
            _publisherRepository = publisherRepository;
            _mapper = mapper;
        }

        protected override Publisher ChangeToEntity(PublisherCreateViewModel create)
        {
            return _mapper.Map<Publisher>(create);
        }

        protected override Publisher ChangeToEntity(PublisherUpdateViewModel update)
        {
            return _mapper.Map<Publisher>(update);
        }

        protected override Publisher ChangeToEntity(PublisherViewModel viewModel)
        {
            return _mapper.Map<Publisher>(viewModel);
        }

        protected override PublisherViewModel ChangeToViewModel(Publisher entity)
        {
            return _mapper.Map<PublisherViewModel>(entity);
        }

        public override async Task<PaginationSet<PublisherViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _publisherRepository.GetAllAsync(includes);

            if (spec != null && !string.IsNullOrEmpty(spec.Filter))
            {
                entities = entities.Where(x => x.Name.Contains(spec.Filter));
            }

            entities = spec.Sorting switch
            {
                "name" => entities.OrderBy(x => x.Name),
                _ => entities.OrderBy(x => x.Name),
            };

            var pagingList = PaginationList<Publisher>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<PublisherViewModel>>(pagingList);

            return new PaginationSet<PublisherViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);
        }
    }
}
