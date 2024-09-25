namespace BookStore.Bussiness.Extensions
{
    public class PaginationParams
    {
        private const int _maxPageSize = 50;
        private int _pageSize = 10;

        public PaginationParams()
        {
        }

        public PaginationParams(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int PageNumber { get; set; } = 1;
        public int PageSize
        {
            get => _pageSize;
            set
            {
                _pageSize = (value > _maxPageSize) ? _maxPageSize : value;                
            }
        }
    }
}
