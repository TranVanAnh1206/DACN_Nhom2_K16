using AutoMapper;
using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.Extensions;
using BookStore.Datas.Interfaces;

namespace BookStore.Businesses.Services
{
    public class BaseService<TViewModel, TEntity, TCreate, TUpdate> 
        : IBaseService<TViewModel, TCreate, TUpdate> where TViewModel : class where TEntity : class where TCreate : class where TUpdate : class
    {
        private readonly IBaseRepository<TEntity> _baseRepository;
        private readonly IMapper _mapper;

        public BaseService(IBaseRepository<TEntity> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }

        protected virtual TEntity ChangeToEntity (TViewModel viewModel) => throw new NotImplementedException();
        protected virtual TEntity ChangeToEntity (TCreate create) => throw new NotImplementedException();
        protected virtual TEntity ChangeToEntity (TUpdate update) => throw new NotImplementedException();
        protected virtual TViewModel ChangeToViewModel (TEntity entity) => throw new NotImplementedException();

        public virtual async Task<int> CreateAsync(TCreate create)
        {
            var res = await _baseRepository.CreateAsync(ChangeToEntity(create));

            if (res == null)
                return 0;

            return 1;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _baseRepository.DeleteAsync(id);
        }

        public virtual async Task<IEnumerable<TViewModel>> GetAllAsync(string[] includes = null)
        {
            var entities = await _baseRepository.GetAllAsync(includes);
            return entities.Select(x => ChangeToViewModel(x));
        }

        public virtual async Task<TViewModel> GetByIdAsync(int id, string[] includes = null)
        {
            return ChangeToViewModel(await _baseRepository.GetByIdAsync(id, includes));
        }

        public virtual async Task<int> UpdateAsync(int id, TUpdate update)
        {
            return await _baseRepository.UpdateAsync(id, ChangeToEntity(update));
        }

        public virtual async Task<PaginationSet<TViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null)
        {
            var entities = await _baseRepository.GetAllAsync(includes);

            var pagingList = PaginationList<TEntity>.Create(entities, pageParams.PageNumber, pageParams.PageSize);

            var pagingList_map = _mapper.Map<PaginationList<TViewModel>>(pagingList);

            return new PaginationSet<TViewModel>(pageParams.PageNumber, pageParams.PageSize, pagingList_map.TotalCount, pagingList_map.TotalPage, pagingList_map);

        }


    }
    
}
