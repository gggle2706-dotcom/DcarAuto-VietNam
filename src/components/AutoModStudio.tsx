import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PRODUCTS, type MockProduct } from '@/lib/mock-products';
import { ACCESSORIES_DATA, type AccessoryItem } from '@/lib/accessories-data';
import { DEFAULT_SHOP_SETTINGS, CATEGORIES_LIST } from '@/lib/constants';

interface SelectedMainItem {
  product: MockProduct;
  quantity: number;
}

interface SelectedAccessoryItem {
  accessory: AccessoryItem;
  quantity: number;
}

// Danh mục phụ kiện lọc cho Cột 2
const ACCESSORY_CATEGORIES = [
  { id: 'all', name: 'Tất cả linh kiện' },
  { id: 'mat-duong', name: 'Mặt dưỡng taplo' },
  { id: 'canbus', name: 'Canbus giải mã' },
  { id: 'giac-nguon', name: 'Giắc nguồn zin' },
  { id: 'pat-den', name: 'Pát Bi LED' },
  { id: 'day-dien', name: 'Dây sub & relay' },
  { id: 'phu-kien-khac', name: 'Phụ kiện camera & LED' },
];

export default function AutoModStudio() {
  // 1. Dòng xe khách tự nhập (tùy chọn)
  const [carInput, setCarInput] = useState<string>('');

  // 2. Danh mục & tìm kiếm Cột 1 (Thiết bị chính)
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3. Danh mục lọc Cột 2 (Giắc & Phụ kiện)
  const [activeAccCategory, setActiveAccCategory] = useState<string>('all');

  // 4. Danh sách các món đã chọn
  const [selectedGears, setSelectedGears] = useState<SelectedMainItem[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<SelectedAccessoryItem[]>([]);

  // 5. Ghi chú câu hỏi của khách cho thợ
  const [customNote, setCustomNote] = useState<string>('');

  // 6. Mobile Tab switcher (1: Thiết bị, 2: Giắc/Linh kiện, 3: Inbox Zalo)
  const [activeMobileTab, setActiveMobileTab] = useState<'gears' | 'accessories' | 'inbox'>('gears');

  // Khởi tạo món mặc định và đọc tham số URL nếu có
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const cat = p.get('category');
      if (cat) setActiveCategory(cat);
      const q = p.get('q');
      if (q) setSearchQuery(q);
      const car = p.get('car') || p.get('model');
      if (car) setCarInput(car);
    }

    // Chọn sẵn 1 màn hình và phụ kiện mẫu để giao diện sinh động khi mở lên
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

  // Danh mục thiết bị chính đang được chọn
  const activeSelectedCategorySlugs = useMemo(() => {
    return Array.from(new Set(selectedGears.map((g) => g.product.categorySlug)));
  }, [selectedGears]);

  // Cột 2: Lọc và sắp xếp phụ kiện
  const filteredAccessories = useMemo(() => {
    return ACCESSORIES_DATA.filter((acc) => {
      if (activeAccCategory !== 'all' && acc.category !== activeAccCategory) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      const aMatch = a.applicableCategorySlugs.some((slug) => activeSelectedCategorySlugs.includes(slug));
      const bMatch = b.applicableCategorySlugs.some((slug) => activeSelectedCategorySlugs.includes(slug));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [activeAccCategory, activeSelectedCategorySlugs]);

  // Thao tác với Cột 1
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

  // Thao tác với Cột 2
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

  // Xóa món
  const removeGear = (id: string) => {
    setSelectedGears((prev) => prev.filter((item) => item.product.id !== id));
  };
  const removeAccessory = (id: string) => {
    setSelectedAccessories((prev) => prev.filter((item) => item.accessory.id !== id));
  };

  // Tính tổng tiền tạm tính
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

  const totalItemsCount = selectedGears.length + selectedAccessories.length;

  // Tạo nội dung gửi Zalo
  const zaloMessage = useMemo(() => {
    let msg = `Xin chào Dcar Auto, tôi muốn tư vấn & nhận báo giá gói độ xe:\n`;
    if (carInput.trim()) {
      msg += `🚗 Xe của tôi: ${carInput.trim()}\n\n`;
    } else {
      msg += `🚗 Dòng xe: (Chưa cung cấp tên xe, nhờ shop tư vấn theo xe của tôi)\n\n`;
    }

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
      selectedAccessories.forEach((item) => {
        msg += `- ${item.accessory.name} (${item.accessory.price.toLocaleString('vi-VN')} đ)\n`;
      });
    }

    msg += `\n💰 TỔNG TẠM TÍNH: ${totalPrice.toLocaleString('vi-VN')} đ\n`;
    if (customNote.trim()) {
      msg += `💬 Câu hỏi / Yêu cầu thêm: ${customNote.trim()}\n`;
    }
    msg += `\nNhờ kỹ thuật viên kiểm tra giắc zin chuẩn form xe và báo giá thi công trọn gói cho tôi nhé!`;
    return msg;
  }, [carInput, selectedGears, selectedAccessories, totalPrice, customNote]);

  const cleanZaloPhone = DEFAULT_SHOP_SETTINGS.zalo.replace(/[^0-9]/g, '');
  const zaloUrl = `https://zalo.me/${cleanZaloPhone}?text=${encodeURIComponent(zaloMessage)}`;

  return (
    <div className="w-full bg-slate-100/70 text-slate-800 py-6 sm:py-8 px-3 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* =========================================================================
            STUDIO HEADER BANNER SÁNG SỦA, TINH TẾ
        ========================================================================== */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span className="text-xs font-black text-red-600 uppercase tracking-wider">
                Dcar Auto Studio • Phối Đồ & Cấu Hình Trực Tiếp
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              Trung Tâm Tự Phối Thiết Bị & Giắc Cắm Zin Ô Tô
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tự chọn thiết bị chính, linh kiện kết nối và gửi trực tiếp qua Zalo để Kỹ thuật viên kiểm tra chuẩn form xe và báo giá trọn gói.
            </p>
          </div>

          {/* Các cam kết nhanh dạng pill nổi bật */}
          <div className="flex flex-wrap items-center gap-2 text-xs shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1.5">
              <span>✓</span>
              <span>100% Cắm Giắc Zin</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-bold border border-blue-200 flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Giữ Bảo Hành Hãng</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-bold border border-amber-200 flex items-center gap-1.5">
              <span>⏱️</span>
              <span>Báo Giá Zalo Sau 2 Phút</span>
            </span>
          </div>
        </div>

        {/* NÚT CHUYỂN TAB TRÊN MOBILE & TABLET */}
        <div className="lg:hidden flex items-center gap-1.5 mb-4 bg-white p-1.5 rounded-xl border border-slate-200 sticky top-16 z-30 shadow-sm">
          <button
            onClick={() => setActiveMobileTab('gears')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeMobileTab === 'gears'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Thiết Bị ({selectedGears.length})
          </button>
          <button
            onClick={() => setActiveMobileTab('accessories')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeMobileTab === 'accessories'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Giắc & Dưỡng ({selectedAccessories.length})
          </button>
          <button
            onClick={() => setActiveMobileTab('inbox')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1 ${
              activeMobileTab === 'inbox'
                ? 'bg-[#0068FF] text-white shadow-xs'
                : 'text-[#0068FF] hover:bg-blue-50'
            }`}
          >
            <span>3. Inbox Zalo</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

        {/* =========================================================================
            BỐ CỤC 3 CỘT SÁNG SỦA, SẮC NÉT (DESKTOP GRID)
        ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* =========================================================================
              CỘT 1: KHO THIẾT BỊ CHÍNH (Chiếm 4/12 cột ~ 35%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-2xl p-4 flex flex-col h-[760px] shadow-sm hover:shadow-md transition ${
              activeMobileTab === 'gears' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 1 */}
            <div className="pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                    1
                  </span>
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Kho Thiết Bị Nâng Cấp
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium">Màn hình, camera 360, bi LED, loa sub</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {filteredMainProducts.length} món
                </span>
              </div>

              {/* Ô tìm kiếm thiết bị */}
              <div className="mt-3 relative">
                <input
                  type="text"
                  placeholder="Tìm tên hoặc mã thiết bị (Zestech, Vietmap...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* THANH LỌC DANH MỤC NỔI BẬT */}
              <div className="mt-2.5 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Chọn nhóm thiết bị:
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`text-[11px] px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                      activeCategory === 'all'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    Tất cả
                  </button>
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                        activeCategory === cat.slug
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Danh sách thẻ sản phẩm Cột 1 (Cuộn được) */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {filteredMainProducts.length === 0 ? (
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
                  Không tìm thấy thiết bị nào phù hợp. Vui lòng thử từ khóa khác!
                </div>
              ) : (
                filteredMainProducts.map((prod) => {
                  const isSelected = selectedGears.some((item) => item.product.id === prod.id);
                  const displayPrice = prod.salePrice || prod.price;

                  return (
                    <div
                      key={prod.id}
                      className={`p-3 rounded-xl border transition flex gap-3 ${
                        isSelected
                          ? 'bg-red-50/40 border-red-500 shadow-sm ring-1 ring-red-400/40'
                          : 'bg-white border-slate-200 hover:border-red-300 hover:shadow-xs'
                      }`}
                    >
                      {/* Ảnh sản phẩm */}
                      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {prod.salePrice && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded text-[9px] font-black bg-red-600 text-white shadow-xs">
                            GIẢM GIÁ
                          </span>
                        )}
                      </div>

                      {/* Chi tiết sản phẩm */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                            <span className="font-extrabold text-red-600 uppercase tracking-wider">
                              {prod.brand}
                            </span>
                            <span className="text-slate-400 truncate max-w-[110px]">{prod.categoryName}</span>
                          </div>
                          <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                            {prod.name}
                          </h3>
                          {prod.specs && prod.specs.length > 0 && (
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              • {prod.specs.slice(0, 2).join(' • ')}
                            </p>
                          )}
                        </div>

                        {/* Giá tiền & Nút chọn */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1.5">
                          <div>
                            <div className="text-xs font-black text-red-600">
                              {displayPrice.toLocaleString('vi-VN')} đ
                            </div>
                            {prod.salePrice && (
                              <div className="text-[10px] text-slate-400 line-through">
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
                                : 'bg-slate-900 hover:bg-red-600 text-white shadow-xs'
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
                                <span>Chọn món</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* =========================================================================
              CỘT 2: GIẮC ZIN, MẶT DƯỠNG & PHỤ KIỆN (Chiếm 4/12 cột ~ 33%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-white border-2 border-slate-200/90 rounded-2xl p-4 flex flex-col h-[760px] shadow-sm hover:shadow-md transition ${
              activeMobileTab === 'accessories' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 2 */}
            <div className="pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Giắc Zin & Phụ Kiện Kèm Theo
                    </h2>
                    <span className="text-[11px] text-slate-500 font-medium">100% Cắm jack zin - Không cắt dây</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {selectedAccessories.length} đã chọn
                </span>
              </div>

              {/* Thông điệp cam kết giắc zin */}
              <div className="mt-3 p-2 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center gap-2 text-xs text-blue-800">
                <span className="text-base shrink-0">🔌</span>
                <span className="text-[11px] leading-tight">
                  Linh kiện chuẩn cắm giắc nhà máy. Giữ nguyên 100% bảo hành hãng của xe.
                </span>
              </div>

              {/* THANH LỌC DANH MỤC PHỤ KIỆN */}
              <div className="mt-2.5 pt-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Phân loại phụ kiện:
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {ACCESSORY_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveAccCategory(cat.id)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                        activeAccCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Danh sách thẻ linh kiện Cột 2 (Cuộn được) */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
              {filteredAccessories.map((acc) => {
                const isSelected = selectedAccessories.some((item) => item.accessory.id === acc.id);
                const isMatchedWithGear = acc.applicableCategorySlugs.some((slug) =>
                  activeSelectedCategorySlugs.includes(slug)
                );

                return (
                  <div
                    key={acc.id}
                    className={`p-3 rounded-xl border transition flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-500 shadow-sm ring-1 ring-blue-400/40'
                        : isMatchedWithGear
                        ? 'bg-amber-50/30 border-amber-300 hover:border-blue-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-extrabold text-blue-700">{acc.categoryName}</span>
                        {isMatchedWithGear && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            ★ Khuyên dùng cho gói này
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 leading-snug">{acc.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{acc.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                      <span className="text-xs font-black text-blue-600">
                        {acc.price.toLocaleString('vi-VN')} đ
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleAccessory(acc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-white hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-400 transition'
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
              CỘT 3: INBOX QUA ZALO KỸ THUẬT VIÊN (Chiếm 4/12 cột ~ 32%)
          ========================================================================== */}
          <div
            className={`lg:col-span-4 bg-white border-2 border-[#0068FF] rounded-2xl p-4 flex flex-col h-[760px] shadow-xl relative ${
              activeMobileTab === 'inbox' ? 'block' : 'hidden lg:flex'
            }`}
          >
            {/* Header Cột 3: Khung Inbox Kỹ Thuật Viên */}
            <div className="pb-3 border-b border-slate-200 mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#0068FF] flex items-center justify-center font-black text-white text-base shadow-sm">
                      DC
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-black text-slate-900">Inbox Zalo Kỹ Thuật</h2>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                        Online
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Tư vấn chuẩn giắc zin 24/7 • Hotline: {DEFAULT_SHOP_SETTINGS.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ô tự nhập dòng xe của khách */}
              <div className="mt-3">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  🚗 Dòng xe của bạn (tùy chọn):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Vios 2022, Ranger 2023, CX5, Accent..."
                  value={carInput}
                  onChange={(e) => setCarInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Nội dung danh sách món đã chọn (Cuộn được) */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
              <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Cấu hình bạn đang chọn ({totalItemsCount} món):</span>
                {totalItemsCount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGears([]);
                      setSelectedAccessories([]);
                    }}
                    className="text-[10px] text-red-600 hover:underline font-bold cursor-pointer"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {totalItemsCount === 0 ? (
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
                  <span className="text-3xl block mb-2">📋</span>
                  Bạn chưa chọn món nào. Hãy bấm <strong>[+ Chọn món]</strong> ở Cột 1 và Cột 2 để phối bộ nâng cấp cho xe.
                </div>
              ) : (
                <>
                  {/* Thiết bị chính */}
                  {selectedGears.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-red-600 font-bold">
                          {(item.product.salePrice || item.product.price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGear(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1 text-xs cursor-pointer font-bold"
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
                      className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-200 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-slate-800 text-xs truncate">
                          🔌 {item.accessory.name}
                        </div>
                        <div className="text-[11px] text-blue-700 font-bold">
                          {item.accessory.price.toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAccessory(item.accessory.id)}
                        className="text-slate-400 hover:text-red-600 p-1 text-xs cursor-pointer font-bold"
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
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Ghi chú riêng / Câu hỏi cho Kỹ thuật viên:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Xe bản số tự động, có hỗ trợ lắp tại nhà không shop?..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Phần Chốt Đơn & Gửi Zalo (Cố định ở đáy Cột 3) */}
            <div className="pt-3 border-t border-slate-200 mt-3">
              {/* Tổng tiền tạm tính */}
              <div className="flex items-baseline justify-between mb-2.5">
                <span className="text-xs text-slate-600 font-semibold">Tổng tiền dự toán:</span>
                <span className="text-xl font-black text-red-600">
                  {totalPrice.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Nút to: CHAT & GỬI CẤU HÌNH QUA ZALO NGAY */}
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#0068FF] hover:bg-[#0055d4] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition transform active:scale-98"
              >
                <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.22-1.31C8.6 21.48 10.25 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
                <span>GỬI CẤU HÌNH & CHAT QUA ZALO NGAY</span>
              </a>

              {/* Thông tin Hotline */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Zalo hỗ trợ: <strong className="text-slate-800">{DEFAULT_SHOP_SETTINGS.zalo}</strong></span>
                <a
                  href={`tel:${cleanZaloPhone}`}
                  className="text-red-600 hover:underline font-bold"
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
