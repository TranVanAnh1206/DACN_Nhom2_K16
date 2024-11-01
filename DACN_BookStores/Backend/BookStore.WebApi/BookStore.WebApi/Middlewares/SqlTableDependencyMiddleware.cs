using BookStore.WebApi.SubscribeTableDependencies;

namespace BookStore.WebApi.Middlewares
{
    public static class SqlTableDependencyMiddleware
    {
        public static void UseSqlTableDependency<T>(this IApplicationBuilder app, string connectionString)
            where T : ISubscribeTableDependency
        {
            // Lấy service scope factory từ ApplicationServices
            var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();

            // Tạo scope mới để xử lý các scoped services
            using (var scope = serviceScopeFactory.CreateScope())
            {
                // Lấy scoped service từ scope
                var service = scope.ServiceProvider.GetService<T>();
                service?.SubscribeTableDependency(connectionString);
            }

            //var service = app.ApplicationServices.GetService<T>();
            //service?.SubscribeTableDependency(connectionString);
        }
    }
}
