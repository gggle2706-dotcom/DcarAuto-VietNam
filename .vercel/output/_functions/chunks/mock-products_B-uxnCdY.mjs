//#region src/lib/mock-products.ts
var MOCK_PRODUCTS = [
	{
		id: "prod-1",
		slug: "man-hinh-android-zestech-zx10-tieu-chuan",
		sku: "ZT-ZX10-STD",
		name: "Màn Hình Android Ô Tô Zestech ZX10 Bản Tiêu Chuẩn",
		brand: "Zestech",
		categorySlug: "man-hinh-android",
		categoryName: "Màn hình Android",
		price: 89e5,
		salePrice: 79e5,
		image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
		specs: [
			"RAM 3GB - ROM 32GB",
			"Chip 8 Nhân 2.0GHz",
			"Màn IPS 2K",
			"Tặng Sim 4G 1 năm"
		],
		warrantyMonths: 24,
		isUniversal: false,
		isFeatured: true,
		compatibleBrands: [
			"toyota",
			"honda",
			"hyundai",
			"kia",
			"mazda",
			"mitsubishi",
			"ford"
		],
		compatibleModels: [
			"vios",
			"camry",
			"city",
			"accent",
			"seltos",
			"cx-5",
			"xpander"
		],
		description: "Màn hình Android thế hệ mới tích hợp điều khiển giọng nói Kiki, cảnh báo tốc độ, phạt nguội và xem YouTube không quảng cáo."
	},
	{
		id: "prod-2",
		slug: "camera-360-safeview-s500-sie-net",
		sku: "SV-S500-3D",
		name: "Camera 360 Độ Safeview S500 Mắt Sony Full HD Siêu Nét",
		brand: "Safeview",
		categorySlug: "camera-o-to",
		categoryName: "Camera 360 & Cam hành trình",
		price: 139e5,
		salePrice: 125e5,
		image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
		specs: [
			"Mắt Cam Sony A225",
			"Mô phỏng 3D 28 góc nhìn",
			"Ghi hình 4 hướng",
			"Đánh lái theo vô lăng"
		],
		warrantyMonths: 24,
		isUniversal: false,
		isFeatured: true,
		compatibleBrands: [
			"toyota",
			"honda",
			"hyundai",
			"kia",
			"mazda",
			"vinfast"
		],
		compatibleModels: [
			"vios",
			"camry",
			"corolla-cross",
			"tucson",
			"santafe",
			"carnival",
			"vf-8"
		],
		description: "Xóa tan mọi điểm mù quanh xe, tự động mở cam khi xi nhan hoặc lùi xe. Hỗ trợ căn lề chuẩn xác đến từng cm."
	},
	{
		id: "prod-3",
		slug: "bi-led-x-light-v20-new-2024",
		sku: "XL-V20-2024",
		name: "Bi LED Nâng Cấp Ánh Sáng X-Light V20 Thế Hệ Mới",
		brand: "X-Light",
		categorySlug: "do-den-o-to",
		categoryName: "Nâng cấp Ánh sáng (Bi LED/Laser)",
		price: 75e5,
		salePrice: 68e5,
		image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
		specs: [
			"Công suất Cos 60W / Pha 70W",
			"Nhiệt màu 5500K bám đường",
			"Chip LED 6+3 Osram",
			"Bảo hành 36 tháng"
		],
		warrantyMonths: 36,
		isUniversal: true,
		isFeatured: true,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Dòng bi LED quốc dân được săn đón nhiều nhất, đường cắt ánh sáng gọn gàng, văn minh không gây chói mắt người đối diện."
	},
	{
		id: "prod-4",
		slug: "loa-sub-gam-ghe-dls-acw10-thuy-dien",
		sku: "DLS-ACW10",
		name: "Loa Sub Gầm Ghế DLS ACW10 Cao Cấp Thụy Điển",
		brand: "DLS",
		categorySlug: "am-thanh-xe-hoi",
		categoryName: "Âm thanh xe hơi (Loa/Sub/DSP)",
		price: 72e5,
		salePrice: 65e5,
		image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
		specs: [
			"Công suất RMS 200W / Max 450W",
			"Âm bass sâu và chắc",
			"Kích thước mỏng 10 inch",
			"Chính hãng Thụy Điển"
		],
		warrantyMonths: 24,
		isUniversal: true,
		isFeatured: true,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Bổ sung dải âm trầm uy lực, giúp các bản nhạc sống động hơn hẳn mà không chiếm bất kỳ diện tích cốp xe nào."
	},
	{
		id: "prod-5",
		slug: "android-box-d14-ultra-vietmap",
		sku: "VM-D14-ULTRA",
		name: "Android Box Vietmap D14 Ultra Biến Màn Zin Thành Android",
		brand: "Vietmap",
		categorySlug: "android-box",
		categoryName: "Android Box",
		price: 85e5,
		salePrice: 765e4,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
		specs: [
			"RAM 8GB - ROM 128GB",
			"Chip Snapdragon 6125",
			"Dẫn đường Vietmap Live bản quyền",
			"Cắm cổng USB / Type-C"
		],
		warrantyMonths: 24,
		isUniversal: true,
		isFeatured: true,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Dành cho các chủ xe muốn giữ nguyên màn hình zin nguyên bản nhưng vẫn muốn dùng đầy đủ tính năng thông minh của Android."
	},
	{
		id: "prod-6",
		slug: "den-led-noi-that-ambient-light-64-mau",
		sku: "LED-AMB-64C",
		name: "Đèn LED Nội Thất Viền Ambient Light 64 Màu Đồng Bộ Nhịp Nhạc",
		brand: "Ambient Light",
		categorySlug: "den-led-noi-that",
		categoryName: "Đèn LED nội thất (Ambient Light)",
		price: 35e5,
		salePrice: 29e5,
		image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
		specs: [
			"18 - 22 chi tiết đèn LED",
			"Đổi màu qua App điện thoại",
			"Cảm biến nháy theo nhạc",
			"Dây quang cao cấp không lộ viền"
		],
		warrantyMonths: 12,
		isUniversal: true,
		isFeatured: false,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Nâng tầm khoang lái sang trọng như Mercedes S-Class, điều khiển linh hoạt độ sáng và bảng màu theo tâm trạng."
	},
	{
		id: "prod-7",
		slug: "cam-bien-ap-suat-lop-icar-ellisafe-adisi",
		sku: "ICAR-ADISI",
		name: "Cảm Biến Áp Suất Lốp Van Trong ICAR Ellisafe Hiển Thị Màn Android",
		brand: "ICAR",
		categorySlug: "cam-bien-o-to",
		categoryName: "Cảm biến áp suất lốp & Cảnh báo",
		price: 28e5,
		salePrice: 25e5,
		image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
		specs: [
			"4 van cảm biến gắn trong",
			"Pin Nhật tuổi thọ 5 năm",
			"Cảnh báo giọng nói tiếng Việt",
			"Đồng bộ màn hình Android"
		],
		warrantyMonths: 36,
		isUniversal: true,
		isFeatured: false,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Theo dõi áp suất và nhiệt độ 4 bánh xe thời gian thực, chủ động phòng ngừa tai nạn nổ lốp trên đường cao tốc."
	},
	{
		id: "prod-8",
		slug: "camera-hanh-trinh-vietmap-kc01-truoc-sau",
		sku: "VM-KC01-PRO",
		name: "Camera Hành Trình Vietmap KC01 Cảnh Báo Giao Thông Trước & Sau",
		brand: "Vietmap",
		categorySlug: "camera-o-to",
		categoryName: "Camera 360 & Cam hành trình",
		price: 42e5,
		salePrice: 385e4,
		image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
		specs: [
			"Ghi hình Super HD 2K",
			"Cảnh báo biển báo tốc độ bằng giọng nói",
			"Cảm biến Sony Starvis",
			"Kết nối Wi-Fi 5GHz tải video siêu nhanh"
		],
		warrantyMonths: 12,
		isUniversal: true,
		isFeatured: true,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Trợ thủ lái xe đắc lực cảnh báo sớm các biển giới hạn tốc độ, khu dân cư, camera phạt nguội giúp bảo toàn bằng lái."
	}
];
//#endregion
export { MOCK_PRODUCTS as t };
