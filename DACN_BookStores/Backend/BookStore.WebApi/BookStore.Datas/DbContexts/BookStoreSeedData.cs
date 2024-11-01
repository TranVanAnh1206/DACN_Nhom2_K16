using BookStore.Datas.SeedingDatas;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BookStore.Datas.DbContexts
{
    public static class BookStoreSeedData
    {
        public static async Task Initalize(IServiceProvider serviceProvider)
        {
            using (var context = new BookStoreDbContext(serviceProvider.GetRequiredService<DbContextOptions<BookStoreDbContext>>()))
            {
                await UserDataSeedContributor.UserDataSeeder(context, serviceProvider);
                var authors = await AuthorDataSeedContributor.AuthorSeeder(context, serviceProvider);
                var publishers = await PublisherDataSeedContributor.PublishersSeeder(context, serviceProvider);
                var genges = await BookGroupDataSeedContributor.BookGroupSeeder(context, serviceProvider);

                if (authors != null && publishers != null && genges != null)
                {
                    #region Dữ liệu Seeding Books

                    var books = await (new ProductDataSeedContributor(genges, publishers)).BookSeederAsync(context, serviceProvider);


                    List<Review> reviews = new List<Review>
                {
                    new Review
                    {
                        Date = DateTime.Now,
                        Content = "A fascinating read with great insights.",
                        Rate = 5,
                        UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",
                        BookId = books[0].Id
                    },
                    new Review
                    {
                        Date = DateTime.Now.AddDays(-1),
                        Content = "Good book, but a bit lengthy in some parts.",
                        Rate = 4,
                        UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        BookId =books[0].Id
                    },
                    new Review
                    {
                        Date = DateTime.Now.AddDays(-2),
                        Content = "Not my type of book. Found it quite boring.",
                        Rate = 2,
                        UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",
                        BookId = books[0].Id
                    },
                    new Review {
                        Date = DateTime.Now.AddDays(-1),
                        Content = "A must-read for anyone interested in history.",
                        Rate = 5,
                        UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        BookId = books[0].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-2),
                        Content = "The story was engaging, but the ending was predictable.",
                        Rate = 3,
                        UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        BookId = books[0].Id },


                    new Review {
                        Date = DateTime.Now.AddDays(-3),
                        Content = "Excellent writing style and character development.",
                        Rate = 4,
                        UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-4),
                        Content = "A bit too slow for my taste.",
                        Rate = 2, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-5),
                        Content = "A gripping tale from start to finish.",
                        Rate = 5,
                        UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-6),
                        Content = "Informative and well-researched.",
                        Rate = 4,
                        UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-7), Content = "Not as good as I expected.", Rate = 3, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",  BookId = books[1].Id },


                    new Review {    Date = DateTime.Now.AddDays(-8), Content = "An inspiring story of resilience.", Rate = 5, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",  BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-9), Content = "I couldn't put it down!", Rate = 5, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-10), Content = "Too many plot holes for my liking.", Rate = 2, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",  BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-11), Content = "A beautifully written novel.", Rate = 5, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98", BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-12), Content = "The author has a unique voice.", Rate = 4, UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",  BookId = books[2].Id },


                    new Review { Date = DateTime.Now.AddDays(-13), Content = "I found it hard to follow.", Rate = 3, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b", BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-14), Content = "A bit repetitive in some parts.", Rate = 3, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-15), Content = "A heartwarming and touching story.", Rate = 5, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-16), Content = "Could have been shorter.", Rate = 2, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-17), Content = "One of the best books I've read this year.", Rate = 5, UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",  BookId = books[3].Id },


                    new Review { Date = DateTime.Now.AddDays(-18), Content = "An interesting perspective on the subject.", Rate = 4, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",  BookId = books[13].Id },
                    new Review {Date = DateTime.Now.AddDays(-19), Content = "Didn't meet my expectations.", Rate = 3, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad", BookId = books[13].Id },
                    new Review { Date = DateTime.Now.AddDays(-20), Content = "A bit too technical for casual readers.", Rate = 3, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513", BookId = books[13].Id }
                };

                    if (!context.Reviews.Any())
                    {
                        try
                        {
                            await context.Reviews.AddRangeAsync(reviews);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                    }

                    // BookAuthors
                    //var bookAuthorDatas = File.ReadAllText("../BookStore.Datas/DbContexts/BookAuthor.json");
                    //var bookAuthors = JsonSerializer.Deserialize<List<BookAuthor>>(bookAuthorDatas);


                    var bookAuthors = new List<BookAuthor>
                {
                    new BookAuthor
                    {
                        AuthorId =  authors[0].Id,
                        BookId =  books[0].Id
                    },
                  new BookAuthor{
                    AuthorId =  authors[1].Id,
                    BookId =  books[1].Id
                  },
                  new BookAuthor{  AuthorId =  authors[2].Id,  BookId =  books[2].Id },
                  new BookAuthor{ AuthorId =  authors[3].Id, BookId =  books[3].Id

                  },
                  new BookAuthor{ AuthorId =  authors[4].Id, BookId =  books[4].Id
                  },
                  new BookAuthor{
                                AuthorId =  authors[5].Id, BookId =  books[5].Id
                  },
                  new BookAuthor{
                                AuthorId =  authors[6].Id, BookId =  books[6].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id, BookId =  books[7].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[8].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[9].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[0].Id,
                    BookId =  books[10].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[0].Id,
                    BookId =  books[11].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[1].Id,
                    BookId =  books[12].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[2].Id,
                    BookId =  books[13].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[3].Id,
                    BookId =  books[14].Id

                  },new BookAuthor
                  {
                                AuthorId =  authors[4].Id,
                    BookId =  books[15].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[5].Id,
                    BookId =  books[16].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[6].Id,
                    BookId =  books[17].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id,
                    BookId =  books[18].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[19].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[10].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[6].Id,
                    BookId =  books[21].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id,
                    BookId =  books[22].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[23].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[24].Id
                  }
                        };

                    if (!context.BookAuthors.Any())
                    {
                        try
                        {
                            await context.BookAuthors.AddRangeAsync(bookAuthors);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }

                    #endregion

                    #region Dữ liệu Seeding Cart
                    //var cartDatas = File.ReadAllText("../BookStore.Datas/DbContexts/Cart.json");
                    //var carts = JsonSerializer.Deserialize<List<Cart>>(cartDatas);

                    var carts = new List<Cart>
                {
                    new Cart
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[0].Id,
                                Quantity =  13
                            },
                            new CartItem
                            {
                                BookId =  books[1].Id,
                                Quantity =  12
                            },
                            new CartItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  17
                            },
                            new CartItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  17
                            },
                            new CartItem
                            {
                                BookId = books[5].Id,
                                Quantity =  2
                            }
                        }
                      },
                    new Cart
                      {
                        UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[2].Id,
                                Quantity =  4
                            },
                            new CartItem
                            {
                                BookId =  books[8].Id,
                                Quantity =  3
                            },
                            new CartItem
                            {
                                BookId = books[9].Id,
                                Quantity =  6
                            },
                            new CartItem
                            {
                                BookId =  books[10].Id,
                                Quantity =  5
                            }
                        }

                      },
                    new Cart
                      {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                         CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[7].Id,
                                Quantity =  8
                            },
                             new CartItem
                            {
                                BookId =  books[11].Id,
                                Quantity =  1
                            },
                             new CartItem
                            {
                                BookId =  books[12].Id,
                                Quantity =  25
                            },
                             new CartItem
                            {
                                BookId =  books[14].Id,
                                Quantity =  17
                            },new CartItem
                            {
                                BookId =  books[15].Id,
                                Quantity =  20
                            },new CartItem
                            {
                                BookId =  books[16].Id,
                                Quantity =  18
                            }
                        }

                      }
                };

                    if (!context.Carts.Any())
                    {
                        await context.Carts.AddRangeAsync(carts);

                        if (context.ChangeTracker.HasChanges())
                        {
                            await context.SaveChangesAsync();
                        }
                    }
                    #endregion

                    #region Dữ liệu Seeding Order
                    //var orderDatas = File.ReadAllText("../BookStore.Datas/DbContexts/Order.json");
                    //var orders = JsonSerializer.Deserialize<List<Order>>(orderDatas);

                    var orders = new List<Order>
                {
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 06),
                        TotalAmount =  200000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem {
                                BookId =  books[0].Id,
                                Quantity =  13
                            }
                        }
                     },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 02, 06),
                        TotalAmount =  250000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[1].Id,
                                Quantity =  12
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 07, 23),
                        TotalAmount =  300000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[2].Id,
                                Quantity =  5
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2023, 12, 06),
                        TotalAmount =  350000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  8
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 11),
                        TotalAmount =  400000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[4].Id,
                                Quantity =  17
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 08, 06),
                        TotalAmount =  450000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[5].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 06, 06),
                        TotalAmount =  500000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[6].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 06),
                        TotalAmount =  550000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[7].Id,
                                Quantity =  2
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  600000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[8].Id,
                                Quantity =  3
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  650000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[9].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  700000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[10].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  750000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[11].Id,
                                Quantity =  3
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  800000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[12].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  850000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[13].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  900000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[14].Id,
                                Quantity =  3
                            }
                        }
                    }
                };

                    if (!context.Orders.Any())
                    {
                        try
                        {
                            await context.Orders.AddRangeAsync(orders);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            await context.SaveChangesAsync();
                        }
                    }
                    #endregion

                }

                var vouchers = await VoucherDataSeedContributor.VoucherSeederAsync(context, serviceProvider);
                

                if (context.ChangeTracker.HasChanges())
                {
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
