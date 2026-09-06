export interface MockPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image: string;
  relatedCar?: string;
  relatedProductSlug?: string;
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: 'post-1',
    slug: 'nen-do-man-hinh-android-hay-dung-android-box',
    title: 'Nên Độ Màn Hình Android Hay Dùng Android Box Cho Ô Tô?',
    excerpt: 'Phân tích chi tiết ưu nhược điểm giữa thay màn hình Android nguyên cụm và cắm Android Box giữ màn zin.',
    category: 'Tư vấn mua hàng',
    author: 'Kỹ thuật viên Trưởng',
    publishedAt: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    content: `
      Nhiều chủ xe mới nhận xe thường băn khoăn giữa 2 phương án: thay luôn một chiếc màn hình Android kích thước lớn 9 - 13 inch hay chỉ cần cắm một cục Android Box nhỏ gọn vào cổng USB của xe?

      1. Khi nào nên chọn Android Box?
      - Xe của bạn đã có màn hình zin lớn, sắc nét (ví dụ: các dòng xe Ford đời mới, VinFast, Kia Carnival, Hyundai SantaFe).
      - Bạn muốn giữ xe 100% nguyên bản, tuyệt đối không tháo dỡ một con ốc nào trên taplo.
      - Chi phí hợp lý, dễ dàng rút ra chuyển sang xe khác khi cần.

      2. Khi nào nên thay Màn hình Android?
      - Màn hình nguyên bản theo xe quá bé (7 inch), độ phân giải thấp, không hỗ trợ cảm ứng mượt mà.
      - Bạn muốn tích hợp Camera 360 độ toàn cảnh (màn Android tích hợp 360 cho độ nét vượt trội hơn hẳn so với hộp cam rời).
      - Âm thanh nguyên bản nghe yếu, màn Android có chip xử lý âm thanh DSP đa kênh giúp loa zin nghe hay hơn rõ rệt.
    `,
  },
  {
    id: 'post-2',
    slug: 'top-5-loai-bi-led-tang-sang-van-minh-khong-choi-mat',
    title: 'Top 5 Dòng Bi LED Tăng Sáng Văn Minh Không Gây Chói Mắt Đối Diện',
    excerpt: 'Kinh nghiệm nâng cấp đèn bi LED ô tô: chọn nhiệt màu bám đường, công suất tối ưu và căn chỉnh góc chiếu đạt chuẩn đăng kiểm.',
    category: 'Kiến thức kỹ thuật',
    author: 'Chuyên gia Ánh sáng',
    publishedAt: '2025-01-20',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    content: `
      Độ đèn ô tô không chỉ để sáng hơn mà quan trọng nhất là phải an toàn và văn minh với người tham gia giao thông.

      Nguyên tắc cốt lõi khi độ bi LED:
      - Mặt cắt ánh sáng (cut-off line) phải thật sắc nét ở chế độ Cos (chiếu gần), tuyệt đối không để ánh sáng hắt lên kính xe đối diện.
      - Nhiệt màu khuyên dùng là 5000K - 5500K cho ánh sáng vàng trắng tự nhiên, bám đường cực tốt khi trời mưa phùn hoặc sương mù.
      - Cần thi công bằng máy canh tâm đèn chuyên dụng, căn chỉnh thước đo góc chiếu theo đúng tiêu chuẩn kiểm định xe cơ giới.
    `,
  },
  {
    id: 'post-3',
    slug: 'nang-cap-am-thanh-o-to-co-ban-chi-phi-duoi-10-trieu',
    title: 'Nâng Cấp Âm Thanh Ô Tô Cơ Bản Với Ngân Sách Dưới 10 Triệu Đồng',
    excerpt: 'Hướng dẫn phối ghép loa Sub gầm ghế và dán cách âm cánh cửa để có dàn âm thanh sống động nhất trong tầm giá.',
    category: 'Kinh nghiệm độ xe',
    author: 'Kỹ sư Âm thanh',
    publishedAt: '2025-02-02',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    content: `
      Loa zin theo các dòng xe phổ thông (như Vios, Accent, City, Xpander) thường có màng giấy mỏng và thiếu hẳn dải âm trầm (Bass).

      Giải pháp tối ưu dưới 10 triệu đồng:
      - Bước 1: Lắp thêm 1 loa Subwoofer gầm ghế (Sub điện) như DLS ACW10 hoặc Nakamichi để gánh dải trầm.
      - Bước 2: Dán cách âm 4 cánh cửa xe bằng vật liệu chuyên dụng để tạo thành thùng loa kín, giảm rung rè tôn cửa khi mở nhạc to.
      - Kết quả: Âm thanh lập tức chắc khỏe, tròn tiếng và không còn hiện tượng ù tai.
    `,
  },
];
