using BookStore.Bussiness.Extensions;

namespace BookStore.Businesses.Interfaces
{
    public interface IBaseService<TViewModel, TCreate, TUpdate> where TViewModel : class where TCreate : class where TUpdate : class
    {
        Task<IEnumerable<TViewModel>> GetAllAsync(string[] includes = null);
        Task<PaginationSet<TViewModel>> GetAllPagingAsync(BaseSpecification spec, PaginationParams pageParams, string[] includes = null);
        Task<TViewModel> GetByIdAsync(int id, string[] includes = null);
        Task<int> CreateAsync(TCreate create);
        Task<int> UpdateAsync(int id, TUpdate update);
        Task<int> DeleteAsync(int id);
    }
}
