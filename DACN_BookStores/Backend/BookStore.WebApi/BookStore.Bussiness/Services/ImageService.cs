using BookStore.Bussiness.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace BookStore.Bussiness.Services
{
    public class ImageService : IImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public async Task<(string url, string publicUrl)> UpdaloadImage(IFormFile img, string rootFolderName, string folderName)
        {
            if (img != null)
            {
                var uploadResult = new ImageUploadResult();
                var file = img;

                if (file.Length > 0)
                {
                    using (var stream = file.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(file.FileName, stream),
                            Folder = $"BookStores/{rootFolderName}/{folderName}"
                        };
                        uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    }
                }

                return (uploadResult.Url.ToString(), uploadResult.PublicId);
            }

            return (string.Empty, string.Empty);
        }
    }
}
