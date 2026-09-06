// Cấu hình thông tin cửa hàng

export const DEFAULT_SHOP_SETTINGS = {
  shop_name: 'AutoTech',
  shop_tagline: 'Phụ Kiện & Đồ Chơi Xe Hơi Chính Hãng',
  phone: '0988.123.456',
  hotline: '0988.123.456',
  zalo: '0988123456',
  address: 'Số 88 Lê Quang Đạo, Nam Từ Liêm, Hà Nội',
  email: 'lienhe@autotech.vn',
  facebook_url: 'https://facebook.com',
  messenger_url: 'https://m.me',
  google_maps_url: 'https://maps.google.com',
  operating_hours: '08:00 - 18:30 (Thứ 2 - Chủ Nhật)',
  seo_title: 'Nội Thất & Đồ Chơi Công Nghệ Ô Tô Chính Hãng',
  seo_description: 'Chuyên màn hình Android ô tô, camera 360, loa sub, độ đèn bi LED chuẩn giắc zin theo xe.',
};

export const NAVIGATION_LINKS = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Tìm theo xe', href: '/tim-theo-xe' },
  { label: 'Kinh nghiệm', href: '/blog' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const CATEGORIES_LIST = [
  { id: '1', name: 'Màn hình Android', slug: 'man-hinh-android' },
  { id: '2', name: 'Android Box', slug: 'android-box' },
  { id: '3', name: 'Camera 360 & Cam hành trình', slug: 'camera-o-to' },
  { id: '4', name: 'Độ đèn Bi LED / Laser', slug: 'do-den-o-to' },
  { id: '5', name: 'Âm thanh (Loa, Sub, DSP)', slug: 'am-thanh-xe-hoi' },
  { id: '6', name: 'Đèn LED nội thất', slug: 'den-led-noi-that' },
  { id: '7', name: 'Cảm biến áp suất lốp', slug: 'cam-bien-o-to' },
  { id: '8', name: 'Phụ kiện theo xe', slug: 'phu-kien-xe-hoi' },
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
