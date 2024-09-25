namespace BookStore.Datas.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAllAsync(string[] includes = null);
        Task<TEntity> GetByIdAsync(int id, string[] includes = null);
        Task<int> DeleteAsync(int id);
        Task<int> UpdateAsync(int id, TEntity entity);
        Task<TEntity> CreateAsync(TEntity entity);

    }
}
