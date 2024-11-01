namespace BookStore.Bussiness.ViewModel.Report
{
    public class ReportViewModel
    {
        public DateTime ReportDate { get; set; }
        public int NumberOfBookSold { get; set; }
        public decimal Revenue { get; set; }
        public string ReportName { get; set; }
        public string ReportAuthor { get; set; }
    }
}
