using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Bussiness.ViewModel.Auth
{
    public class RefreshTokenRequestViewModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
