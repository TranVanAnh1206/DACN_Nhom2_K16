using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("HubConnections")]
    public class HubConnection
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ConnectionId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
