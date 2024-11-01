using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Publisher;

namespace BookStore.WebApi.Controllers
{
    public class PublisherController : BaseController<PublisherViewModel, PublisherCreateViewModel, PublisherUpdateViewModel>
    {
        public PublisherController(IPublisherService publisherService) : base(publisherService)
        {
        }
    }
}
