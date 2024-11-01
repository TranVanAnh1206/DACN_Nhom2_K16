using BookStore.Bussiness.ViewModel.Report;
using BookStore.Models.Models;

namespace BookStore.Bussiness.Interfaces
{
    public interface IReportService
    {
        Task<ReportViewModel> GetReport(int? day, int? month, int? year, string reportAuthor);
    }
}
