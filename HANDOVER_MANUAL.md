# SỔ TAY VẬN HÀNH & HƯỚNG DẪN BÀN GIAO HỆ THỐNG
## Website Nội Thất & Đồ Chơi Công Nghệ Ô Tô (AutoTech Pro)

Tài liệu này được lập ra nhằm giúp chủ xưởng/chủ shop và đội ngũ kỹ thuật có thể dễ dàng quản trị, cấu hình, vận hành và chuyển giao toàn bộ website mà không bị phụ thuộc vào lập trình viên.

---

## MỤC LỤC
1. [Kiến trúc & Công nghệ](#1-kiến-trúc--công-nghệ)
2. [Cài đặt & Chạy trên máy tính (Local)](#2-cài-đặt--chạy-trên-máy-tính-local)
3. [Khởi tạo Cơ sở dữ liệu Supabase](#3-khởi-tạo-cơ-sở-dữ-liệu-supabase)
4. [Triển khai lên Cloudflare Pages (Chi phí 0đ)](#4-triển-khai-lên-cloudflare-pages-chi-phí-0đ)
5. [Hướng dẫn Sử dụng Trang Quản Trị (/admin)](#5-hướng-dẫn-sử-dụng-trang-quản-trị-admin)
6. [Quản lý Thông tin Shop & Kênh Liên Hệ](#6-quản-lý-thông-tin-shop--kênh-liên-hệ)
7. [Bảo trì, Backup & Phòng ngừa Ngủ đông Supabase](#7-bảo-trì-backup--phòng-ngừa-ngủ-đông-supabase)
8. [Quy trình Bàn giao Quyền Sở hữu (Transfer Ownership)](#8-quy-trình-bàn-giao-quyền-sở-hữu-transfer-ownership)

---

## 1. Kiến trúc & Công nghệ
- **Giao diện Khách hàng:** [Astro](https://astro.build) v7 + [Tailwind CSS](https://tailwindcss.com) v4. Tối ưu tốc độ tải trang cực đại, Zero JavaScript mặc định, chuẩn SEO Google 100%.
- **Thành phần tương tác & Bảng Quản trị (Admin):** [React](https://react.dev) 19 Islands.
- **Cơ sở dữ liệu & Xác thực:** [Supabase](https://supabase.com) (PostgreSQL chuẩn doanh nghiệp + Row Level Security).
- **Hạ tầng lưu trữ & Hosting:** [Cloudflare Pages](https://pages.cloudflare.com) (Băng thông không giới hạn ở gói Free Tier).
- **Quản lý mã nguồn:** [GitHub](https://github.com).

---

## 2. Cài đặt & Chạy trên máy tính (Local)

### Yêu cầu hệ thống:
- Node.js version 22 trở lên (Đã xác minh tương thích Node v24.x)
- Trình quản lý gói `npm` hoặc `pnpm`

### Các lệnh điều khiển:
```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi động máy chủ phát triển (Dev server)
# Cách 1: Chạy nền (Background mode - Khuyên dùng theo AGENTS.md)
astro dev --background

# Kiểm tra trạng thái máy chủ
astro dev status

# Xem log hoạt động
astro dev logs

# Dừng máy chủ chạy nền
astro dev stop

# Cách 2: Chạy trực tiếp trên terminal
npm run dev

# 3. Biên dịch kiểm tra toàn bộ website (Production build)
npm run build
```

---

## 3. Khởi tạo Cơ sở dữ liệu Supabase

1. Truy cập [https://supabase.com](https://supabase.com) và đăng ký/đăng nhập tài khoản miễn phí.
2. Nhấn **New Project**, đặt tên dự án (ví dụ: `autotech-pro-db`), chọn khu vực đặt máy chủ gần nhất (ví dụ: `Singapore` - `ap-southeast-1`).
3. Sau khi dự án khởi tạo xong, vào mục **SQL Editor** ở thanh menu bên trái:
   - Mở file [`supabase/schema.sql`](supabase/schema.sql) trong mã nguồn, copy toàn bộ nội dung và dán vào SQL Editor rồi nhấn **Run**.
   - Tiếp tục mở file [`supabase/seed.sql`](supabase/seed.sql), copy và dán vào SQL Editor rồi nhấn **Run** để nạp dữ liệu mẫu ban đầu cho danh mục, hãng xe và dòng xe.
4. Lấy thông số kết nối:
   - Vào **Project Settings** -> **API**.
   - Copy **Project URL** và **anon public key**.
   - Tạo file `.env` tại thư mục gốc của dự án:
     ```env
     PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
     ```

---

## 4. Triển khai lên Cloudflare Pages (Chi phí 0đ)

1. Đẩy toàn bộ mã nguồn lên một Repository mới trên GitHub của bạn.
2. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com) -> Chọn mục **Compute (Workers & Pages)** -> **Create application** -> Chọn tab **Pages** -> **Connect to Git**.
3. Chọn Repository GitHub của dự án vừa tạo.
4. Cấu hình bản build (Build settings):
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Tại mục **Environment variables**, thêm 2 biến:
   - `PUBLIC_SUPABASE_URL` = (URL Supabase của bạn)
   - `PUBLIC_SUPABASE_ANON_KEY` = (Anon key Supabase của bạn)
6. Nhấn **Save and Deploy**. Website của bạn sẽ hoạt động trực tuyến với tên miền miễn phí dạng `https://[ten-du-an].pages.dev` có sẵn chứng chỉ bảo mật SSL/HTTPS.

---

## 5. Hướng dẫn Sử dụng Trang Quản Trị (/admin)

- Truy cập đường dẫn: `https://ten-mien-cua-ban.com/admin`
- Mật khẩu đăng nhập mặc định: **`admin123`** (hoặc email quản trị sau khi kết nối Supabase Auth).

### Các Module chức năng:
1. **Tổng Quan (Dashboard):** Xem nhanh thống kê số lượng sản phẩm, bài viết và danh mục đang hoạt động.
2. **Quản Lý Sản Phẩm:**
   - **Thêm sản phẩm mới:** Nhấn nút `+ Thêm Sản Phẩm Mới`, điền Tên, Mã SKU, Giá niêm yết, Giá khuyến mãi, Link ảnh và chọn danh mục.
   - **Cấu hình xe tương thích:** 
     - Nếu là món đồ phụ trợ dùng được cho mọi xe (tẩu sạc, nước hoa, gối tựa đầu, máy lọc không khí...): Tích chọn *"Sản phẩm phổ thông (Lắp được cho mọi xe)"*.
     - Nếu là sản phẩm chuyên biệt (Màn hình kèm mặt dưỡng, Camera 360 theo xe): Điền hãng xe tương thích.
   - **Sửa / Xóa sản phẩm:** Nhấn nút tương ứng ngay tại từng dòng trong bảng.
3. **Danh Mục:** Quản lý danh sách các nhóm sản phẩm (Màn Android, Bi LED, Âm thanh...).
4. **Hãng Xe & Dòng Xe:** Quản lý cơ sở dữ liệu các dòng xe thịnh hành tại Việt Nam (Toyota, Honda, Hyundai, Kia, Mazda, Ford, VinFast, Mitsubishi...).
5. **Bài Viết Tư Vấn:** Đăng tải các bài viết kinh nghiệm, so sánh sản phẩm để kéo khách hàng từ tìm kiếm Google.

---

## 6. Quản lý Thông tin Shop & Kênh Liên Hệ

> **LƯU Ý:** Bạn KHÔNG cần phải sửa bất kỳ dòng code nào khi đổi số điện thoại hay địa chỉ shop!

1. Đăng nhập vào `/admin` -> Chọn tab **Cài Đặt Cửa Hàng (Settings)**.
2. Tại đây bạn có thể cập nhật:
   - **Tên Cửa Hàng & Khẩu hiệu**
   - **Hotline Bán Hàng** (Tự động cập nhật vào nút Gọi ngay trên toàn bộ website)
   - **Số Zalo Kỹ Thuật** (Tự động cập nhật vào các nút Tư vấn Zalo, khách bấm là mở thẳng đoạn chat)
   - **Địa chỉ xưởng thi công**
   - **Link Google Maps dẫn đường**
   - **Giờ mở cửa phục vụ**
   - **Tiêu đề SEO & Mô tả SEO Google**
3. Nhấn **Lưu Thay Đổi Cài Đặt**. Website sẽ tự động nhận thông tin mới ngay lập tức.

---

## 7. Bảo trì, Backup & Phòng ngừa Ngủ đông Supabase

### A. Phòng ngừa Supabase Free Tier bị ngủ đông (Auto-pause sau 7 ngày):
- **Nguyên nhân:** Supabase Free Tier sẽ tạm dừng các dự án không có truy vấn trong vòng 7 ngày liên tục.
- **Giải pháp:** 
  1. Chỉ cần có lượt truy cập web hoặc thao tác trong Admin mỗi tuần là database tự động duy trì hoạt động.
  2. Hoặc thiết lập một dịch vụ ping miễn phí như [UptimeRobot](https://uptimerobot.com) hoặc [Cron-job.org](https://cron-job.org) để gọi định kỳ 3 ngày/lần vào trang web.

### B. Sao lưu dữ liệu (Backup):
- Vào Supabase Dashboard -> **Database** -> **Backups**.
- Hoặc vào mục **Table Editor**, chọn các bảng quan trọng (`products`, `shop_settings`, `posts`) -> Nhấn **Export to CSV** để lưu trữ một bản offline trên máy tính định kỳ hàng tháng.

---

## 8. Quy trình Bàn giao Quyền Sở hữu (Transfer Ownership)

Khi bàn giao dự án từ Developer cho Chủ Shop:
1. **GitHub Repository:**
   - Vào mục **Settings** của Repo -> **Collaborators** -> Thêm tài khoản GitHub của chủ shop với quyền Admin.
   - Hoặc chuyển hẳn repo sang tổ chức/tài khoản của chủ shop (**Settings** -> **Danger Zone** -> **Transfer ownership**).
2. **Supabase Project:**
   - Vào Supabase Dashboard -> **Project Settings** -> **Members** -> Mời email của chủ shop với vai trò `Owner`.
3. **Cloudflare Pages:**
   - Vào Cloudflare Dashboard -> **Manage Account** -> **Members** -> Mời email chủ shop vào quản lý.

*(Tài liệu được cập nhật tự động theo phiên bản phát hành mới nhất)*
