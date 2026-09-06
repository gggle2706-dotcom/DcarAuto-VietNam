-- ==============================================================================
-- DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) FOR AUTOTECH STORE
-- Tương thích: Supabase PostgreSQL (Free Tier)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE product_status AS ENUM ('active', 'draft', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE post_status AS ENUM ('published', 'draft', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. BẢNG CẤU HÌNH CỬA HÀNG (SHOP_SETTINGS - SINGLE ROW)
CREATE TABLE IF NOT EXISTS shop_settings (
    id INT PRIMARY KEY DEFAULT 1,
    shop_name TEXT NOT NULL DEFAULT 'AutoTech Pro',
    shop_tagline TEXT DEFAULT 'Nội Thất & Đồ Chơi Công Nghệ Ô Tô',
    phone TEXT NOT NULL DEFAULT '0988.123.456',
    hotline TEXT DEFAULT '0988.123.456',
    zalo TEXT NOT NULL DEFAULT '0988123456',
    email TEXT DEFAULT 'lienhe@autotechpro.vn',
    address TEXT NOT NULL DEFAULT 'Số 88 Đường Lê Quang Đạo, Nam Từ Liêm, Hà Nội',
    facebook_url TEXT DEFAULT 'https://facebook.com',
    messenger_url TEXT DEFAULT 'https://m.me',
    google_maps_url TEXT DEFAULT 'https://maps.google.com',
    operating_hours TEXT DEFAULT '08:00 - 18:30 (Cả tuần)',
    logo_url TEXT,
    banner_url TEXT,
    seo_title TEXT DEFAULT 'AutoTech Pro - Chuyên Nội Thất & Đồ Chơi Công Nghệ Ô Tô',
    seo_description TEXT DEFAULT 'Trung tâm nâng cấp đồ chơi ô tô chuyên nghiệp. Cắm giắc zin 100%, bảo hành chính hãng.',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Khởi tạo dòng cài đặt mặc định nếu chưa có
INSERT INTO shop_settings (id, shop_name, phone, zalo, address)
VALUES (1, 'AutoTech Pro', '0988.123.456', '0988123456', 'Số 88 Đường Lê Quang Đạo, Nam Từ Liêm, Hà Nội')
ON CONFLICT (id) DO NOTHING;

-- 4. BẢNG DANH MỤC SẢN PHẨM (CATEGORIES)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BẢNG HÃNG XE (CAR_BRANDS)
CREATE TABLE IF NOT EXISTS car_brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG DÒNG XE (CAR_MODELS)
CREATE TABLE IF NOT EXISTS car_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES car_brands(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    year_from INT NOT NULL DEFAULT 2010,
    year_to INT, -- NULL nghĩa là sản xuất đến hiện tại
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brand_id, slug)
);

-- 7. BẢNG SẢN PHẨM (PRODUCTS)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    price BIGINT NOT NULL DEFAULT 0,
    sale_price BIGINT,
    status product_status DEFAULT 'active',
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    video_url TEXT,
    description TEXT,
    specifications JSONB DEFAULT '{}'::JSONB,
    warranty_months INT DEFAULT 24,
    is_universal BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BẢNG TRUNG GIAN TƯƠNG THÍCH XE (PRODUCT_CARS)
CREATE TABLE IF NOT EXISTS product_cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    car_model_id UUID NOT NULL REFERENCES car_models(id) ON DELETE CASCADE,
    note TEXT, -- Ví dụ: "Kèm mặt dưỡng 9 inch", "Cần Canbus giải mã Amply zin"
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, car_model_id)
);

-- 9. BẢNG BÀI VIẾT (POSTS)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'Tư vấn',
    author TEXT DEFAULT 'Kỹ thuật viên',
    image TEXT,
    status post_status DEFAULT 'published',
    related_product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BẢNG PHÂN QUYỀN ADMIN (PROFILES LIÊN KẾT SUPABASE AUTH)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Bật RLS trên toàn bộ các bảng
ALTER TABLE shop_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 1. Chính sách ĐỌC CÔNG KHAI (Public Read)
CREATE POLICY "Public Read Shop Settings" ON shop_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Car Brands" ON car_brands FOR SELECT USING (true);
CREATE POLICY "Public Read Car Models" ON car_models FOR SELECT USING (true);
CREATE POLICY "Public Read Active Products" ON products FOR SELECT USING (visible = true AND status = 'active');
CREATE POLICY "Public Read Product Cars" ON product_cars FOR SELECT USING (true);
CREATE POLICY "Public Read Published Posts" ON posts FOR SELECT USING (status = 'published');

-- 2. Chính sách TOÀN QUYỀN CHO ADMIN (CRUD)
-- Function kiểm tra role admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Quyền Admin cho các bảng
CREATE POLICY "Admin All Shop Settings" ON shop_settings FOR ALL USING (is_admin());
CREATE POLICY "Admin All Categories" ON categories FOR ALL USING (is_admin());
CREATE POLICY "Admin All Car Brands" ON car_brands FOR ALL USING (is_admin());
CREATE POLICY "Admin All Car Models" ON car_models FOR ALL USING (is_admin());
CREATE POLICY "Admin All Products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admin All Product Cars" ON product_cars FOR ALL USING (is_admin());
CREATE POLICY "Admin All Posts" ON posts FOR ALL USING (is_admin());
CREATE POLICY "Admin Read Profiles" ON profiles FOR SELECT USING (auth.uid() = id);

-- ==============================================================================
-- TRIGGER AUTO-UPDATE `updated_at`
-- ==============================================================================
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_shop_settings BEFORE UPDATE ON shop_settings FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_categories BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_posts BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
