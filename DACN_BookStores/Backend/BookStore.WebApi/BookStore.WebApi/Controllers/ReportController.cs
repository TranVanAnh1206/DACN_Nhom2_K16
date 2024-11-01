using BookStore.Bussiness.Interfaces;
using BookStore.Datas.DbContexts;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using MailKit.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BookStore.WebApi.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]s")]
    [Authorize(Roles = "Admin")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly UserManager<User> _userManager;
        private readonly BookStoreDbContext _dbContext;
        private readonly ILogger<ReportController> _logger;

        public ReportController(IReportService reportService, UserManager<User> userManager, BookStoreDbContext dbContext, ILogger<ReportController> logger)
        {
            _reportService = reportService;
            _userManager = userManager;
            _dbContext = dbContext;
            _logger = logger;
        }

        /// <summary>
        /// Tạo báo cáo 
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        /// <remarks>
        /// Sample request:
        /// 
        /// GET: /api/v1.0/
        /// </remarks>
        [HttpGet]
        public async Task<IActionResult> GetReport(string? type, string sort_type)
        {
            try
            {
                var userName = _userManager.GetUserName(User);

                if (type == "DAY")
                {
                    //var rep = from o in _dbContext.Orders
                    //          join oi in _dbContext.OrderItems on o.Id equals oi.OrderId
                    //          where o.Status == OrderStatusEnum.DaGiaoHang
                    //          group new { oi, o } by o.Date.Day into g
                    //          select new
                    //          {
                    //              Key = g.Key,
                    //              NumberOfBookSold = g.Sum(x => x.oi.Quantity),
                    //              Revenue = g.Sum(x => x.o.TotalAmount) // assuming UnitPrice is in OrderItems
                    //          };

                    var query = from o in _dbContext.Orders
                                 join oi in _dbContext.OrderItems on o.Id equals oi.OrderId into orderGroup
                                 from subOrder in orderGroup.DefaultIfEmpty()
                                 group subOrder by o.Date into g
                                 select new
                                 {
                                     Key = g.Key,
                                     DateTime = g.Key,
                                     Revenue = g.Sum(x => x.Order.TotalAmount),
                                     NumberOfBookSold = g.Sum(x => x.Quantity)
                                 };
                   var result = sort_type switch 
                    {
                        "ASC" => query.OrderBy(x => x.Key),
                        "DESC" => query.OrderByDescending(x => x.Key),
                        _ => query.OrderByDescending(x => x.Key)
                    };

                    return Ok(result.ToList());
                }

                if (type == "MONTH")
                {
                    var query = from o in _dbContext.Orders
                                 join oi in _dbContext.OrderItems on o.Id equals oi.OrderId into orderGroup
                                 from subOrder in orderGroup.DefaultIfEmpty()
                                 group subOrder by new { Year = o.Date.Year, Month = o.Date.Month } into g
                                 select new
                                 {
                                     Key = g.Key.Month,
                                     DateTime = g.Key.Year + "-" + g.Key.Month,
                                     Revenue = g.Sum(x => x.Order.TotalAmount),
                                     NumberOfBookSold = g.Sum(x => x.Quantity)
                                 };

                    var result = sort_type switch
                    {
                        "ASC" => query.OrderBy(x => x.Key),
                        "DESC" => query.OrderByDescending(x => x.Key),
                        _ => query.OrderByDescending(x => x.Key)
                    };

                    return Ok(result.ToList());
                }

                if (type == "YEAR")
                {
                    var query = from o in _dbContext.Orders
                                 join oi in _dbContext.OrderItems on o.Id equals oi.OrderId into orderGroup
                                 from subOrder in orderGroup.DefaultIfEmpty()
                                 group subOrder by o.Date.Year into g
                                 select new
                                 {
                                     Key = g.Key,
                                     DateTime = g.Key,
                                     Revenue = g.Sum(x => x.Order.TotalAmount),
                                     NumberOfBookSold = g.Sum(x => x.Quantity)
                                 };

                    var result = sort_type switch
                    {
                        "ASC" => query.OrderBy(x => x.Key),
                        "DESC" => query.OrderByDescending(x => x.Key),
                        _ => query.OrderByDescending(x => x.Key)
                    };

                    return Ok(result.ToList());
                }

                // Nếu không thuộc các trường hợp trên thì sắp xếp theo ngày
                var queryDefault = from o in _dbContext.Orders
                             join oi in _dbContext.OrderItems on o.Id equals oi.OrderId into orderGroup
                             from subOrder in orderGroup.DefaultIfEmpty()
                             group subOrder by o.Date into g
                             select new
                             {
                                 Key = g.Key,
                                 DateTime = g.Key,
                                 Revenue = g.Sum(x => x.Order.TotalAmount),
                                 NumberOfBookSold = g.Sum(x => x.Quantity)
                             };

                var resultDefault = sort_type switch
                {
                    "ASC" => queryDefault.OrderBy(x => x.Key),
                    "DESC" => queryDefault.OrderByDescending(x => x.Key),
                    _ => queryDefault.OrderByDescending(x => x.Key)
                };

                return Ok(resultDefault.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
