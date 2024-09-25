using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.ViewModel.Auth;
using BookStore.Datas.DbContexts;
using BookStore.Datas.Interfaces;
using BookStore.Models.Models;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookStore.Bussiness.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ICartRepository _cartRepository;
        private readonly IConfiguration _configuration;
        private readonly BookStoreDbContext _dbContext;

        public AuthService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, ICartRepository cartRepository, IConfiguration configuration, BookStoreDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _cartRepository = cartRepository;
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<AuthResultViewModel> Login(LoginViewModel login)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);

            if (!user.EmailConfirmed)
            {
                throw new Exception("Bạn chưa xác nhận email.");
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var token = GenerateJwtToken(user);
                return new AuthResultViewModel
                {
                    // UserInformation = JsonConvert.SerializeObject(user),
                    Token = token.Item1,
                    RefreshToken = token.Item2,
                    ExpiresAt = DateTime.UtcNow.AddDays(1)
                };
            }

            return null;
        }

        public async Task<AuthResultViewModel> RefreshToken(RefreshTokenRequestViewModel request)
        {
            if (request is null)
                return null;

            var principal = GetPrincipalFromExpiredToken(request.Token);
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            var savedRefreshToken = _dbContext.RefreshTokens.FirstOrDefault(x => x.UserId == userId && !x.IsRevoked && x.DateExpire > DateTime.Now);

            if (savedRefreshToken == null || savedRefreshToken.Token != request.RefreshToken)
            {
                throw new UnauthorizedAccessException();
            }

            var user = await _userManager.FindByIdAsync(userId);

            var token = GenerateJwtToken(user);
            return new AuthResultViewModel
            {
                // UserInformation = JsonConvert.SerializeObject(user),
                Token = token.Item1,
                RefreshToken = token.Item2,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }

        public async Task<User> Register(RegisterViewModel register)
        {
            var userExist = await _userManager.FindByEmailAsync(register.Email);

            if (userExist != null) {
                return null;
            }            

            var newUser = new User
            {
                UserName = register.UserName,
                Email = register.Email,
                PhoneNumber = register.PhoneNumber,
                Address = register.Address,
                SecurityStamp = new Guid().ToString()
            };

            var user = await _userManager.CreateAsync(newUser, register.Password);

            if (!user.Succeeded)
            {
                var errors = new ErrorDetails(StatusCodes.Status400BadRequest, user.Errors);
                throw new Exception(errors.ToString());
            }

            var role = await _userManager.AddToRoleAsync(newUser, "User");

            await _cartRepository.CreateAsync(new Cart { UserId = newUser.Id });

            //var token = GenerateJwtToken(newUser);
            //return new AuthResultViewModel
            //{
            //    UserInformation = JsonConvert.SerializeObject(user),
            //    Token = token.Item1,
            //    RefreshToken = token.Item2,
            //    ExpiresAt = DateTime.UtcNow.AddHours(1)
            //};

            return newUser;
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"])),
                ValidateLifetime = false // We don't care about the token's expiration date here
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        private (string, string) GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Add roles to claims
            var userRoles = _userManager.GetRolesAsync(user).Result; // Assuming you're using ASP.NET Core Identity
            claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var oldRefreshTokens = _dbContext.RefreshTokens
                                    .Where(rt => rt.UserId == user.Id && !rt.IsRevoked && rt.DateExpire > DateTime.UtcNow)
                                    .ToList();

            foreach (var oldToken in oldRefreshTokens)
            {
                oldToken.IsRevoked = true;
            }
            _dbContext.RefreshTokens.UpdateRange(oldRefreshTokens);

            var refreshToken = new RefreshToken()
            {
                JwtId = token.Id,
                IsRevoked = false,
                UserId = user.Id,
                DateAdded = DateTime.Now,
                DateExpire = DateTime.Now.AddDays(1),
                Token = Guid.NewGuid().ToString() + "-" + Guid.NewGuid().ToString()
            };

             _dbContext.RefreshTokens.Add(refreshToken);
             _dbContext.SaveChanges();

            return (new JwtSecurityTokenHandler().WriteToken(token), refreshToken.Token);
        }
    }
}
