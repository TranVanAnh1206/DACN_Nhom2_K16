using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using BookStore.Datas.DbContexts;
using Microsoft.Extensions.Configuration;

namespace BookStore.Datas.DbContexts
{
    public class BookStoreContextFactory : IDesignTimeDbContextFactory<BookStoreDbContext>
    {
        private readonly IConfiguration _configuration;

        public BookStoreContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public BookStoreDbContext CreateDbContext(string[] args)
        {
            var connectionString = _configuration.GetConnectionString("DefaultCOnnection");
            //var connectionString = _configuration.GetConnectionString("DefautlConnectionSqlExpress");
            var optionsBuilder = new DbContextOptionsBuilder<BookStoreDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new BookStoreDbContext(optionsBuilder.Options);
        }
    }
}
