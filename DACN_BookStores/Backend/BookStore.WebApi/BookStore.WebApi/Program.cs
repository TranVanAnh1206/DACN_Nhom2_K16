
using BookStore.Datas.DbContexts;
using BookStore.WebApi.Middlewares;
using Microsoft.EntityFrameworkCore;
using Serilog.Events;
using Serilog;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.Mvc;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BookStore.Bussiness.ObjectMapping;
using BookStore.Bussiness.Interfaces;
using BookStore.Bussiness.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using BookStore.Datas.Interfaces;
using BookStore.Datas.Repositories;
using AutoMapper;
using System.Reflection;
using CloudinaryDotNet;
using static Org.BouncyCastle.Math.EC.ECCurve;
using BookStore.WebApi.Models;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using BookStore.Bussiness.ViewModel.Payment.Momo;

namespace BookStore.WebApi
{
    public class Program
    {
        public async static Task Main(string[] args)
        {
            var loggerConfiguration = new LoggerConfiguration()
#if DEBUG
                .MinimumLevel.Debug()
#else
                .MinimumLevel.Information()
#endif
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
                .Enrich.FromLogContext()
                .WriteTo.Async(c => c.File("Logs/log_errors.txt", restrictedToMinimumLevel: LogEventLevel.Error))
                .WriteTo.Async(c => c.File("Logs/logs_infos.txt", restrictedToMinimumLevel: LogEventLevel.Information))
                .WriteTo.Async(c => c.Console());
            //.WriteTo.MSSqlServer(
            //    connectionString: "Server=localhost,1433;Database=QuizApp;Trusted_Connection=True;MultipleActiveResultSets=true;",
            //    sinkOptions: new MSSqlServerSinkOptions { TableName = "Logs", AutoCreateSqlTable = true });

            Log.Logger = loggerConfiguration.CreateLogger();

            try
            {
                var builder = WebApplication.CreateBuilder(args);

                builder.Services.AddSerilog();
                builder.Services.AddLogging();

                builder.Services.AddControllers().AddNewtonsoftJson();
                builder.Services.AddEndpointsApiExplorer();

                #region Swagger
                builder.Services.AddApiVersioning(options =>
                {
                    options.DefaultApiVersion = new ApiVersion(1, 0);
                    options.AssumeDefaultVersionWhenUnspecified = true;
                    options.ReportApiVersions = true;
                    options.ApiVersionReader = new UrlSegmentApiVersionReader();
                    //options.ApiVersionReader = new HeaderApiVersionReader("x-api-version");
                });

                builder.Services.AddVersionedApiExplorer(setup =>
                {
                    setup.GroupNameFormat = "'v'VVV";
                    setup.SubstituteApiVersionInUrl = true;
                });

                builder.Services.AddSwaggerGen(options =>
                {
                    options.EnableAnnotations();

                    options.SwaggerDoc("v1.0", new OpenApiInfo
                    {
                        Version = "v1.0",
                        Title = "BookStore API",
                        Description = "An ASP.NET Core Web API for managing books items",
                        TermsOfService = new Uri("https://example.com/terms"),
                        Contact = new OpenApiContact
                        {
                            Name = "Contact",
                            Email = "anh038953@gmail.com",
                            //Url = new Uri("https://example.com/contact")
                        },
                        License = new OpenApiLicense
                        {
                            Name = "License",
                            Url = new Uri("https://example.com/license")
                        }
                    });

                    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

                    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                                    Enter 'Bearer' [space] and then your token in the text input below.
                                    \r\n\r\nExample: 'Bearer 12345abcdef'",
                        Name = "Authorization",
                        BearerFormat = "JWT",
                        In = ParameterLocation.Header,
                        Type = SecuritySchemeType.ApiKey,
                        Scheme = "Bearer"
                    });

                    options.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }

                            },
                            new string[]{}
                        }
                    });
                });

                builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();


                #endregion

                #region AWS
                builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
                #endregion

                #region CORS
                builder.Services.AddCors(p => p.AddPolicy("BookStoreAPIPolicy",
                build =>
                {
                    build.WithOrigins("http://localhost:3000")
                             .AllowAnyMethod()
                             .AllowAnyHeader()
                             .AllowCredentials();
                }));
                #endregion

                var connectionString = builder.Configuration.GetConnectionString("DefaultCOnnection");
                builder.Services.AddDbContext<BookStoreDbContext>(options =>
                {
                    // Server=database-1.ct84kk2asl0t.us-east-1.rds.amazonaws.com,1433;Database=BookStore_Group2;User ID=admin;Password=Anh12062003;MultipleActiveResultSets=true;Encrypt=False
                    //Server=localhost,1433;Database=BookStore_Group2;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False
                    options.UseSqlServer(connectionString).EnableSensitiveDataLogging();
                });

                builder.Services.AddHttpClient<Bussiness.Services.PaymentRequestService>();

                #region Config identity
                builder.Services.AddIdentity<User, IdentityRole>(options =>
                {
                    options.Stores.MaxLengthForKeys = 128;
                    options.SignIn.RequireConfirmedAccount = false;
                }).AddEntityFrameworkStores<BookStoreDbContext>()
                    .AddDefaultTokenProviders();

                var key = Encoding.ASCII.GetBytes(builder.Configuration["JWT:Secret"]);
                builder.Services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["JWT:Issuer"],
                        ValidAudience = builder.Configuration["JWT:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

                builder.Services.Configure<IdentityOptions>(options =>
                {
                    // Thiết lập về Password
                    options.Password.RequireDigit = true; // bắt phải có số
                    options.Password.RequireLowercase = true; // bắt phải có chữ thường
                    options.Password.RequireNonAlphanumeric = true; // bắt ký tự đặc biệt
                    options.Password.RequireUppercase = true; // bắt buộc chữ in
                    options.Password.RequiredLength = 6; // Số ký tự tối thiểu của password
                    options.Password.RequiredUniqueChars = 1; // Số ký tự riêng biệt

                    // Cấu hình Lockout - khóa user
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10); // Khóa 5 phút
                    options.Lockout.MaxFailedAccessAttempts = 5; // Thất bại 5 lầ thì khóa
                    options.Lockout.AllowedForNewUsers = true;

                    // Cấu hình về User.
                    options.User.AllowedUserNameCharacters = // các ký tự đặt tên user
                        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                    options.User.RequireUniqueEmail = true; // Email là duy nhất

                    // Cấu hình đăng nhập.
                    options.SignIn.RequireConfirmedEmail = true; // Cấu hình xác thực địa chỉ email (email phải tồn tại)
                    options.SignIn.RequireConfirmedPhoneNumber = false; // Xác thực số điện thoại
                });

                builder.Services.Configure<SecurityStampValidatorOptions>(options =>
                {
                    // Trên 5 giây truy cập lại sẽ nạp lại thông tin User (Role)
                    // SecurityStamp trong bảng User đổi -> nạp lại thông tinn Security
                    options.ValidationInterval = TimeSpan.FromSeconds(5);
                });
#endregion

                #region AutoMapper configuration
                var mapperConfig = new MapperConfiguration(mc =>
                {
                    mc.AddProfile(new AutoMapperProfile());
                });
                IMapper mapper = mapperConfig.CreateMapper();
                builder.Services.AddSingleton(mapper);
                #endregion

                #region Đăng ký Momoconfig
                builder.Services.Configure<MomoConfig>(builder.Configuration.GetSection(MomoConfig.ConfigName));
                #endregion
                
                #region Đăng ký dịch vụ email
                builder.Services.AddOptions(); // Kích hoạt Options
                builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
                builder.Services.AddTransient<IEmailSender, SendMailService>(); // Đăng ký dịch vụ Mail
                #endregion

                #region Đăng ký các dịch vụ hệ thống
                builder.Services.AddScoped<IAuthService, AuthService>();
                builder.Services.AddScoped<IPublisherRepository, PublisherRepository>();
                builder.Services.AddScoped<IPublisherService, PublisherService>();
                builder.Services.AddScoped<IAuthorRepository, AuthorRepository>();
                builder.Services.AddScoped<IAuthorService, AuthorService>();
                builder.Services.AddScoped<IBookRepository, BookRepository>();
                builder.Services.AddScoped<IBookService, BookService>();
                builder.Services.AddScoped<IBookAuthorRepository, BookAuthorRepository>();
                builder.Services.AddScoped<IBookAuthorService, BookAuthorService>();
                builder.Services.AddScoped<IBookGroupRepository, BookGroupRepository>();
                builder.Services.AddScoped<IBookGroupService, BookGroupService>();
                builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
                builder.Services.AddScoped<ICartItemService, CartItemService>();
                builder.Services.AddScoped<ICartRepository, CartRepository>();
                builder.Services.AddScoped<ICartService, CartService>();
                builder.Services.AddScoped<IOrderRepository, OrderRepository>();
                builder.Services.AddScoped<IOrderService, OrderService>();
                builder.Services.AddScoped<IOrderItemRepository, OrderItemRepository>();
                builder.Services.AddScoped<IOrserItemService, OrderItemService>();
                builder.Services.AddScoped<IReviewService, ReviewService>();
                builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
                builder.Services.AddScoped<IUserRepository, UserRepository>();
                builder.Services.AddScoped<IReportRepository, ReportRepository>();
                builder.Services.AddScoped<IReportService, ReportService>();
                builder.Services.AddScoped<IVoucherRepository, VoucherRepository>();
                builder.Services.AddScoped<IVoucherService, VoucherService>();
                #endregion

                var app = builder.Build();

                Log.Information("Start app!");

                #region Swagger
                IServiceProvider servicesSW = app.Services;
                var provider = servicesSW.GetRequiredService<IApiVersionDescriptionProvider>();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    foreach (var description in provider.ApiVersionDescriptions)
                    {
                        c.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                    }

                    // c.SwaggerEndpoint("/swagger/v1.0/swagger.json", "v1");
                });
                #endregion

                app.UseSerilogRequestLogging();

                app.UseHttpsRedirection();

                app.UseCors("BookStoreAPIPolicy");

                app.UseAuthentication();
                app.UseAuthorization();

                app.MapControllers();

                app.UseMiddleware<ErrorHandlingMiddleware>();

                #region Chạy Seeding data
                using var scope = app.Services.CreateScope();
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    await BookStoreSeedData.Initalize(services);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"An error occured during migration: {ex.Message}");
                }
                #endregion

                app.Run();
            }
            catch (Exception ex)
            {
                if (ex is HostAbortedException)
                {
                    Log.Information(ex.ToString());
                }

                Log.Information(ex.ToString());
            }
            finally
            {
                Log.Information("Closing app.");
                Log.Information("Closed app.");
                Log.CloseAndFlush();
            }
        }
    }
}
