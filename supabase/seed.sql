-- ==============================================================================
-- INITIAL SEED DATA FOR AUTOTECH STORE
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO categories (name, slug, description, display_order) VALUES
('Màn hình Android', 'man-hinh-android', 'Màn hình cảm ứng Android tích hợp giải trí và trợ lý lái xe', 1),
('Android Box', 'android-box', 'Thiết bị biến màn hình zin thành màn Android qua cổng USB', 2),
('Camera 360 & Cam hành trình', 'camera-o-to', 'Hệ thống camera ghi hình và hỗ trợ quan sát điểm mù quanh xe', 3),
('Nâng cấp Ánh sáng (Bi LED/Laser)', 'do-den-o-to', 'Đèn bi LED và bi Laser tăng sáng chuẩn văn minh', 4),
('Âm thanh xe hơi (Loa/Sub/DSP)', 'am-thanh-xe-hoi', 'Nâng cấp loa cánh, loa sub gầm ghế và amply DSP', 5),
('Đèn LED nội thất (Ambient Light)', 'den-led-noi-that', 'Hệ thống viền LED đổi 64 màu đồng bộ âm nhạc', 6),
('Cảm biến áp suất lốp & Cảnh báo', 'cam-bien-o-to', 'Cảm biến van trong theo dõi áp suất và nhiệt độ lốp thời gian thực', 7),
('Phụ kiện & Thảm lót sàn cao cấp', 'phu-kien-xe-hoi', 'Phụ kiện tiện ích và thảm lót sàn ô tô chuẩn phom xe', 8)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED CAR BRANDS
INSERT INTO car_brands (name, slug) VALUES
('Toyota', 'toyota'),
('Honda', 'honda'),
('Hyundai', 'hyundai'),
('Kia', 'kia'),
('Mazda', 'mazda'),
('Ford', 'ford'),
('VinFast', 'vinfast'),
('Mitsubishi', 'mitsubishi')
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED CAR MODELS
DO $$
DECLARE
  v_toyota UUID;
  v_honda UUID;
  v_hyundai UUID;
  v_kia UUID;
  v_mazda UUID;
  v_ford UUID;
  v_vinfast UUID;
  v_mitsu UUID;
BEGIN
  SELECT id INTO v_toyota FROM car_brands WHERE slug = 'toyota';
  SELECT id INTO v_honda FROM car_brands WHERE slug = 'honda';
  SELECT id INTO v_hyundai FROM car_brands WHERE slug = 'hyundai';
  SELECT id INTO v_kia FROM car_brands WHERE slug = 'kia';
  SELECT id INTO v_mazda FROM car_brands WHERE slug = 'mazda';
  SELECT id INTO v_ford FROM car_brands WHERE slug = 'ford';
  SELECT id INTO v_vinfast FROM car_brands WHERE slug = 'vinfast';
  SELECT id INTO v_mitsu FROM car_brands WHERE slug = 'mitsubishi';

  -- Toyota models
  IF v_toyota IS NOT NULL THEN
    INSERT INTO car_models (brand_id, name, slug, year_from, year_to) VALUES
    (v_toyota, 'Vios', 'vios', 2014, 2024),
    (v_toyota, 'Camry', 'camry', 2012, 2024),
    (v_toyota, 'Corolla Cross', 'corolla-cross', 2020, 2024),
    (v_toyota, 'Fortuner', 'fortuner', 2012, 2024),
    (v_toyota, 'Veloz Cross', 'veloz', 2022, 2024)
    ON CONFLICT (brand_id, slug) DO NOTHING;
  END IF;

  -- Honda models
  IF v_honda IS NOT NULL THEN
    INSERT INTO car_models (brand_id, name, slug, year_from, year_to) VALUES
    (v_honda, 'City', 'city', 2014, 2024),
    (v_honda, 'Civic', 'civic', 2016, 2024),
    (v_honda, 'CR-V', 'cr-v', 2013, 2024)
    ON CONFLICT (brand_id, slug) DO NOTHING;
  END IF;

  -- Hyundai models
  IF v_hyundai IS NOT NULL THEN
    INSERT INTO car_models (brand_id, name, slug, year_from, year_to) VALUES
    (v_hyundai, 'Accent', 'accent', 2018, 2024),
    (v_hyundai, 'Tucson', 'tucson', 2016, 2024),
    (v_hyundai, 'SantaFe', 'santafe', 2015, 2024),
    (v_hyundai, 'Creta', 'creta', 2022, 2024)
    ON CONFLICT (brand_id, slug) DO NOTHING;
  END IF;

  -- Mitsubishi models
  IF v_mitsu IS NOT NULL THEN
    INSERT INTO car_models (brand_id, name, slug, year_from, year_to) VALUES
    (v_mitsu, 'Xpander', 'xpander', 2018, 2024),
    (v_mitsu, 'Xforce', 'xforce', 2024, NULL)
    ON CONFLICT (brand_id, slug) DO NOTHING;
  END IF;
END $$;
