import React, { useState, useEffect } from 'react';
import { DEFAULT_SHOP_SETTINGS, CATEGORIES_LIST, CAR_BRANDS_SAMPLE } from '@/lib/constants';
import { MOCK_PRODUCTS, type MockProduct } from '@/lib/mock-products';
import { MOCK_POSTS, type MockPost } from '@/lib/mock-posts';

export default function AdminApp() {
  // Trạng thái đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('admin@autotechpro.vn');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Tab điều hướng hiện tại trong Admin
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'cars' | 'posts' | 'settings'>('dashboard');

  // Dữ liệu quản trị có thể thay đổi (State)
  const [products, setProducts] = useState<MockProduct[]>(MOCK_PRODUCTS);
  const [posts, setPosts] = useState<MockPost[]>(MOCK_POSTS);
  const [settings, setSettings] = useState(DEFAULT_SHOP_SETTINGS);
  const [saveNotification, setSaveNotification] = useState<string>('');

  // Form thêm / sửa sản phẩm
  const [editingProduct, setEditingProduct] = useState<MockProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);

  // Kiểm tra session giả lập hoặc từ localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('autotech_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    const savedSettings = localStorage.getItem('autotech_shop_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {}
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Đăng nhập an toàn / chế độ demo ban đầu (Mật khẩu mặc định: admin123)
    if (loginEmail && (loginPassword === 'admin123' || loginPassword === 'admin')) {
      setIsAuthenticated(true);
      localStorage.setItem('autotech_admin_auth', 'true');
    } else {
      setAuthError('Email hoặc mật khẩu không chính xác! (Mẹo thử nghiệm: dùng mật khẩu "admin123")');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('autotech_admin_auth');
  };

  // Lưu cài đặt cửa hàng
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('autotech_shop_settings', JSON.stringify(settings));
    setSaveNotification('Đã lưu cấu hình cửa hàng thành công!');
    setTimeout(() => setSaveNotification(''), 3000);
  };

  // Toggle ẩn / hiện sản phẩm
  const handleToggleProductVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSaveNotification('Đã xóa sản phẩm thành công!');
      setTimeout(() => setSaveNotification(''), 3000);
    }
  };

  // Mở modal tạo sản phẩm mới
  const handleAddNewProduct = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: '',
      sku: '',
      name: '',
      brand: '',
      categorySlug: 'man-hinh-android',
      categoryName: 'Màn hình Android',
      price: 0,
      salePrice: null as unknown as number,
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
      specs: ['Cắm giắc zin 100%', 'Bảo hành 24 tháng'],
      warrantyMonths: 24,
      isUniversal: false,
      isFeatured: true,
      compatibleBrands: ['toyota', 'honda'],
      compatibleModels: ['vios', 'city'],
      description: '',
    });
    setIsProductModalOpen(true);
  };

  // Lưu form sản phẩm
  const handleSaveProductModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.sku) {
      alert('Vui lòng nhập tên sản phẩm và mã SKU!');
      return;
    }

    const slug = editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const updatedProd = { ...editingProduct, slug };

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === updatedProd.id);
      if (exists) {
        return prev.map((p) => (p.id === updatedProd.id ? updatedProd : p));
      }
      return [updatedProd, ...prev];
    });

    setIsProductModalOpen(false);
    setEditingProduct(null);
    setSaveNotification('Đã lưu thông tin sản phẩm thành công!');
    setTimeout(() => setSaveNotification(''), 3000);
  };

  // MÀN HÌNH ĐĂNG NHẬP
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
              ⚙️
            </div>
            <h1 className="text-xl font-bold text-white">Đăng Nhập Quản Trị Hệ Thống</h1>
            <p className="text-xs text-slate-400 mt-1">
              Dành riêng cho chủ shop & kỹ thuật viên AutoTech Pro
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Quản Trị
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mật Khẩu
              </label>
              <input
                type="password"
                required
                placeholder="Nhập mật khẩu..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              Đăng Nhập Vào Bảng Điều Khiển
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
            Mẹo thử nghiệm: Sử dụng mật khẩu <span className="text-amber-400 font-mono font-bold">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  // MÀN HÌNH DASHBOARD QUẢN TRỊ
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col sm:flex-row">
      {/* Sidebar Admin */}
      <aside className="w-full sm:w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2.5 px-2 mb-6">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center">
              A
            </div>
            <div>
              <div className="font-bold text-sm text-white">{settings.shop_name}</div>
              <div className="text-[10px] text-amber-400 font-mono">BẢNG QUẢN TRỊ</div>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'dashboard' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📊</span>
              <span>Tổng Quan (Dashboard)</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'products' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📦</span>
              <span>Quản Lý Sản Phẩm ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'categories' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📂</span>
              <span>Danh Mục ({CATEGORIES_LIST.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cars')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'cars' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🚗</span>
              <span>Hãng Xe & Đời Xe ({CAR_BRANDS_SAMPLE.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'posts' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>✍️</span>
              <span>Bài Viết Tư Vấn ({posts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center gap-2.5 ${
                activeTab === 'settings' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>⚙️</span>
              <span>Cài Đặt Cửa Hàng (Settings)</span>
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            className="w-full block text-center py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            ↗ Xem Trang Chủ Web
          </a>
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg text-red-400 hover:bg-red-500/10 text-xs font-semibold"
          >
            Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl">
        {saveNotification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <span>✓</span>
            <span>{saveNotification}</span>
          </div>
        )}

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Tổng Quan Quản Trị</h1>
              <p className="text-xs text-slate-400 mt-1">Theo dõi số lượng nội dung và trạng thái danh mục phụ kiện</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-xs">Sản phẩm hiện có</div>
                <div className="text-2xl font-extrabold text-white mt-1">{products.length}</div>
                <div className="text-[10px] text-emerald-400 mt-1">Đang sẵn sàng phục vụ</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-xs">Danh mục nâng cấp</div>
                <div className="text-2xl font-extrabold text-amber-400 mt-1">{CATEGORIES_LIST.length}</div>
                <div className="text-[10px] text-slate-400 mt-1">Màn hình, Bi LED, Cam 360...</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-xs">Hãng xe tương thích</div>
                <div className="text-2xl font-extrabold text-blue-400 mt-1">{CAR_BRANDS_SAMPLE.length}</div>
                <div className="text-[10px] text-slate-400 mt-1">Toyota, Honda, Mazda...</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-xs">Bài viết kinh nghiệm</div>
                <div className="text-2xl font-extrabold text-purple-400 mt-1">{posts.length}</div>
                <div className="text-[10px] text-slate-400 mt-1">Hỗ trợ SEO Google</div>
              </div>
            </div>

            {/* Thao tác nhanh */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Thao Tác Nhanh</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleAddNewProduct}
                  className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  + Thêm Sản Phẩm Mới
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
                >
                  ⚙ Cập Nhật Hotline & Zalo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUẢN LÝ SẢN PHẨM */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Quản Lý Sản Phẩm</h1>
                <p className="text-xs text-slate-400 mt-1">Thêm, sửa thông tin, giá bán và cấu hình dòng xe tương thích</p>
              </div>
              <button
                onClick={handleAddNewProduct}
                className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                + Thêm Sản Phẩm Mới
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-3">Sản phẩm</th>
                      <th className="p-3">SKU</th>
                      <th className="p-3">Danh mục</th>
                      <th className="p-3">Giá bán</th>
                      <th className="p-3">Loại xe</th>
                      <th className="p-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-800/50">
                        <td className="p-3 flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                          <div>
                            <div className="font-bold text-white line-clamp-1">{prod.name}</div>
                            <div className="text-[10px] text-amber-400">{prod.brand}</div>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{prod.sku}</td>
                        <td className="p-3 text-slate-400">{prod.categoryName}</td>
                        <td className="p-3 font-bold text-amber-400">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.salePrice || prod.price)}
                        </td>
                        <td className="p-3">
                          {prod.isUniversal ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Mọi xe</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px]">Theo xe</span>
                          )}
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsProductModalOpen(true);
                            }}
                            className="text-amber-400 hover:underline font-semibold"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="text-red-400 hover:underline font-semibold"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DANH MỤC */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Danh Mục Sản Phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES_LIST.map((cat, idx) => (
                <div key={cat.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">{cat.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">Slug: {cat.slug}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">
                    Vị trí #{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: HÃNG XE & ĐỜI XE */}
        {activeTab === 'cars' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Quản Lý Hãng Xe & Tương Thích</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CAR_BRANDS_SAMPLE.map((brand) => (
                <div key={brand.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-amber-400 font-black text-base flex items-center justify-center mx-auto mb-2">
                    {brand.name[0]}
                  </div>
                  <div className="font-bold text-sm text-white">{brand.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">{brand.slug}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BÀI VIẾT */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Quản Lý Bài Viết Kinh Nghiệm</h1>
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-white text-sm">{post.title}</div>
                    <div className="text-xs text-slate-400 mt-1">Chuyên mục: {post.category} • Ngày: {post.publishedAt}</div>
                  </div>
                  <a href={`/blog/${post.slug}`} target="_blank" className="text-xs text-amber-400 hover:underline shrink-0">
                    Xem bài ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS (CHỦ SHOP CẬP NHẬT TỨC THÌ) */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Cài Đặt Thông Tin Cửa Hàng</h1>
              <p className="text-xs text-slate-400 mt-1">
                Thay đổi Hotline, số Zalo, địa chỉ gara và thông tin SEO mà không cần sửa code
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tên Cửa Hàng / Gara</label>
                  <input
                    type="text"
                    value={settings.shop_name}
                    onChange={(e) => setSettings({ ...settings, shop_name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Khẩu Hiệu / Tagline</label>
                  <input
                    type="text"
                    value={settings.shop_tagline}
                    onChange={(e) => setSettings({ ...settings, shop_tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hotline Bán Hàng & Tư Vấn</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Số Zalo Kỹ Thuật (Nhận tin nhắn khách)</label>
                  <input
                    type="text"
                    value={settings.zalo}
                    onChange={(e) => setSettings({ ...settings, zalo: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Địa Chỉ Xưởng Thi Công</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Thời Gian Làm Việc</label>
                  <input
                    type="text"
                    value={settings.operating_hours}
                    onChange={(e) => setSettings({ ...settings, operating_hours: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Link Dẫn Đường Google Maps</label>
                  <input
                    type="text"
                    value={settings.google_maps_url}
                    onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tiêu Đề SEO (Google Title)</label>
                  <input
                    type="text"
                    value={settings.seo_title}
                    onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mô Tả SEO (Google Meta Description)</label>
                  <textarea
                    rows={3}
                    value={settings.seo_description}
                    onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition"
                >
                  Lưu Thay Đổi Cài Đặt
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MODAL THÊM / SỬA SẢN PHẨM */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white">
                {editingProduct.name ? `Sửa Sản Phẩm: ${editingProduct.name}` : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Mã SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Thương Hiệu</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Danh Mục</label>
                  <select
                    value={editingProduct.categorySlug}
                    onChange={(e) => {
                      const selected = CATEGORIES_LIST.find((c) => c.slug === e.target.value);
                      setEditingProduct({
                        ...editingProduct,
                        categorySlug: e.target.value,
                        categoryName: selected?.name || '',
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bảo Hành (Tháng)</label>
                  <input
                    type="number"
                    value={editingProduct.warrantyMonths}
                    onChange={(e) => setEditingProduct({ ...editingProduct, warrantyMonths: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Giá Bán Niêm Yết (VNĐ)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Giá Khuyến Mãi (nếu có)</label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Link Ảnh Sản Phẩm</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProduct.isUniversal}
                      onChange={(e) => setEditingProduct({ ...editingProduct, isUniversal: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700"
                    />
                    <span className="text-white font-medium">Sản phẩm phổ thông (Lắp được cho mọi xe)</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
