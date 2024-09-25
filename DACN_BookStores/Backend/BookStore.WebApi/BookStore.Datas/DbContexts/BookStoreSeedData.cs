using BookStore.Datas.SeedingDatas;
using BookStore.Models.Enums;
using BookStore.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using System.Text.Json;

namespace BookStore.Datas.DbContexts
{
    public static class BookStoreSeedData
    {
        public static async Task Initalize(IServiceProvider serviceProvider)
        {
            using (var context = new BookStoreDbContext(serviceProvider.GetRequiredService<DbContextOptions<BookStoreDbContext>>()))
            {
                await UserDataSeedContributor.UserDataSeeder(context, serviceProvider);
                var authors = await AuthorDataSeedContributor.AuthorSeeder(context, serviceProvider);
                var publishers = await PublisherDataSeedContributor.PublishersSeeder(context, serviceProvider);
                var genges = await BookGroupDataSeedContributor.BookGroupSeeder(context, serviceProvider);

                #region Dữ liệu Seeding Books
                
                    List<Book> books = new List<Book>
                {
                    new Book
                    {
                        Description = "Ngày nọ, Nobita và Doraemon tình cờ tìm thấy và giải cứu 2 người cư dân của hành tinh Koyakoya là Roppuru và Chamy đang bị nạn thông qua cửa không gian dưới nền nhà căn phòng của Nobita do thời-không gian bị bóp méo. Do sân bóng của nhóm bạn Nobita bị các anh lớp lớn tranh mất nên cậu đã nảy ra ý tưởng rủ các bạn đi qua cánh cửa không gian đến hành tinh Koyakoya để thỏa thích chơi đùa.",
                        Price = 31500,
                        Remaining = 80,
                        BookGroupId = genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/d/o/doraemon-movie-story-mau_tan-nobita-v_-lich-su-khai-pha-vu-tru_bia.jpg",
                        Rate = 4.0,
                        Title = "Doraemon Movie Story Màu - Tân Nobita và lịch sử khai phá vũ trụ",
                        TotalPageNumber = 144,
                        PublisherId = publishers[0].Id,
                        PublishedAt = DateTime.Parse("2024-05-10")
                    },
                    new Book
                    {
                        Description = "Inuzuka Romio và Juliet Persia đang hẹn hò, song vì xuất thân từ hai đất nước đối địch nên họ không thể công khai mối quan hệ dù học chung một trường. Nhưng tình hình đã có sự thay đổi nhờ Hasuki - người bạn thơ ấu đem lòng thương Inuzuka!",
                        Price = 32500,
                        Remaining = 60,
                        BookGroupId =  genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/n/a/nang-juliet-o-truong-noi-tru_bia_tap-2.jpg",
                        PublisherId = publishers[1].Id,
                        PublishedAt = DateTime.Parse("2024-02-11"),
                        Rate = 3.4,
                        Title = "Nàng Juliet ở trường nội trú - Tập 2",
                        TotalPageNumber = 192
                    },
                    new Book
                    {
                        Description = "Người xuất hiện cùng với Sirnight trong lúc hội Koruni - những người bị đuổi khỏi tháp chuyên gia - đang vật lộn với băng Ánh Lửa là ai...!!? Trong khi đó, X và nhóm bạn đã đến thành phố Shoyo để tìm mẹ của Y. Trên đường đi, một trận chiến trên bầu trời chưa từng có đã đột ngột nổ ra!!! Đặt từng tâm tư lên đôi cánh và bay lên nào Y! Bay thật cao, cao hơn cả bầu trời nhé…!!!",
                        Price = 22500,
                        Remaining = 40,
                        BookGroupId =  genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/p/o/pokemon-dac-biet_bia_tap-58.jpgf",
                        PublisherId = publishers[2].Id,
                        PublishedAt = DateTime.Parse("2024-01-12"),
                        Rate = 4.2,
                        Title = "Pokémon đặc biệt - Tập 58",
                        TotalPageNumber = 220
                    },
                    new Book
                    {
                        Description = "Đã lâu không gặp! Nè nè, đoán xem bây giờ ai đang ở trong phòng bác Soubee? Một bộ xương cao 1 mét 71 mặc y phục Ninja trông rất oách, tên là “Tenchimaru”. Hồi còn đi học bác rất mê mô hình xương người cho nên đã đặt mua 1 bộ về bày trong nhà.",
                        Price = 33500,
                        Remaining = 50,
                        BookGroupId =  genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/n/i/ninja-rantaro_bia_tap-34.jpg",
                        PublisherId = publishers[3].Id,
                        PublishedAt = DateTime.Parse("2023-05-13"),
                        Rate = 4.3,
                        Title = "Ninja Rantaro - Tập 34",
                        TotalPageNumber = 150
                    },
                    new Book
                    {
                        Description = "THỢ SĂN HẠNG E SUNG JIN WOO đã tiêu diệt được trùm và bước ra từ Cổng Đỏ. Với vật phẩm là chiếc chìa khóa trong tay, cậu tiếp tục mở ra tòa thành do bọn quỷ tà ác thống trị.",
                        Price = 50000,
                        Remaining = 30,
                        BookGroupId =  genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/s/o/solo-leveling_bia_tap-8.jpg",
                        PublisherId = publishers[4].Id,
                        PublishedAt = DateTime.Parse("2024-01-14"),
                        Rate = 4,
                        Title = "Solo Leveling - Tôi thăng cấp một mình - Tập 8",
                        TotalPageNumber = 200
                    },
                    new Book
                    {
                        Description = "SUNG JIN WOO, THỢ SĂN HẠNG E YẾU ỚT BẬC NHẤT nghèo khổ, tài năng không có mà cũng chẳng được ai chống lưng. Trong một chuyến công phá để kiếm kế sinh nhai, cậu tình cờ tìm thấy HẦM NGỤC KÉP. Trên chiến trường tàn khốc, cậu đã lựa chọn con đường cô độc nhất…",
                        Price = 79200,
                        Remaining = 20,
                        BookGroupId =  genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/s/o/solo_leveling_bia_tap_1_3.jpg",
                        PublisherId = publishers[0].Id,
                        PublishedAt = DateTime.Parse("2024-05-04"),
                        Rate = 4.5,
                        Title = "Solo Leveling - Tôi thăng cấp một mình - Tập 1",
                        TotalPageNumber = 168
                    },
                    new Book
                    {
                        Description = "Uông Diểu, vị giáo sư về vật liệu nano ngày nào cũng đăng nhập vào “Tam Thể”. Tại trò chơi online đó, anh đắm chìm trong một thế giới khác, nơi một nền văn minh có thể chỉ kéo dài vài ngày, bầu trời có thể xuất hiện ba mặt trời cùng lúc và con người còn phải biến thành xác khô để sinh tồn.",
                        Price = 127500,
                        Remaining = 14,
                        BookGroupId =  genges[1].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/i/m/image_233636.jpg",
                        PublisherId = publishers[1].Id,
                        PublishedAt = DateTime.Parse("2023-05-16"),
                        Rate = 3.6,
                        Title = "TAM THỂ",
                        TotalPageNumber = 365
                    },
                    new Book
                    {
                        Description = "Đối diện với sự truy đuổi của Dorian và âm mưu tàn độc của Ares, họ đã bất chấp hiểm nguy để chạy đua với thời gian, băng qua đống đổ nát của con tàu Atlantis còn sót lại trên Trái đất và các trạm khoa học Atlantis trên khắp thiên hà, cuối cùng đi vào quá khứ của một nền văn hóa bí ẩn: Thế giới Atlantis.Ai sẽ thắng trong cuộc đua khốc liệt để vén màn những bí mật có thể cứu rỗi nhân loại trong giờ phút đen tối nhất?",
                        Price = 170000,
                        Remaining = 60,
                        BookGroupId =  genges[1].Id,
                        Image = "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/z48398975736586899037cbeab4b8e.jpg?v=1705552513867",
                        PublisherId = publishers[2].Id,
                        PublishedAt = DateTime.Parse("2023-07-17"),
                        Rate = 4.7,
                        Title = "THẾ GIỚI ATLANTIS",
                        TotalPageNumber = 270
                    },
                    new Book
                    {
                        Description = "Hàn Quốc năm 2063, con người đã sở hữu những công nghệ tân tiến ngoài sức tưởng tượng và thậm chí còn có thể du hành thời gian trở về quá khứ, tất nhiên với một cái giá không nhỏ: phải đánh cược mạng sống của mình.Lee Woo Hwan là phụ bếp một quán canh thịt bò hầm ở Busan đã hai mươi năm, sống cuộc đời tầm thường, không nơi nương tựa không người bấu víu, không quá khứ đẹp đẽ để hồi tưởng cũng không cả tương lai để trông mong. Nhận lời đề nghị của chủ quán, Woo Hwan lên tàu trở về quá khứ hòng tìm lại hương vị nguyên bản của món canh bò. Nhưng mục đích đơn thuần ban đầu dần nhường chỗ cho một khao khát ngày càng cháy bỏng trong anh. Khao khát một tương lai được sống bình thường và hạnh phúc như bao người, Woo Hwan liều lĩnh tìm cách biến quá khứ trở thành hiện tại, cam tâm đánh đổi không chỉ một mạng người…",
                        Price = 320000,
                        Remaining = 70,
                        PublisherId = publishers[3].Id,
                        BookGroupId =  genges[1].Id,
                        Image = "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/quancanhbohamcuakecapquakhuout.jpg?v=1710306261860",
                        PublishedAt = DateTime.Parse("2023-02-18"),
                        Rate = 4.8,
                        Title = "QUÁN CANH BÒ HẦM CỦA KẺ CẮP QUÁ KHỨ",
                        TotalPageNumber = 572
                    },
                    new Book
                    {
                        Description = "Charlie Gordon sắp bắt đầu một hành trình chưa từng có tiền lệ. Sinh ra với chỉ số IQ thấp bất thường, anh bị coi là một kẻ ngốc trong mắt mọi người, kể cả mẹ mình. Nhưng Charlie có một niềm khát khao cháy bỏng, đó là trở nên thông minh. Và rồi anh được lựa chọn để trở thành người đầu tiên tham gia một cuộc thử nghiệm y khoa chưa từng có, nhằm gia tăng trí thông minh. Cuộc thử nghiệm này đã thành công trên Algernon - chú chuột thí nghiệm giờ đây đã có khả năng giải mê cung nhanh gấp 3 lần bình thường. Tuy nhiên, mầm mống của sự sụp đổ đang len lỏi vào cuộc thí nghiệm...",
                        Price = 175000,
                        Remaining = 20,
                        PublisherId = publishers[4].Id,
                        BookGroupId =  genges[1].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235234291.jpg",
                        PublishedAt = DateTime.Parse("2022-05-19"),
                        Rate = 4.1,
                        Title = "Hoa trên mộ ALGERNON",
                        TotalPageNumber = 439
                    },
                    new Book
                    {
                        Description = "Khi hành tinh quê nhà nổ tung, người phụ nữ ta yêu bỗng bốc hơi vì một hiểu nhầm tai hại về không-thời gian, còn tàu vũ trụ của ta lao xuống tan xác trên một hành tinh hẻo lánh… thì chán đời cũng là dễ hiểu thôi phải không? Chán nản đến cùng cực, Arthur chỉ biết tìm quên trong những chuyến quá giang bất tận. Oái oăm thay, ngay khi anh bắt đầu nhen nhóm niềm vui sống và tưởng như bi kịch đã vĩnh viễn buông tha mình, thì bi kịch, chực chờ đúng lúc ấy, lại sổ ra.",
                        Price = 200000,
                        Remaining = 10,
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[1].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235237537.jpg",
                        PublishedAt = DateTime.Parse("2023-04-20"),
                        Rate = 4.0,
                        Title = "HẦU NHƯ VÔ HẠI",
                        TotalPageNumber = 300
                    },
                    new Book
                    {
                        Description =  "Trong cơn phiền não vì phải viết đánh giá cho một cuốn tiểu thuyết mới ra mắt, một nhà phê bình đã được giới thiệu cho chiếc máy kỳ lạ mang tên “SoHox”. Với khả năng tạo ra những bài bình luận về bất kỳ tác phẩm nào chỉ trong tích tắc, chiếc máy này có thể sẽ làm nên một cuộc cách mạng đảo lộn hoàn toàn giới tiểu thuyết trinh thám…",
                        Price =  210000,
                        PublishedAt = DateTime.Parse("2024-02-21"),
                        Remaining =  29,
                        PublisherId = publishers[1].Id,
                        BookGroupId =  genges[2].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235241268.jpg",
                        Rate =  4.1,
                        Title =  "SIÊU ÁN MẠNG: NỖI ƯU PHIỀN CỦA CÁC NHÀ VĂN TRINH THÁM",
                        TotalPageNumber =  268
                    },
                    new Book
                    {
                        Description =  "Chiếc đèn hình thỏ mang sức mạnh nguyền rủa, cái đầu nhớp nhúa trồi lên từ bồn cầu, vụ tai nạn xe hơi ly kỳ giữa đầm lầy, con cáo chảy máu vàng ròng, những kẻ sống và người chết bị trói buộc trong dòng chảy thời gian...Con thỏ nguyền rủa là tập truyện ngắn đầy ám ảnh, hài hước, gớm ghiếc và ghê rợn về những cơn ác mộng của cuộc sống hiện đại, trong một thế giới \"nhìn chung là khốc liệt và xa lạ, đôi khi cũng đẹp và mê hoặc, nhưng ngay cả trong những giây phút đó, về cơ bản nó vẫn là một chốn man rợ.\"",
                        PublishedAt = DateTime.Parse("2024-05-22"),
                        Price =  117000,
                        Remaining =  38,
                        PublisherId = publishers[2].Id,
                        BookGroupId =  genges[2].Id,
                        Image =  "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/conthonguyenrua011e17173832478.jpg?v=1717383645417",
                        Rate =  4.2,
                        Title =  "CON THỎ NGUYỀN RỦA",
                        TotalPageNumber =  316
                    },
                    new Book
                    {
                        Description =  "Có lẽ, Umberto Eco muốn trao cho độc giả một cuốn sách để họ có thể thốt lên sau khi đọc xong: “Tôi đã đi cùng khắp, kiếm sự an bình, rốt cuộc chỉ tìm thấy nó khi ngồi ở một góc phòng với một quyển sách mà thôi.”Và Tên Của Đóa Hồng xứng đáng là một món quà như thế. Cuốn sách là một ký ức lớn, đưa thời không lùi về khoảnh khắc mà lịch sử ngàn năm của thời Trung Cổ cô đọng lại chỉ còn 7 ngày, chân thực và huyền ảo, trong một tu viện dòng Benedict cổ xưa trên triền dãy Apennin nước Ý.",
                        Price =  250000,
                        Remaining =  7,
                        PublisherId = publishers[3].Id,
                        BookGroupId =  genges[2].Id,
                        Image =  "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/ten-cua-doa-hong-560px-1.jpg?v=1712637799820",
                            Rate =  4.3,
                        PublishedAt = DateTime.Parse("2024-05-23"),
                        Title =  "TÊN CỦA ĐÓA HỒNG",
                        TotalPageNumber =  332
                    },
                    new Book
                    {
                        Description =  "Mỗi ngôi nhà đều có bí mật riêng, và ngôi nhà mà Maggie và Nina Simmonds đã ở cùng nhau bấy lâu nay cũng không phải là ngoại lệ.    Cứ cách ngày, Maggie và Nina lại ăn tối cùng nhau. Sau đó, Nina sẽ đưa Maggie trở lại căn phòng trên gác mái, về với sợi dây xích đã trói buộc bà suốt h ai năm qua. Trong đời mình, Maggie đã làm rất nhiều điều mà bà thấy hổ thẹn, còn con gái bà là Nina vì thế sẽ không bao giờ tha thứ cho mẹ mình. Cô thề sẽ bắt bà phải trả lại những gì bà nợ cô. Từng ngày một.",
                        Price =  177000,
                        Remaining =  6,
                        PublisherId = publishers[4].Id,
                        BookGroupId =  genges[2].Id,
                        Image =  "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/bongtoigiuachungta01e171349685.jpg?v=1713497758383",
                        Rate =  4.4,
                        PublishedAt = DateTime.Parse("2024-05-24"),
                        Title =  "BÓNG TỐI GIỮA CHÚNG TA",
                        TotalPageNumber =  376
                    },
                    new Book
                    {
                        Description =  "Cuốn sách này của Dale Carnegie là một trong những cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và ứng xử. Đắc Nhân Tâm hướng dẫn cách làm cho mọi người yêu mến bạn, cách thuyết phục người khác theo cách của bạn và cách dẫn dắt người khác mà không tạo ra sự phản đối.",
                        Price =  125000,
                        Remaining =  18,
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[3].Id,
                        Image =  "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/dacnhantam03.jpg?v=1705552096050",
                        Rate =  4.8,
                        PublishedAt = DateTime.Parse("2011-05-24"),
                        Title =  "Đắc Nhân Tâm",
                        TotalPageNumber =  320
                    },
                    new Book
                    {
                        Description =  "Tác phẩm của Daniel Kahneman, nhà tâm lý học đoạt giải Nobel Kinh tế, giúp độc giả hiểu rõ hơn về hai hệ thống tư duy của con người: hệ thống nhanh (bản năng) và hệ thống chậm (lý trí). Cuốn sách cung cấp nhiều góc nhìn sâu sắc về cách chúng ta ra quyết định hàng ngày.",

                        Price =  220000,
                        Remaining =  15,
                        PublisherId = publishers[1].Id,
                        BookGroupId =  genges[3].Id,
                        Image =  "https://www.ozsach.com/728-large_default/tu-duy-nhanh-va-cham.jpg",
                        PublishedAt = DateTime.Parse("2012-05-24"),
                        Rate =  4.7,
                        Title =  "Tư Duy Nhanh và Chậm",
                        TotalPageNumber =  499
                    },
                    new Book
                    {
                        Description =  "Charles Duhigg, nhà báo đoạt giải Pulitzer, trình bày những nghiên cứu về cách mà thói quen hình thành trong cuộc sống con người. Cuốn sách này giải thích tại sao thói quen lại có ảnh hưởng mạnh mẽ đến hành vi và cách thức để thay đổi thói quen.",

                        Price =  160000,
                        Remaining =  12,
                        BookGroupId =  genges[3].Id,
                        Image =  "https://bizweb.dktcdn.net/thumb/1024x1024/100/197/269/products/z4105964911654-5e5a35259898ca70607286170319aa65.jpg?v=1676275362800",
                        PublisherId = publishers[2].Id,
                        PublishedAt = DateTime.Parse("2005-05-24"),
                        Rate =  4.6,
                        Title =  "Sức Mạnh Của Thói Quen",
                        TotalPageNumber =  408
                    },
                    new Book
                    {
                        Description =  "Cuốn sách của Hiromi Shinya, một bác sĩ nổi tiếng tại Nhật Bản, không chỉ là sách về sức khỏe mà còn là một nghiên cứu sâu sắc về mối liên hệ giữa tâm lý và thể chất. Sách giải thích cách các enzyme trong cơ thể giúp duy trì sức khỏe và sự sống.",
                        Price =  140000,
                        Remaining =  8,
                        BookGroupId =  genges[3].Id,
                        Image =  "https://nhasachbaoanh.com/wp-content/uploads/2022/08/nhan-to-enzyme-tron-bo-4-cuon.jpg",
                        PublishedAt = DateTime.Parse("2011-05-24"),
                        PublisherId = publishers[3].Id,
                        Rate =  4.5,
                        Title =  "Nhân Tố Enzyme",
                        TotalPageNumber =  256
                    },
                    new Book
                    {
                        Description =  "Cuốn sách này của Martin Seligman, nhà tâm lý học nổi tiếng, giới thiệu về một lĩnh vực mới trong tâm lý học: tâm lý học tích cực. Sách cung cấp các nghiên cứu và kỹ thuật giúp tăng cường hạnh phúc và thành công trong cuộc sống.",
                        PublishedAt = DateTime.Parse("2016-05-24"),
                        Price =  180000,
                        Remaining =  5,
                        PublisherId = publishers[4].Id,
                        BookGroupId =  genges[3].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/t/_/t_m-l_-h_c-t_ch-c_c-b_a-1.jpg",
                        Rate =  4.8,
                        Title =  "Tâm Lý Học Tích Cực",
                        TotalPageNumber =  368
                    },
                    new Book
                    {
                        Description =  "Cuốn sách của Mark Manson đưa ra một cái nhìn thẳng thắn và thực tế về cách đối diện với các vấn đề trong cuộc sống. Thay vì theo đuổi hạnh phúc, sách khuyến khích bạn học cách đối mặt và chấp nhận thực tế.",
                        PublishedAt = DateTime.Parse("2019-05-24"),
                        Price =  150000,
                        PublisherId = publishers[0].Id,
                        Remaining =  8,
                        BookGroupId =  genges[4].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/i/m/Image_244718_1_5283.jpg",
                        Rate =  4.7,
                        Title =  "Nghệ Thuật Tinh Tế Của Việc Đếch Quan Tâm",
                        TotalPageNumber =  240
                    },
                    new Book
                    {
                        Description =  "Ryan Holiday, tác giả của cuốn sách này, tập trung vào nghệ thuật sống chậm, tìm sự bình yên nội tâm và tránh xa những điều nhiễu loạn của cuộc sống hiện đại.",
                        PublishedAt = DateTime.Parse("2020-05-26"),
                        Price =  170000,
                        Remaining =  10,
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[4].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/i/m/Image_195509_1_37845.jpg",
                        Rate =  4.6,
                        Title =  "Sức Mạnh Của Sự Tĩnh Lặng",
                        TotalPageNumber =  288
                    },
                    new Book
                    {
                        Description =  "Cuốn sách của Donald Robertson dạy bạn cách thấu hiểu và trau dồi sự tinh tế trong giao tiếp, tư duy, và phong cách sống. Nó là một cẩm nang để trở thành một người thanh lịch và có phong cách.",
                        PublishedAt = DateTime.Parse("2013-08-12"),
                        Price =  160000,
                        Remaining =  7,
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[4].Id,
                        Image =  "https://vnibooks.com/wp-content/uploads/2022/05/nghe-thuat-tinh-te-cua-viec-dech-quan-tam.jpg",

                        Rate =  4.5,
                        Title =  "Nghệ Thuật Của Sự Tinh Tế",
                        TotalPageNumber =  320
                    },
                    new Book
                    {
                        Description =  "Rolf Dobelli viết về những lỗi tư duy phổ biến mà chúng ta thường gặp phải và cách để tránh chúng. Cuốn sách này hướng dẫn cách suy nghĩ một cách rõ ràng và có hệ thống hơn.",
                        Price =  190000,
                        PublishedAt = DateTime.Parse("2012-08-12"),
                        Remaining =  6,
                        PublisherId = publishers[1].Id,
                        BookGroupId =  genges[4].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/n/g/nghe_thuat_tu_duy_ranh_mach_u2487_d20161129_t103616_398639_550x550.jpg",
                        Rate =  4.7,
                        Title =  "Nghệ Thuật Tư Duy Rành Mạch",
                        TotalPageNumber =  350
                    },
                    new Book
                    {
                        Description =  "Cuốn sách này của Epictetus là một bản dịch và diễn giải từ tác phẩm cổ điển của nhà triết học Hy Lạp. Nó cung cấp những bài học quý giá về cách sống tốt, dựa trên nguyên tắc của chủ nghĩa Khắc Kỷ.",
                        Price =  130000,
                        Remaining =  9,
                        PublishedAt = DateTime.Parse("2024-08-30"),
                        PublisherId = publishers[1].Id,
                        BookGroupId =  genges[4].Id,
                        Image =  "https://nhatrangbooks.com/wp-content/uploads/2019/10/11345614940da2e20a3915579f0cc4b2.jpg",
                        Rate =  4.8,
                        Title =  "Nghệ Thuật Sống",
                        TotalPageNumber =  240
                    },
                };

                    if (!context.Books.Any())
                    {
                        try
                        {
                            await context.Books.AddRangeAsync(books);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }


                    List<Review> reviews = new List<Review>
                {
                    new Review
                    {
                        Date = DateTime.Now,
                        Content = "A fascinating read with great insights.",
                        Rate = 5,
                        UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",
                        BookId = books[0].Id
                    },
                    new Review
                    {
                        Date = DateTime.Now.AddDays(-1),
                        Content = "Good book, but a bit lengthy in some parts.",
                        Rate = 4,
                        UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        BookId =books[0].Id
                    },
                    new Review
                    {
                        Date = DateTime.Now.AddDays(-2),
                        Content = "Not my type of book. Found it quite boring.",
                        Rate = 2,
                        UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",
                        BookId = books[0].Id
                    },
                    new Review {
                        Date = DateTime.Now.AddDays(-1),
                        Content = "A must-read for anyone interested in history.",
                        Rate = 5,
                        UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        BookId = books[0].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-2),
                        Content = "The story was engaging, but the ending was predictable.",
                        Rate = 3,
                        UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        BookId = books[0].Id },


                    new Review {
                        Date = DateTime.Now.AddDays(-3),
                        Content = "Excellent writing style and character development.",
                        Rate = 4,
                        UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-4),
                        Content = "A bit too slow for my taste.",
                        Rate = 2, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-5),
                        Content = "A gripping tale from start to finish.",
                        Rate = 5,
                        UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-6),
                        Content = "Informative and well-researched.",
                        Rate = 4,
                        UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        BookId = books[1].Id },
                    new Review {
                        Date = DateTime.Now.AddDays(-7), Content = "Not as good as I expected.", Rate = 3, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",  BookId = books[1].Id },


                    new Review {    Date = DateTime.Now.AddDays(-8), Content = "An inspiring story of resilience.", Rate = 5, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",  BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-9), Content = "I couldn't put it down!", Rate = 5, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-10), Content = "Too many plot holes for my liking.", Rate = 2, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",  BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-11), Content = "A beautifully written novel.", Rate = 5, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98", BookId = books[2].Id },
                    new Review { Date = DateTime.Now.AddDays(-12), Content = "The author has a unique voice.", Rate = 4, UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",  BookId = books[2].Id },


                    new Review { Date = DateTime.Now.AddDays(-13), Content = "I found it hard to follow.", Rate = 3, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b", BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-14), Content = "A bit repetitive in some parts.", Rate = 3, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-15), Content = "A heartwarming and touching story.", Rate = 5, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-16), Content = "Could have been shorter.", Rate = 2, UserId = "5c90980f-12d8-4d0b-a161-30a64c988b98",  BookId = books[3].Id },
                    new Review { Date = DateTime.Now.AddDays(-17), Content = "One of the best books I've read this year.", Rate = 5, UserId = "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",  BookId = books[3].Id },


                    new Review { Date = DateTime.Now.AddDays(-18), Content = "An interesting perspective on the subject.", Rate = 4, UserId = "00de843c-0fcb-4fd8-9285-930aa0cbf31b",  BookId = books[13].Id },
                    new Review {Date = DateTime.Now.AddDays(-19), Content = "Didn't meet my expectations.", Rate = 3, UserId = "94df3fe8-2374-4272-b238-7937cac1ffad", BookId = books[13].Id },
                    new Review { Date = DateTime.Now.AddDays(-20), Content = "A bit too technical for casual readers.", Rate = 3, UserId = "48771cd6-eb49-4518-a55f-c27bf1bb1513", BookId = books[13].Id }
                };

                    if (!context.Reviews.Any())
                    {
                        try
                        {
                            await context.Reviews.AddRangeAsync(reviews);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.ToString());
                        }
                    }

                    // BookAuthors
                    //var bookAuthorDatas = File.ReadAllText("../BookStore.Datas/DbContexts/BookAuthor.json");
                    //var bookAuthors = JsonSerializer.Deserialize<List<BookAuthor>>(bookAuthorDatas);


                    var bookAuthors = new List<BookAuthor>
                {
                    new BookAuthor
                    {
                        AuthorId =  authors[0].Id,
                        BookId =  books[0].Id
                    },
                  new BookAuthor{
                    AuthorId =  authors[1].Id,
                    BookId =  books[1].Id
                  },
                  new BookAuthor{  AuthorId =  authors[2].Id,  BookId =  books[2].Id },
                  new BookAuthor{ AuthorId =  authors[3].Id, BookId =  books[3].Id

                  },
                  new BookAuthor{ AuthorId =  authors[4].Id, BookId =  books[4].Id
                  },
                  new BookAuthor{
                                AuthorId =  authors[5].Id, BookId =  books[5].Id
                  },
                  new BookAuthor{
                                AuthorId =  authors[6].Id, BookId =  books[6].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id, BookId =  books[7].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[8].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[9].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[0].Id,
                    BookId =  books[10].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[0].Id,
                    BookId =  books[11].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[1].Id,
                    BookId =  books[12].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[2].Id,
                    BookId =  books[13].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[3].Id,
                    BookId =  books[14].Id

                  },new BookAuthor
                  {
                                AuthorId =  authors[4].Id,
                    BookId =  books[15].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[5].Id,
                    BookId =  books[16].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[6].Id,
                    BookId =  books[17].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id,
                    BookId =  books[18].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[19].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[10].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[6].Id,
                    BookId =  books[21].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[7].Id,
                    BookId =  books[22].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[8].Id,
                    BookId =  books[23].Id
                  },new BookAuthor
                  {
                                AuthorId =  authors[9].Id,
                    BookId =  books[24].Id
                  }
                        };

                    if (!context.BookAuthors.Any())
                    {
                        try
                        {
                            await context.BookAuthors.AddRangeAsync(bookAuthors);

                            if (context.ChangeTracker.HasChanges())
                            {
                                await context.SaveChangesAsync();
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }
                
                #endregion

                #region Dữ liệu Seeding Cart
                //var cartDatas = File.ReadAllText("../BookStore.Datas/DbContexts/Cart.json");
                //var carts = JsonSerializer.Deserialize<List<Cart>>(cartDatas);

                var carts = new List<Cart>
                {
                    new Cart
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[0].Id,
                                Quantity =  13
                            },
                            new CartItem
                            {
                                BookId =  books[1].Id,
                                Quantity =  12
                            },
                            new CartItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  17
                            },
                            new CartItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  17
                            },
                            new CartItem
                            {
                                BookId = books[5].Id,
                                Quantity =  2
                            }
                        }
                      },
                    new Cart
                      {
                        UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                        CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[2].Id,
                                Quantity =  4
                            },
                            new CartItem
                            {
                                BookId =  books[8].Id,
                                Quantity =  3
                            },
                            new CartItem
                            {
                                BookId = books[9].Id,
                                Quantity =  6
                            },
                            new CartItem
                            {
                                BookId =  books[10].Id,
                                Quantity =  5
                            }
                        }

                      },
                    new Cart
                      {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                         CartItems = new List<CartItem>
                        {
                            new CartItem
                            {
                                BookId =  books[7].Id,
                                Quantity =  8
                            },
                             new CartItem
                            {
                                BookId =  books[11].Id,
                                Quantity =  1
                            },
                             new CartItem
                            {
                                BookId =  books[12].Id,
                                Quantity =  25
                            },
                             new CartItem
                            {
                                BookId =  books[14].Id,
                                Quantity =  17
                            },new CartItem
                            {
                                BookId =  books[15].Id,
                                Quantity =  20
                            },new CartItem
                            {
                                BookId =  books[16].Id,
                                Quantity =  18
                            }
                        }

                      }
                };

                if (!context.Carts.Any())
                {
                    await context.Carts.AddRangeAsync(carts);

                    if (context.ChangeTracker.HasChanges())
                    {
                        await context.SaveChangesAsync();
                    }
                }
                #endregion

                #region Dữ liệu Seeding Order
                //var orderDatas = File.ReadAllText("../BookStore.Datas/DbContexts/Order.json");
                //var orders = JsonSerializer.Deserialize<List<Order>>(orderDatas);

                var orders = new List<Order>
                {
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 06),
                        TotalAmount =  200000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem {
                                BookId =  books[0].Id,
                                Quantity =  13
                            }
                        }
                     },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 02, 06),
                        TotalAmount =  250000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[1].Id,
                                Quantity =  12
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 07, 23),
                        TotalAmount =  300000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[2].Id,
                                Quantity =  5
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2023, 12, 06),
                        TotalAmount =  350000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[3].Id,
                                Quantity =  8
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 11),
                        TotalAmount =  400000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[4].Id,
                                Quantity =  17
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 08, 06),
                        TotalAmount =  450000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[5].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2024, 06, 06),
                        TotalAmount =  500000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[6].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        Date = new DateTime(2022, 12, 06),
                        TotalAmount =  550000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[7].Id,
                                Quantity =  2
                            }
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  600000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[8].Id,
                                Quantity =  3
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  650000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[9].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  700000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[10].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  750000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[11].Id,
                                Quantity =  3
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  800000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[12].Id,
                                Quantity =  1
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  850000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[13].Id,
                                Quantity =  2
                            },
                        }
                    },
                    new Order
                    {
                        UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                        Status =  OrderStatusEnum.DaGiaoHang,
                        TotalAmount =  900000,
                        OrderItems = new List<OrderItem>
                        {
                            new OrderItem
                            {
                                BookId =  books[14].Id,
                                Quantity =  3
                            }
                        }
                    }
                };

                if (!context.Orders.Any())
                {
                    try
                    {
                        await context.Orders.AddRangeAsync(orders);

                        if (context.ChangeTracker.HasChanges())
                        {
                            await context.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        await context.SaveChangesAsync();
                    }
                }
                #endregion

                #region Dữ liệu Seeding Vouchers
                //var voucherDatas = File.ReadAllText("../BookStore.Datas/DbContexts/Vouchers.json");
                //var vouchers = JsonSerializer.Deserialize<List<Voucher>>(voucherDatas);

                var vouchers = new List<Voucher>
                {
                    new Voucher
                    {
                        Percent =  10,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  11,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  12,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  13,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  14,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  15,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  16,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  17,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  18,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                    new Voucher {
                        Percent =  20,
                        VoucherUsers = new List<VoucherUser>
                        {
                            new VoucherUser
                            {
                                UserId =  "5c90980f-12d8-4d0b-a161-30a64c988b98",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "48771cd6-eb49-4518-a55f-c27bf1bb1513",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "94df3fe8-2374-4272-b238-7937cac1ffad",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "00de843c-0fcb-4fd8-9285-930aa0cbf31b",
                                Used =  false
                            },
                            new VoucherUser
                            {
                                UserId =  "b5c9e5de-dcea-416b-8f70-e0cb145d69e0",
                                Used =  false
                            },
                        }
                    },
                };

                if (!context.Vouchers.Any())
                {
                    try
                    {
                        await context.Vouchers.AddRangeAsync(vouchers);

                        if (context.ChangeTracker.HasChanges())
                        {
                            await context.SaveChangesAsync();
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }
                }

                #endregion

                if (context.ChangeTracker.HasChanges())
                {
                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
