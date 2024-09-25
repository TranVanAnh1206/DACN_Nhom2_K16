using Newtonsoft.Json;

namespace BookStore.WebApi.Models
{
    public class ErrorDetails
    {
        public ErrorDetails()
        {
        }

        public ErrorDetails(int statusCode, object message)
        {
            StatusCode = statusCode;
            Message = message;
        }

        public int StatusCode { get; set; }
        public object Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
