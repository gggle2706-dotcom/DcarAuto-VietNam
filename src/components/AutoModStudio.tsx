import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PRODUCTS, type MockProduct } from '@/lib/mock-products';
import { ACCESSORIES_DATA, type AccessoryItem } from '@/lib/accessories-data';
import { DEFAULT_SHOP_SETTINGS, CATEGORIES_LIST } from '@/lib/constants';

const CAR_DATABASE: Record<string, { name: string; models: { id: string; name: string; years: string }[] }> = {
  toyota: {
    name: 'Toyota',
    models: [
      { id: 'vios', name: 'Vios', years: '2014 - 2025' },
      { id: 'camry', name: 'Camry', years: '2012 - 2025' },
      { id: 'corolla-cross', name: 'Corolla Cross', years: '2020 - 2025' },
      { id: 'fortuner', name: 'Fortuner', years: '2012 - 2025' },
      { id: 'veloz', name: 'Veloz Cross', years: '2022 - 2025' },
      { id: 'innova', name: 'Innova / Cross', years: '2016 - 2025' },
      { id: 'raize', name: 'Raize', years: '2021 - 2025' },
      { id: 'yaris-cross', name: 'Yaris Cross', years: '2023 - 2025' },
    ],
  },
  honda: {
    name: 'Honda',
    models: [
      { id: 'city', name: 'City', years: '2014 - 2025' },
      { id: 'civic', name: 'Civic', years: '2016 - 2025' },
      { id: 'cr-v', name: 'CR-V', years: '2013 - 2025' },
      { id: 'hr-v', name: 'HR-V', years: '2018 - 2025' },
      { id: 'br-v', name: 'BR-V', years: '2023 - 2025' },
    ],
  },
  hyundai: {
    name: 'Hyundai',
    models: [
      { id: 'accent', name: 'Accent', years: '2018 - 2025' },
      { id: 'tucson', name: 'Tucson', years: '2016 - 2025' },
      { id: 'santafe', name: 'SantaFe', years: '2015 - 2025' },
      { id: 'creta', name: 'Creta', years: '2022 - 2025' },
      { id: 'custin', name: 'Custin', years: '2023 - 2025' },
      { id: 'elantra', name: 'Elantra', years: '2016 - 2025' },
      { id: 'stargazer', name: 'Stargazer', years: '2022 - 2025' },
    ],
  },
  kia: {
    name: 'Kia',
    models: [
      { id: 'seltos', name: 'Seltos', years: '2020 - 2025' },
      { id: 'k3-cerato', name: 'K3 / Cerato', years: '2016 - 2025' },
      { id: 'carnival', name: 'Carnival / Sedona', years: '2016 - 2025' },
      { id: 'sonet', name: 'Sonet', years: '2021 - 2025' },
      { id: 'sportage', name: 'Sportage', years: '2022 - 2025' },
      { id: 'sorento', name: 'Sorento', years: '2018 - 2025' },
    ],
  },
  ford: {
    name: 'Ford',
    models: [
      { id: 'ranger', name: 'Ranger', years: '2015 - 2025' },
      { id: 'everest', name: 'Everest', years: '2016 - 2025' },
      { id: 'territory', name: 'Territory', years: '2022 - 2025' },
      { id: 'raptor', name: 'Ranger Raptor', years: '2018 - 2025' },
    ],
  },
  vinfast: {
    name: 'VinFast',
    models: [
      { id: 'vf-3', name: 'VF 3', years: '2024 - 2025' },
      { id: 'vf-5', name: 'VF 5', years: '2023 - 2025' },
      { id: 'vf-6', name: 'VF 6', years: '2023 - 2025' },
      { id: 'vf-7', name: 'VF 7', years: '2024 - 2025' },
      { id: 'vf-8', name: 'VF 8', years: '2022 - 2025' },
      { id: 'fadil', name: 'Fadil', years: '2019 - 2023' },
    ],
  },
  mitsubishi: {
    name: 'Mitsubishi',
    models: [
      { id: 'xpander', name: 'Xpander / Cross', years: '2018 - 2025' },
      { id: 'xforce', name: 'Xforce', years: '2024 - 2025' },
      { id: 'outlander', name: 'Outlander', years: '2016 - 2025' },
      { id: 'triton', name: 'Triton', years: '2018 - 2025' },
    ],
  },
  mazda: {
    name: 'Mazda',
    models: [
      { id: 'mazda-3', name: 'Mazda 3', years: '2015 - 2025' },
      { id: 'cx-5', name: 'CX-5', years: '2013 - 2025' },
      { id: 'cx-8', name: 'CX-8', years: '2019 - 2025' },
      { id: 'cx-30', name: 'CX-30', years: '2021 - 2025' },
    ],
  },
};

interface SelectedMainItem {
  product: MockProduct;
  quantity: number;
}

interface SelectedAccessoryItem {
  accessory: AccessoryItem;
  quantity: number;
}

export default function AutoModStudio() {
  // 1. Quản lý trạng thái xe
  const [selectedBrand, setSelectedBrand] = useState<string>('toyota');
  const [selectedModel, setSelectedModel] = useState<string>('vios');
  const [selectedYear, setSelectedYear] = useState<string>('2022');

  // 2. Danh mục & tìm kiếm Cột 1
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3. Danh sách các món đã chọn
  const [selectedGears, setSelectedGears] = useState<SelectedMainItem[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessoryItem[]>([]);

  // 4. Ghi chú của khách trong Cột 3
  const [customNote, setCustomNote] = useState<string>('');

  // 5. Mobile Tab switcher (1: Thiết bị, 2: Giắc/Linh kiện, 3: Inbox Zalo)
  const [activeMobileTab, setActiveMobileTab] = useState<'gears' | 'accessories' | 'inbox'>('gears');

  // Khởi tạo một số món mẫu và đọc query parameter từ URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const cat = p.get('category');
      if (cat) setActiveCategory(cat);
      const b = (p.get('brand') || '').toLowerCase();
      const m = (p.get('model') || '').toLowerCase();
      const y = p.get('year') || '';
      if (b && CAR_DATABASE[b]) {
        setSelectedBrand(b);
        if (m) setSelectedModel(m);
        if (y) setSelectedYear(y);
      }
    }

    const defaultGear = MOCK_PRODUCTS.find((p) => p.slug === 'man-hinh-android-zestech-zx10-tieu-chuan') || MOCK_PRODUCTS[0];
    if (defaultGear) {
      setSelectedGears([{ product: defaultGear, quantity: 1 }]);
    }
    const defaultMatDuong = ACCESSORIES_DATA.find((a) => a.id === 'acc-mat-duong');
    const defaultGiacZin = ACCESSORIES_DATA.find((a) => a.id === 'acc-giac-nguon-zin');
    const initialAccs: SelectedAccessoryItem[] = [];
    if (defaultMatDuong) initialAccs.push({ accessory: defaultMatDuong, quantity: 1 });
    if (defaultGiacZin) initialAccs.push({ accessory: defaultGiacZin, quantity: 1 });
    setSelectedAccessories(initialAccs);
  }, []);

  // Lấy tên xe đầy đủ
  const carBrandObj = CAR_DATABASE[selectedBrand];
  const carModelObj = carBrandObj?.models.find((m) => m.id === selectedModel);
  const fullCarName = useMemo(() => {
    if (!carBrandObj) return 'Xe ô tô phổ thông';
    const brandName = carBrandObj.name;
    const modelName = carModelObj?.name || '';
    return `${brandName} ${modelName} ${selectedYear ? `(${selectedYear})` : ''}`.trim();
  }, [carBrandObj, carModelObj, selectedYear]);

  // Cột 1: Lọc thiết bị chính
  const filteredMainProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      if (activeCategory !== 'all' && prod.categorySlug !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchBrand = prod.brand.toLowerCase().includes(q);
        if (!matchName && !matchBrand) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Cột 2: Danh sách danh mục chính đang được chọn (để gợi ý linh kiện phù hợp)
  const activeSelectedCategorySlugs = useMemo(() => {
    return Array.from(new Set(selectedGears.map((g) => g.product.categorySlug)));
  }, [selectedGears]);

  // Cột 2: Sắp xếp các linh kiện liên quan lên trước
  const prioritizedAccessories = useMemo(() => {
    return [...ACCESSORIES_DATA].sort((a, b) => {
      const aMatch = a.applicableCategorySlugs.some((slug) => activeSelectedCategorySlugs.includes(slug));
      const bMatch = b.applicableCategorySlugs.some((slug) => activeSelectedCategorySlugs.includes(slug));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [activeSelectedCategorySlugs]);

  // Thao tác với Cột 1 (Thiết bị)
  const toggleGear = (product: MockProduct) => {
    setSelectedGears((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // Thao tác với Cột 2 (Phụ kiện)
  const toggleAccessory = (accessory: AccessoryItem) => {
    setSelectedAccessories((prev) => {
      const exists = prev.find((item) => item.accessory.id === accessory.id);
      if (exists) {
        return prev.filter((item) => item.accessory.id !== accessory.id);
      } else {
        return [...prev, { accessory, quantity: 1 }];
      }
    });
  };

  // Xóa món khỏi Cột 3
  const removeGear = (id: string) => {
    setSelectedGears((prev) => prev.filter((item) => item.product.id !== id));
  };
  const removeAccessory = (id: string) => {
    setSelectedAccessories((prev) => prev.filter((item) => item.accessory.id !== id));
  };

  // Tính tổng chi phí tạm tính
  const totalPrice = useMemo(() => {
    const gearTotal = selectedGears.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
    const accTotal = selectedAccessories.reduce((sum, item) => {
      return sum + item.accessory.price * item.quantity;
    }, 0);
    return gearTotal + accTotal;
  }, [selectedGears, selectedAccessories]);

  // Tổng số lượng món đã chọn
  const totalItemsCount = selectedGears.length + selectedAccessories.length;

  // Tạo nội dung tin nhắn Zalo tự động
  const zaloMessage = useMemo(() => {
    let msg = `Xin chào Dcar Auto, tôi muốn tư vấn & nhận báo giá gói độ xe:\n`;
    msg += `🚗 Dòng xe của tôi: ${fullCarName}\n\n`;
    msg += `📦 CÁC THIẾT BỊ ĐÃ CHỌN:\n`;

    if (selectedGears.length > 0) {
      selectedGears.forEach((item, idx) => {
        const p = item.product.salePrice || item.product.price;
        msg += `${idx + 1}. ${item.product.name} (${p.toLocaleString('vi-VN')} đ)\n`;
      });
    } else {
      msg += `(Chưa chọn thiết bị chính)\n`;
    }

    if (selectedAccessories.length > 0) {
      msg += `\n🔌 GIẮC ZIN & PHỤ KIỆN KÈM THEO:\n`;
      selectedAccessories.forEach((item, idx) => {
        msg += `- ${item.accessory.name} (${item.accessory.price.toLocaleString('vi-VN')} đ)\n`;
      });
    }

    msg += `\n💰 TỔNG TẠM TÍNH: ${totalPrice.toLocaleString('vi-VN')} đ\n`;
    if (customNote.trim()) {
      msg += `💬 Yêu cầu thêm: ${customNote.trim()}\n`;
    }
    msg += `\nNhờ kỹ thuật viên kiểm tra giắc zin và báo giá thi công trọn gói cho tôi nhé!`;
    return msg;
  }, [fullCarName, selectedGears, selectedAccessories, totalPrice, customNote]);

  const cleanZaloPhone = DEFAULT_SHOP_SETTINGS.zalo.replace(/[^0-9]/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(zaloMessage)}`;

  return (
    <div className="w-full bg-slate-900 text-slate-100 py-6 sm:py-8 px-3 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* THANH ĐIỀU HƯỚNG CHỌN XE (TOP BAR) */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  Dcar Auto Studio • Cấu Hình Trực Tiếp
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Tự Phối Bộ Đồ Chơi & Giắc Cắm Zin Theo Đời Xe
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Chọn xe để hệ thống tự động đối chiếu mặt dưỡng taplo zin và cục giải mã Canbus tương thích 100%.
              </p>
            </div>

            {/* Ô chọn Hãng - Dòng - Năm xe */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              {/* Chọn Hãng */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">1. Hãng xe</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    const b = e.target.value;
                    setSelectedBrand(b);
                    const firstModel = CAR_DATABASE[b]?.models[0]?.id || '';
                    setSelectedModel(firstModel);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {Object.entries(CAR_DATABASE).map(([key, car]) => (
                    <option key={key} value={key}>
                      {car.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn Dòng xe */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">2. Dòng xe</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {carBrandObj?.models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chọn Đời xe */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">3. Đời xe (Năm)</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-red-500 cursor-pointer"
                >
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                    <option key={y} value={y.toString()}>
                      Năm {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* NÚT CHUYỂN TAB TRÊN MOBILE & TABLET */}
        <div className="lg:hidden flex items-center gap-1.5 mb-4 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700 sticky top-16 z-30 shadow-md">
          <button
            onClick={() => setActiveMobileTab('gears')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeMobileTab === 'gears'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Thiết Bị ({selectedGears.length})
          </button>
          <button
            onClick={() => setActiveMobileTab('accessories')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeMobileTab === 'accessories'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Giắc & Dưỡng ({selectedAccessories.length})
          </button>
          <button
            onClick={() => setActiveMobileTab('inbox')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${
              activeMobileTab === 'inbox'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-400 hover:text-white'
            }`}
          >
            <span>3. Inbox Zalo</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>

        {/* BỐ CỤC 3 CỘT (DESKTOP GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* =========================================================================
              CỘT 1: KHO THIẾT BỊ CHÍNH (Chiếm 4/12 cột ~ 35%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex flex-col h-[750px] shadow-lg ${
              activeMobileTab === 'gears' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 1 */}
            <div className="pb-3 border-b border-slate-700 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 font-black flex items-center justify-center text-sm border border-red-500/30">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                      Kho Thiết Bị Chính
                    </h2>
                    <span className="text-[11px] text-slate-400">Chọn màn hình, camera, bi LED, loa sub</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  {filteredMainProducts.length} món
                </span>
              </div>

              {/* Ô tìm kiếm thiết bị */}
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Tìm tên hoặc mã thiết bị..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Tabs lọc loại thiết bị */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none mt-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold shrink-0 transition ${
                    activeCategory === 'all'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả
                </button>
                {CATEGORIES_LIST.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium shrink-0 transition ${
                      activeCategory === cat.slug
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách thẻ thiết bị Cột 1 (Có cuộn riêng) */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {filteredMainProducts.map((prod) => {
                const isSelected = selectedGears.some((item) => item.product.id === prod.id);
                const currentPrice = prod.salePrice || prod.price;
                const hasDiscount = Boolean(prod.salePrice && prod.salePrice < prod.price);

                return (
                  <div
                    key={prod.id}
                    className={`p-3 rounded-xl border transition flex gap-3 group relative ${
                      isSelected
                        ? 'bg-slate-900 border-red-500 shadow-md ring-1 ring-red-500/50'
                        : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-600 hover:bg-slate-900/90'
                    }`}
                  >
                    {/* Ảnh sản phẩm */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                      {hasDiscount && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-600 text-white">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Nội dung sản phẩm */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                          <span className="font-bold text-slate-300 uppercase">{prod.brand}</span>
                          <span className="truncate max-w-[100px]">{prod.categoryName}</span>
                        </div>
                        <h3 className="font-bold text-xs text-white line-clamp-2 leading-snug group-hover:text-red-400 transition">
                          {prod.name}
                        </h3>
                        {prod.specs && prod.specs.length > 0 && (
                          <div className="text-[10px] text-slate-400 truncate mt-1">
                            • {prod.specs[0]}
                          </div>
                        )}
                      </div>

                      {/* Giá và nút chọn */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2">
                        <div>
                          <div className="text-xs font-black text-red-400">
                            {currentPrice.toLocaleString('vi-VN')} đ
                          </div>
                          {hasDiscount && (
                            <div className="text-[10px] text-slate-500 line-through">
                              {prod.price.toLocaleString('vi-VN')} đ
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleGear(prod)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <span>✓</span>
                              <span>Đã chọn</span>
                            </>
                          ) : (
                            <>
                              <span>+</span>
                              <span>Chọn món này</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              CỘT 2: GIẮC ZIN & PHỤ KIỆN LẮP ĐẶT (Chiếm 4/12 cột ~ 30%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 flex flex-col h-[750px] shadow-lg ${
              activeMobileTab === 'accessories' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 2 */}
            <div className="pb-3 border-b border-slate-700 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 font-black flex items-center justify-center text-sm border border-blue-500/30">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                      Giắc Zin & Mặt Dưỡng
                    </h2>
                    <span className="text-[11px] text-slate-400">
                      Cam kết cắm giắc zin 100% không cắt dây
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  {selectedAccessories.length} đã chọn
                </span>
              </div>

              {/* Thông báo tương thích thông minh theo xe */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                <span className="text-base">🚗</span>
                <div className="leading-snug">
                  Đang tùy biến cho: <strong className="text-white">{fullCarName}</strong>. Linh kiện đã được lọc đúng chuẩn chân giắc xe này.
                </div>
              </div>
            </div>

            {/* Danh sách linh kiện & giắc zin */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {prioritizedAccessories.map((acc) => {
                const isSelected = selectedAccessories.some((item) => item.accessory.id === acc.id);
                const isMatchedWithGear = acc.applicableCategorySlugs.some((slug) =>
                  activeSelectedCategorySlugs.includes(slug)
                );

                // Nếu là mặt dưỡng, tự động gắn tên xe của khách vào
                const displayName =
                  acc.id === 'acc-mat-duong'
                    ? `Mặt Dưỡng Chuẩn Zin Theo Xe ${fullCarName}`
                    : acc.name;

                return (
                  <div
                    key={acc.id}
                    className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500/50'
                        : isMatchedWithGear
                        ? 'bg-slate-900/80 border-blue-500/40 hover:border-blue-400'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-bold text-blue-400">{acc.categoryName}</span>
                        {isMatchedWithGear && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-900/50 text-blue-300 border border-blue-700/60">
                            ★ Khuyên dùng cho gói này
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs text-white leading-snug">{displayName}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{acc.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
                      <span className="text-xs font-black text-blue-400">
                        {acc.price.toLocaleString('vi-VN')} đ
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleAccessory(acc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-slate-800 hover:bg-blue-600 text-white border border-slate-700 hover:border-blue-500'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <span>✓</span>
                            <span>Đã thêm</span>
                          </>
                        ) : (
                          <>
                            <span>+</span>
                            <span>Thêm giắc này</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              CỘT 3: INBOX QUA ZALO KỸ THUẬT VIÊN (Chiếm 4/12 cột ~ 35%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-blue-500/70 rounded-2xl p-4 flex flex-col h-[750px] shadow-2xl relative ${
              activeMobileTab === 'inbox' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 3: Khung Inbox Kỹ Thuật Viên */}
            <div className="pb-3 border-b border-slate-700 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
                      DC
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-extrabold text-white">Inbox Zalo Kỹ Thuật</h2>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                        Online
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Tư vấn chuẩn giắc zin 24/7 • Hotline: {DEFAULT_SHOP_SETTINGS.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thông tin dòng xe đã chọn */}
              <div className="mt-3 p-2 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400">Xe của bạn:</span>
                <span className="font-bold text-white">{fullCarName}</span>
              </div>
            </div>

            {/* Nội dung danh sách món đã chọn (Cuộn được) */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              <div className="font-bold text-slate-300 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Cấu hình bạn đang chọn ({totalItemsCount} món):</span>
                {totalItemsCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGears([]);
                      setSelectedAccessories([]);
                    }}
                    className="text-[10px] text-red-400 hover:underline cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {totalItemsCount === 0 ? (
                <div className="py-8 text-center text-slate-500 bg-slate-950/40 rounded-xl border border-dashed border-slate-800 p-4">
                  <span className="text-3xl block mb-2">📋</span>
                  Bạn chưa chọn món nào. Hãy bấm <strong>[+ Chọn]</strong> ở Cột 1 và Cột 2 để phối bộ nâng cấp cho xe.
                </div>
              ) : (
                <>
                  {/* Thiết bị chính */}
                  {selectedGears.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white text-xs truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[10px] text-red-400 font-semibold">
                          {(item.product.salePrice || item.product.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGear(item.product.id)}
                        className="text-slate-500 hover:text-red-400 p-1 text-xs cursor-pointer"
                        title="Xóa món này"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Giắc zin & Phụ kiện */}
                  {selectedAccessories.map((item) => (
                    <div
                      key={item.accessory.id}
                      className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-200 text-xs truncate">
                          🔌 {item.accessory.id === 'acc-mat-duong' ? `Mặt Dưỡng Zin ${fullCarName}` : item.accessory.name}
                        </div>
                        <div className="text-[10px] text-blue-400 font-semibold">
                          {item.accessory.price.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAccessory(item.accessory.id)}
                        className="text-slate-500 hover:text-red-400 p-1 text-xs cursor-pointer"
                        title="Xóa món này"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </>
              )}

              {/* Ô gõ ghi chú thêm cho Kỹ thuật viên */}
              <div className="pt-2">
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Ghi chú riêng / Câu hỏi cho Kỹ thuật viên (tùy chọn):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Xe bản số tự động, có lắp tại nhà không shop?..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phần Chốt Đơn & Gửi Zalo (Cố định ở đáy Cột 3) */}
            <div className="pt-3 border-t border-slate-700/80 mt-3">
              {/* Tổng tiền tạm tính */}
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-slate-300 font-medium">Tổng tiền dự toán:</span>
                <span className="text-lg font-black text-red-400">
                  {totalPrice.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Nút to: CHAT & GỬI CẤU HÌNH QUA ZALO NGAY */}
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.22-1.31C8.6 21.48 10.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
                <span>GỬI CẤU HÌNH & CHAT QUA ZALO NGAY</span>
              </a>

              {/* Thông tin phụ trợ & Hotline */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Zalo: <strong className="text-white">{DEFAULT_SHOP_SETTINGS.zalo}</strong></span>
                <a
                  href={`tel:${cleanZaloPhone}`}
                  className="text-red-400 hover:underline font-bold"
                >
                  Gọi Hotline ngay 📞
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
