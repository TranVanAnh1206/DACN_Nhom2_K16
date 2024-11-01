using AutoMapper;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Report;
using BookStore.Datas.Interfaces;

namespace BookStore.Bussiness.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;
        private readonly IMapper _mapper;

        public ReportService(IReportRepository reportRepository, IMapper mapper)
        {
            _reportRepository = reportRepository;
            _mapper = mapper;
        }

        public async Task<ReportViewModel> GetReport(int? day, int? month, int? year, string reportAuthor)
        {
            return _mapper.Map<ReportViewModel>(await _reportRepository.GetReport(day, month, year, reportAuthor));    
        }
    }
}
