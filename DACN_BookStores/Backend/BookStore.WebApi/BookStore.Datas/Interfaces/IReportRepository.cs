using BookStore.Models.Models;

namespace BookStore.Datas.Interfaces
{
    public interface IReportRepository
    {
        Task<Report> GetReport(int? day, int? month, int? year, string reportAuthor);
    }
}
