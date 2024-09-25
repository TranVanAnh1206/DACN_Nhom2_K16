using AutoMapper;
using BookStore.Bussiness.Extensions;

namespace BookStore.Bussiness.ObjectMapping
{
    public class PaginatedListConverter<TSource, TDestination> 
        : ITypeConverter<PaginationList<TSource>, PaginationList<TDestination>>
    {
        public PaginationList<TDestination> Convert(PaginationList<TSource> source,
                                                    PaginationList<TDestination> destination, 
                                                    ResolutionContext context)
        {
            var mappedItems = context.Mapper.Map<List<TDestination>>(source);
            return new PaginationList<TDestination>(mappedItems, source.PageNumber, source.PageSize, source.TotalCount);
        }
    }
}
