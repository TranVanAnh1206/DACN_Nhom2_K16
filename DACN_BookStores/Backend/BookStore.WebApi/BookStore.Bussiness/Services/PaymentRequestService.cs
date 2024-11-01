using System.Text;

namespace BookStore.Bussiness.Services
{
    public class PaymentRequestService
    {
        private readonly HttpClient _httpClient;

        public PaymentRequestService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> SendPaymentRequestAsync(string endpoint, string postJsonString)
        {
            try
            {
                var content = new StringContent(postJsonString, Encoding.UTF8, "application/json");
                var response = await _httpClient.PostAsync(endpoint, content);

                response.EnsureSuccessStatusCode();

                var test = await response.Content.ReadAsStringAsync();
                return await response.Content.ReadAsStringAsync();
            }
            catch (HttpRequestException e)
            {
                throw new Exception($"Request failed: {e.Message}");
            }
        }
    }
}
