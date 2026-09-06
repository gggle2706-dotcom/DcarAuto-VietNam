// Cấu hình mặc định và hằng số toàn hệ thống

export const DEFAULT_SHOP_SETTINGS = {
  shop_name: 'AutoTech Pro',
  shop_tagline: 'Chuyên Nâng Cấp Nội Thất & Đồ Chơi Công Nghệ Ô Tô',
  phone: '0988.123.456',
  hotline: '0988.123.456',
  zalo: '0988123456',
  address: 'Số 88 Đường Lê Quang Đạo, Nam Từ Liêm, Hà Nội',
  email: 'lienhe@autotechpro.vn',
  facebook_url: 'https://facebook.com',
  messenger_url: 'https://m.me',
  google_maps_url: 'https://maps.google.com',
  operating_hours: '08:00 - 18:30 (Cả tuần)',
  seo_title: 'AutoTech Pro - Chuyên Độ Màn Hình Android, Camera 360, Âm Thanh, Bi LED Ô Tô',
  seo_description: 'Trung tâm nâng cấp đồ chơi ô tô chuyên nghiệp. Phân phối và thi công Màn hình Android, Camera 360, Bi Laser, Loa Sub, Đèn Ambient Light chuẩn giắc zin 100%.',
};

export const NAVIGATION_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Tìm theo xe', href: '/tim-theo-xe' },
  { label: 'Dịch vụ nâng cấp', href: '/dich-vu' },
  { label: 'Kinh nghiệm & Tư vấn', href: '/blog' },
  { label: 'Về chúng tôi', href: '/gioi-thieu' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const CATEGORIES_LIST = [
  { id: '1', name: 'Màn hình Android', slug: 'man-hinh-android', icon: 'Monitor' },
  { id: '2', name: 'Android Box', slug: 'android-box', icon: 'Box' },
  { id: '3', name: 'Camera 360 & Cam hành trình', slug: 'camera-o-to', icon: 'Camera' },
  { id: '4', name: 'Nâng cấp Ánh sáng (Bi LED/Laser)', slug: 'do-den-o-to', icon: 'Sun' },
  { id: '5', name: 'Âm thanh xe hơi (Loa/Sub/DSP)', slug: 'am-thanh-xe-hoi', icon: 'Volume2' },
  { id: '6', name: 'Đèn LED nội thất (Ambient Light)', slug: 'den-led-noi-that', icon: 'Sparkles' },
  { id: '7', name: 'Cảm biến áp suất lốp & Cảnh báo', slug: 'cam-bien-o-to', icon: 'Activity' },
  { id: '8', name: 'Phụ kiện & Thảm lót sàn cao cấp', slug: 'phu-kien-xe-hoi', icon: 'ShieldCheck' },
];

export const CAR_BRANDS_SAMPLE = [
  { id: 'toyota', name: 'Toyota', slug: 'toyota' },
  { id: 'honda', name: 'Honda', slug: 'honda' },
  { id: 'hyundai', name: 'Hyundai', slug: 'hyundai' },
  { id: 'kia', name: 'Kia', slug: 'kia' },
  { id: 'mazda', name: 'Mazda', slug: 'mazda' },
  { id: 'ford', name: 'Ford', slug: 'ford' },
  { id: 'vinfast', name: 'VinFast', slug: 'vinfast' },
  { id: 'mitsubishi', name: 'Mitsubishi', slug: 'mitsubishi' },
];
