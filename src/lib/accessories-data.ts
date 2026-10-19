export interface AccessoryItem {
  id: string;
  name: string;
  price: number;
  category: 'mat-duong' | 'canbus' | 'giac-nguon' | 'pat-den' | 'day-dien' | 'phu-kien-khac';
  categoryName: string;
  image: string;
  desc: string;
  applicableCategorySlugs: string[]; // Hạng mục thiết bị chính tương ứng
  recommended?: boolean;
}

export const ACCESSORIES_DATA: AccessoryItem[] = [
  {
    id: 'acc-mat-duong',
    name: 'Mặt Dưỡng Chuẩn Zin Theo Dòng Xe',
    price: 350000,
    category: 'mat-duong',
    categoryName: 'Mặt Dưỡng Theo Xe',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
    desc: 'Nhựa ABS cao cấp chống rung ồn, vừa khít 100% phom taplo xe.',
    applicableCategorySlugs: ['man-hinh-android'],
    recommended: true,
  },
  {
    id: 'acc-canbus',
    name: 'Hộp Canbus Giải Mã Tín Hiệu Xe',
    price: 500000,
    category: 'canbus',
    categoryName: 'Giải Mã Canbus',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
    desc: 'Đồng bộ phím vô lăng, hiển thị gió điều hòa, báo mở cửa và camera lùi zin.',
    applicableCategorySlugs: ['man-hinh-android', 'camera-o-to'],
    recommended: true,
  },
  {
    id: 'acc-giac-nguon-zin',
    name: 'Dây Nguồn Cắm Giắc Zin 100% (Không Cắt Dây)',
    price: 150000,
    category: 'giac-nguon',
    categoryName: 'Giắc Nguồn Zin',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    desc: 'Chuẩn chân cắm jack nhà máy, giữ nguyên 100% bảo hành hãng của xe.',
    applicableCategorySlugs: ['man-hinh-android', 'camera-o-to', 'android-box'],
    recommended: true,
  },
  {
    id: 'acc-pat-den',
    name: 'Bộ Pát Chuyên Dụng Bắt Bi LED Theo Xe',
    price: 250000,
    category: 'pat-den',
    categoryName: 'Pát Lắp Đèn',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80',
    desc: 'Bắt chuẩn khớp lỗ ốc đèn zin, không đục khoét chóa, chuẩn góc đăng kiểm.',
    applicableCategorySlugs: ['do-den-o-to'],
    recommended: true,
  },
  {
    id: 'acc-relay-pha',
    name: 'Bộ Dây Relay Kích Pha Chống Quá Tải',
    price: 200000,
    category: 'day-dien',
    categoryName: 'Dây Điện & Relay',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80',
    desc: 'Bảo vệ nguồn điện bình ắc quy khi bật chế độ pha công suất lớn.',
    applicableCategorySlugs: ['do-den-o-to'],
  },
  {
    id: 'acc-day-nguon-sub',
    name: 'Bộ Dây Nguồn Sub Đồng Nguyên Chất + Cầu Chì 60A',
    price: 350000,
    category: 'day-dien',
    categoryName: 'Dây Loa & Cầu Chì',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',
    desc: 'Lõi đồng OFC chịu tải cao, cầu chì chống cháy nổ an toàn tuyệt đối.',
    applicableCategorySlugs: ['am-thanh-xe-hoi'],
    recommended: true,
  },
  {
    id: 'acc-day-rca',
    name: 'Cặp Dây Tín Hiệu Âm Thanh RCA Chống Nhiễu',
    price: 250000,
    category: 'day-dien',
    categoryName: 'Dây Tín Hiệu',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',
    desc: 'Đầu jack mạ vàng, chống sôi rè, cho dải trầm của loa sub uy lực và sạch.',
    applicableCategorySlugs: ['am-thanh-xe-hoi'],
  },
  {
    id: 'acc-pat-tai-guong',
    name: 'Bộ Dưỡng Chân Gương & Pát Canh Lề Camera 360',
    price: 200000,
    category: 'phu-kien-khac',
    categoryName: 'Phụ Kiện Camera',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
    desc: 'Gắn mắt cam dưới tai gương kín đáo, căn chỉnh bạt góc nhìn 3D chuẩn xác.',
    applicableCategorySlugs: ['camera-o-to'],
    recommended: true,
  },
  {
    id: 'acc-cau-chi-fuse-tap',
    name: 'Bộ Cầu Chì Phụ Fuse Tap Khóa Điện An Toàn',
    price: 80000,
    category: 'giac-nguon',
    categoryName: 'Cầu Chì An Toàn',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80',
    desc: 'Lấy nguồn ACC từ hộp cầu chì zin mà không cần trích nối dây điện xe.',
    applicableCategorySlugs: ['camera-o-to', 'cam-bien-o-to', 'den-led-noi-that'],
  },
  {
    id: 'acc-day-quang-led',
    name: 'Bộ Nối Dây Quang LED Nội Thất Siêu Mỏng 0.5mm',
    price: 150000,
    category: 'phu-kien-khac',
    categoryName: 'Phụ Kiện LED',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80',
    desc: 'Luồn khít các khe cánh cửa và taplo, không lộ gờ viền, ánh sáng đều mịn.',
    applicableCategorySlugs: ['den-led-noi-that'],
  },
];
