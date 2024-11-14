using BookStore.Datas.DbContexts;
using BookStore.Models.Models;

namespace BookStore.Datas.SeedingDatas
{
    public class ProductDataSeedContributor
    {
        private List<Book> _books;

        public ProductDataSeedContributor(List<BookGroup> genges, List<Publisher> publishers)
        {
            _books = new List<Book>
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
                        Description = "英語音声×英語×日本語で楽しむドラえもん" +
                                        "+ シリーズ累計140万部!ドラえもんイングリッシュ・コミックス10年ぶりの新シリーズは、ドラえもんの名作まんがが【英語音声】×【英語】×【日本語】で楽しめます。" +
                                        "+ 英語セリフ+関連表現が《音声サイト》でいつでも聞ける!" +
                                        "各ページの二次元バーコードをスマホで読み込めば、コミックの英語セリフと関連表現をネイティブスピーカーの英語で聞くことができます。" +
                                        "「ドラえもん」の登場人物は主に小学生ですが、登場する英語は年齢を問わずネイティブスピーカーが日常使うものばかり。すぐに役立つ表現が満載です。" +
                                        "+ 収録話(全14話)はすべて新訳。日常会話が学べるお話をセレクト!" +
                                        "- もしもボックス - 正直太郎 - この絵600万円 - ごきげんメーター" +
                                        "- お天気ボックス - もどりライト - かがみでコマーシャル - ミニカー教習所 ◇あちこちひっこそう - あの日あの時あのダルマ - ハッピープロムナード - 円ピツで大金持ち" +
                                        "- ためしにさようなら - 45年後……" +
                                        "+《英語ワンポイントレッスン》を大幅にボリュームアップ!" +
                                        "各まんがのあとに続く「英語ワンポイントレッスン」では、できるだけ文法用語を使わずに英語の細かなニュアンス、使い方、関連表現などについて楽しく丁寧に解説。英語への理解が深まります。英語圏の文化や習慣への理解が深まるコラムも!" +
                                        "+すべての漢字はふりがな付きなので小学生から読めます!大人のやり直し英語にも!" +
                                        "+ シリーズ全6巻刊行予定" +
                                        "【編集担当からのおすすめ情報】" +
                                        "音声サイトの英語音声は、1話ごとに【はじめから通して聞く】【セリフごとに聞く】の2種類のモードから選べます。ネイティブスピーカーの声優陣はNHKの英会話講座などで活躍中のベテランぞろい。聞き取りやすい英語を繰り返し聞きながら、バイリンガルコミックス「DORAEMON」の世界観を味わってみてください。",
                        Price = 297000,
                        Remaining = 80,
                        BookGroupId = genges[0].Id,
                        Image = "https://cdn0.fahasa.com/media/catalog/product/9/7/9784092274099.jpg",
                        Rate = 4.0,
                        Title = "英語でDORAEMON 音声つき: バイリンガルコミックス - Eigo De DORAEMON Bilingual Comics 3 (Japanese - English Version)",
                        TotalPageNumber = 192,
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
                        Image = "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235240018.jpg",
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
                        Image = "https://cdn0.fahasa.com/media/catalog/product/q/u/qu_n-canh-b_-h_m-c_a-k_-c_p-qu_-kh_.jpg",
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
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235241954.jpg",
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
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235241282.jpg",
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
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235241299.jpg",
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
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235238206.jpg",
                        Rate =  4.8,
                        PublishedAt = DateTime.Parse("2011-05-24"),
                        Title =  "Đắc Nhân Tâm - Bản Hiệu Chỉnh (Tái Bản 2023)",
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
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/8/9/8935251416916.jpg",
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
                    new Book
                    {
                        Description =  "Câu chuyện kể về chuyến dã ngoại lí thú trước khi tốt nghiệp Trường đào tạo robot của nhóm bạn Doraemon. Thử thách trong ngày cuối cùng của chuyến đi cũng chính là bài thi tốt nghiệp. Mỗi học sinh phải tự chọn lấy một con robot côn trùng làm bạn đồng hành và tìm đường trở về trước hoàng hôn. Ai về trễ, người đó sẽ bị trượt tốt nghiệp! Liệu nhóm Doraemon có thể vượt qua thử thách này không, chúng ta cùng theo dõi nhé! Đây là phiên bản tranh truyện màu được vẽ lại từ tập phim hoạt hình cùng tên của tác giả Fujiko F Fujio.",
                        Price =  29400,
                        Remaining =  9,
                        PublishedAt = DateTime.Parse("2024-08-30"),
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[0].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/d/o/doraemon-tranh-truyen-mau_doi-quan-doraemon_dai-chien-thuat-con-trung_tb-2024.jpg",
                        Rate =  0,
                        Title =  "Doraemon - Tranh Truyện Màu - Đội Quân Doraemon - Đại Chiến Thuật Côn Trùng (Tái Bản 2024)",
                        TotalPageNumber =  96
                    },
                    new Book
                    {
                        Description =  "Viên nhộng năng lượng đột nhiên bị đánh cắp khỏi Trung tâm năng lượng khiến mọi hoạt động của thành phố tương lai đều bị ngưng trệ. Đội quân Doraemon nhận nhiệm vụ áp tải viên nhộng dự bị đến Trung tâm năng lượng trên một chiếc tàu hỏa cổ lỗ có tên là \"Roko\". Suốt cuộc hành trình, nhà khoa học xấu xa Achimov đã dùng mọi thủ đoạn phá hoại... Liệu Đội quân Doraemon có hoàn thành nhiệm vụ hay không, chúng ta hãy cùng theo dõi nhé! Đây là phiên bản tranh truyện màu được vẽ lại từ tập phim hoạt hình cùng tên của tác giả Fujiko.F.Fujio.",
                        Price =  29400,
                        Remaining =  9,
                        PublishedAt = DateTime.Parse("2023-08-30"),
                        PublisherId = publishers[0].Id,
                        BookGroupId =  genges[0].Id,
                        Image =  "https://cdn0.fahasa.com/media/catalog/product/d/o/doraemon-tranh-truyen-mau_doi-quan-doraemon_chuyen-tau-lua-toc-hanh-_tb-2023.jpg",
                        Rate =  0,
                        Title =  "Doraemon - Tranh Truyện Màu - Đội Quân Doraemon - Chuyến Tàu Lửa Tốc Hành (Tái Bản 2023)",
                        TotalPageNumber =  96
                    },
                };

        }

        public async Task<List<Book>> BookSeederAsync(BookStoreDbContext context, IServiceProvider serviceProvider)
        {
            if (!context.Books.Any())
            {
                try
                {
                    await context.Books.AddRangeAsync(_books);

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

            return _books;
        }


    }
}
