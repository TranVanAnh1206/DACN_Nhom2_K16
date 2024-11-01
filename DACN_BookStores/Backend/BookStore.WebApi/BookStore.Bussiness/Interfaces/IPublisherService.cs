using BookStore.Businesses.Interfaces;
using BookStore.Bussiness.ViewModel.Publisher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.Interfaces
{
    public interface IPublisherService : IBaseService<PublisherViewModel, PublisherCreateViewModel, PublisherUpdateViewModel>
    {
    }
}
