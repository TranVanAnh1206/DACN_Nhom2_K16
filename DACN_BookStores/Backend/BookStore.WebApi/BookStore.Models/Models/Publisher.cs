﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Publisher")]
    public class Publisher
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Address { get; set; }
                
        public string? Phone { get; set; }

        public string? Email { get; set; }

        public ICollection<Book> Books { get; set; }
    }
}
