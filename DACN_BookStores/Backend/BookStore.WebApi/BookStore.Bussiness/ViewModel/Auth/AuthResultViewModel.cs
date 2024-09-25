namespace BookStore.Bussiness.ViewModel.Auth
{
    public class AuthResultViewModel
    {
        // public string UserInformation { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
