using BookStore.Datas.DbContexts;

namespace BookStore.WebApi.SubscribeTableDependencies
{
    public interface ISubscribeTableDependency
    {
        void SubscribeTableDependency(string connectionString);
    }
}
