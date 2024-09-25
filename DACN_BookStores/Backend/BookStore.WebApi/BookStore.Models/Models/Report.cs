using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Models.Models
{
    public class Report
    {
        public DateTime ReportDate { get; set; }

        public int NumberOfBookSold { get; set; }

        public decimal Revenue { get; set; }

        public string ReportName { get; set; }

        public string ReportAuthor { get; set; }
    }
}
