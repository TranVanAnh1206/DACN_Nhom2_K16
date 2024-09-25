namespace BookStore.Bussiness.Extensions
{
    public class PaginationList<T> : List<T>
    {
        public PaginationList(List<T> items, int pageNumber, int pageSize, int totalCount)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPage = (int) Math.Ceiling((double) totalCount/pageSize);

            this.AddRange(items);
        }

        public int PageNumber { get; private set; }
        public int PageSize { get; private set; }
        public int TotalCount { get; private set; }
        public int TotalPage { get; private set; }

        public static PaginationList<T> Create (IEnumerable<T> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PaginationList<T>(items, pageNumber, pageSize, count);
        } 
    }
}
