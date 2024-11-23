using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Datas.DbContexts
{
    public class BookStoreDbContext : IdentityDbContext<User>
    {
        public BookStoreDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<BookGroup> BookGroups { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<HubConnection> HubConnections { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookAuthor>()
                .HasKey(x => new { x.BookId, x.AuthorId });

            modelBuilder.Entity<BookAuthor>()
                .HasOne<Book>(x => x.Book)
                .WithMany(s => s.BookAuthors)
                .HasForeignKey(x => x.BookId);                

            modelBuilder.Entity<BookAuthor>()
                .HasOne<Author>(x => x.Author)
                .WithMany(x => x.BookAuthors)
                .HasForeignKey(x => x.AuthorId);

            base.OnModelCreating(modelBuilder);

            // Bỏ tiền tố AspNet của các bảng: mặc định
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName();
                if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }
            // -----
        }
    }
}
