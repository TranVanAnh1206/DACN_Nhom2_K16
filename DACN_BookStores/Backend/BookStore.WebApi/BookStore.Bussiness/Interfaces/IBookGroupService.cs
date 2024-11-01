using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.BookGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Interfaces
{
    public interface IBookGroupService : IBaseService<BookGroupViewModel, BookGroupCreateViewModel, BookGroupUpdateViewModel>
    {
    }
}
