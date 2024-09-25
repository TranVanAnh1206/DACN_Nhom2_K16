using BookStore.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookStore.Models.Models
{
    [Table("Notifications")]
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Message { get; set; }

        public NotificationTypeEnum MessageType { get; set; }

        public DateTime NoticationTime { get; set; }
    }
}
