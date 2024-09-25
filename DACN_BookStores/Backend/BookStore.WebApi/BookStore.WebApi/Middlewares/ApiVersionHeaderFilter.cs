using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BookStore.WebApi.Middlewares
{
    public class ApiVersionHeaderFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context) { }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.HttpContext.Response.Headers.ContainsKey("api-supported-versions")) return;

            var apiVersion = context.HttpContext.GetRequestedApiVersion();
            if (apiVersion != null)
            {
                context.HttpContext.Response.Headers.Add("api-version", apiVersion.ToString());
            }
        }
    }
}
