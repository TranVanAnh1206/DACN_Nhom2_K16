using Microsoft.AspNetCore.Http;

namespace BookStore.Bussiness.Interfaces
{
    public interface IImageService
    {
        Task<(string url, string publicUrl)> UpdaloadImage(IFormFile img, string rootFolderName, string folderName);
    }
}
