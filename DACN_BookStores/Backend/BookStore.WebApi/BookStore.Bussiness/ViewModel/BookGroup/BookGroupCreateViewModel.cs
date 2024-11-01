using BookStore.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace BookStore.Bussiness.ViewModel.BookGroup
{
    public class BookGroupCreateViewModel
    {
        [Required]
        public string Name { get; set; }
    }
}
