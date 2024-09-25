using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthcareAppointment.Data.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        private readonly BookStoreDbContext _dbContext;
        private readonly DbSet<TEntity> _dbSet;

        public BaseRepository(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            var res = await _dbSet.AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return res.Entity;
        }

        public async Task<int> DeleteAsync(int id)
        {
            var del = await _dbSet.FindAsync(id);
            if (del != null)
            {
                _dbSet.Remove(del);
                return await _dbContext.SaveChangesAsync();
            }

            return 0;
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(string[] includes = null)
        {
            if (includes != null && includes.Count() > 0)
            {
                var query = _dbSet.Include(includes.First());
                foreach (var include in includes.Skip(1))
                {
                    query = query.Include(include);
                }

                return query.ToList();
            }

            return _dbSet.AsEnumerable();
        }

        public virtual async Task<TEntity> GetByIdAsync(int id, string[] includes = null)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<int> UpdateAsync(int id, TEntity entity)
        {
            _dbSet.Update(entity);
            return await _dbContext.SaveChangesAsync();
        }
    }
}
