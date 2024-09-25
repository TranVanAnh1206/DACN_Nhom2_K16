namespace BookStore.Bussiness.Extensions
{
    public class PaginationSet<T>
    {
        public PaginationSet()
        {
        }

        public PaginationSet(int pageNumber, int pageSize, int totalCount, int totalPage, IEnumerable<T> datas)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPage = totalPage;
            Datas = datas;
        }

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }
        public IEnumerable<T> Datas { get; set; }
    }
}
