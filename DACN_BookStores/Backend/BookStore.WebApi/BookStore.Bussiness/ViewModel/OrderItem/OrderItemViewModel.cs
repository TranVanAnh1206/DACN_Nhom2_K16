using BookStore.Models.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.ViewModel.OrderItem
{
    public class OrderItemViewModel
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string BookImage { get; set; }
        public decimal BookPrice { get; set; }
        public bool IsReviewed { get; set; } = false;        
        public int Quantity { get; set; }
    }
}
