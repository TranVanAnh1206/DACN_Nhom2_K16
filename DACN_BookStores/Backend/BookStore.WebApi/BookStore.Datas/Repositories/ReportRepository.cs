using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Enums;
using BookStore.Models.Models;

namespace BookStore.Datas.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly BookStoreDbContext _dbContext;

        public ReportRepository(BookStoreDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Report> GetReport(int? day, int? month, int? year, string reportAuthor)
        {
            var report = _dbContext.Orders
                .Join(_dbContext.OrderItems, o => o.Id, oi => oi.OrderId, (o, oi) => new { o, oi })
                .Where(x => 
                        (x.o.Date.Year == year || x.o.Date.Day == day || x.o.Date.Month == month) 
                        && x.o.Status == OrderStatusEnum.DaGiaoHang
                      )
                .Select(g => new Report
                {
                    ReportDate = DateTime.Now,
                    ReportAuthor = reportAuthor,
                    NumberOfBookSold = 0, //g.Sum(x => x.oi.Quantity),
                    ReportName = day == null ? (month == null ? $"Báo cáo năm {year}" : $"Báo cáo tháng {month}") : $"Báo cáo ngày {day}" 
                }).ToList();

            //var res = from o in _dbContext.Orders
            //          join 

            return report[0];
        }
    }
}
