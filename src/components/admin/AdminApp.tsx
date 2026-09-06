import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_SHOP_SETTINGS, CATEGORIES_LIST } from '@/lib/constants';
import { MOCK_PRODUCTS, type MockProduct } from '@/lib/mock-products';
import { MOCK_POSTS, type MockPost } from '@/lib/mock-posts';

interface EditableCategory {
  id: string;
  name: string;
  slug: string;
}

interface EditableCarBrand {
  id: string;
  name: string;
  slug: string;
  models: { id: string; name: string; years: string }[];
}

const INITIAL_CAR_BRANDS: EditableCarBrand[] = [
  {
    id: 'toyota',
    name: 'Toyota',
    slug: 'toyota',
    models: [
      { id: 'vios', name: 'Vios', years: '2014 - 2024' },
      { id: 'camry', name: 'Camry', years: '2012 - 2024' },
      { id: 'corolla-cross', name: 'Corolla Cross', years: '2020 - 2024' },
      { id: 'fortuner', name: 'Fortuner', years: '2012 - 2024' },
      { id: 'veloz', name: 'Veloz Cross', years: '2022 - 2024' },
    ],
  },
  {
    id: 'honda',
    name: 'Honda',
    slug: 'honda',
    models: [
      { id: 'city', name: 'City', years: '2014 - 2024' },
      { id: 'civic', name: 'Civic', years: '2016 - 2024' },
      { id: 'cr-v', name: 'CR-V', years: '2013 - 2024' },
    ],
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    slug: 'hyundai',
    models: [
      { id: 'accent', name: 'Accent', years: '2018 - 2024' },
      { id: 'tucson', name: 'Tucson', years: '2016 - 2024' },
      { id: 'santafe', name: 'SantaFe', years: '2015 - 2024' },
    ],
  },
  {
    id: 'kia',
    name: 'Kia',
    slug: 'kia',
    models: [
      { id: 'seltos', name: 'Seltos', years: '2020 - 2024' },
      { id: 'carnival', name: 'Carnival', years: '2016 - 2024' },
      { id: 'k3', name: 'K3 / Cerato', years: '2016 - 2024' },
    ],
  },
  {
    id: 'mazda',
    name: 'Mazda',
    slug: 'mazda',
    models: [
      { id: 'mazda-3', name: 'Mazda 3', years: '2015 - 2024' },
      { id: 'cx-5', name: 'CX-5', years: '2013 - 2024' },
    ],
  },
  {
    id: 'ford',
    name: 'Ford',
    slug: 'ford',
    models: [
      { id: 'ranger', name: 'Ranger', years: '2015 - 2024' },
      { id: 'everest', name: 'Everest', years: '2016 - 2024' },
    ],
  },
  {
    id: 'vinfast',
    name: 'VinFast',
    slug: 'vinfast',
    models: [
      { id: 'vf-3', name: 'VF 3', years: '2024' },
      { id: 'vf-5', name: 'VF 5', years: '2023 - 2024' },
      { id: 'vf-8', name: 'VF 8', years: '2022 - 2024' },
    ],
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    slug: 'mitsubishi',
    models: [
      { id: 'xpander', name: 'Xpander', years: '2018 - 2024' },
      { id: 'xforce', name: 'Xforce', years: '2024' },
    ],
  },
];

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('admin');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'cars' | 'posts' | 'settings'>('products');

  const [products, setProducts] = useState<MockProduct[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<EditableCategory[]>(CATEGORIES_LIST);
  const [carBrands, setCarBrands] = useState<EditableCarBrand[]>(INITIAL_CAR_BRANDS);
  const [posts] = useState<MockPost[]>(MOCK_POSTS);
  const [settings, setSettings] = useState(DEFAULT_SHOP_SETTINGS);
  const [notification, setNotification] = useState<string>('');

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSearch, setFilterSearch] = useState<string>('');

  // Modal Sản phẩm
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [specKey, setSpecKey] = useState<string>('');
  const [specVal, setSpecVal] = useState<string>('');

  // Modal Danh mục
  const [editingCategory, setEditingCategory] = useState<EditableCategory | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);

  // Thêm model xe
  const [editingBrand, setEditingBrand] = useState<EditableCarBrand | null>(null);
  const [newModelName, setNewModelName] = useState<string>('');
  const [newModelYears, setNewModelYears] = useState<string>('2018 - 2024');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (localStorage.getItem('admin_logged') === 'true') {
      setIsAuthenticated(true);
    }
    const savedProds = localStorage.getItem('app_products');
    if (savedProds) {
      try { setProducts(JSON.parse(savedProds)); } catch (e) {}
    }
    const savedCats = localStorage.getItem('app_categories');
    if (savedCats) {
      try { setCategories(JSON.parse(savedCats)); } catch (e) {}
    }
    const savedBrands = localStorage.getItem('app_car_brands');
    if (savedBrands) {
      try { setCarBrands(JSON.parse(savedBrands)); } catch (e) {}
    }
    const savedSettings = localStorage.getItem('app_shop_settings');
    if (savedSettings) {
      try { setSettings(JSON.parse(savedSettings)); } catch (e) {}
    }
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'admin123' || loginPassword === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_logged', 'true');
    } else {
      setAuthError('Mật khẩu không đúng. Mẹo: nhập "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_logged');
  };

  // Upload file từ máy tính
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (editingProduct) {
        setEditingProduct({ ...editingProduct, image: base64 });
        notify('Đã tải ảnh lên!');
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSettings((prev) => ({ ...prev, logo_url: base64 }));
      notify('Đã tải logo mới!');
    };
    reader.readAsDataURL(files[0]);
  };

  // Mở form sửa / thêm sản phẩm
  const handleOpenProductEdit = (prod?: MockProduct) => {
    if (prod) {
      setEditingProduct({
        ...prod,
        specsList: prod.specs || [],
        compatibleBrands: prod.compatibleBrands || [],
        compatibleModels: prod.compatibleModels || [],
      });
    } else {
      setEditingProduct({
        id: 'sp-' + Date.now(),
        name: '',
        sku: 'SKU-' + Math.floor(1000 + Math.random() * 9000),
        slug: '',
        brand: '',
        categorySlug: categories[0]?.slug || 'man-hinh-android',
        categoryName: categories[0]?.name || 'Màn hình Android',
        price: 0,
        salePrice: 0,
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
        specsList: ['Cắm giắc zin 100%', 'Bảo hành chính hãng'],
        warrantyMonths: 24,
        isUniversal: false,
        isFeatured: true,
        status: 'active',
        compatibleBrands: ['toyota'],
        compatibleModels: ['vios'],
        description: '',
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.name.trim()) return;

    const currentSlug = editingProduct.slug?.trim() || 
      editingProduct.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');

    const catObj = categories.find((c) => c.slug === editingProduct.categorySlug);

    const finalizedProduct: MockProduct = {
      ...editingProduct,
      slug: currentSlug,
      categoryName: catObj?.name || editingProduct.categoryName,
      price: Number(editingProduct.price) || 0,
      salePrice: Number(editingProduct.salePrice) || undefined,
      specs: editingProduct.specsList || [],
    };

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === finalizedProduct.id);
      const updated = exists
        ? prev.map((p) => (p.id === finalizedProduct.id ? finalizedProduct : p))
        : [finalizedProduct, ...prev];
      localStorage.setItem('app_products', JSON.stringify(updated));
      window.dispatchEvent(new Event('app-products-updated'));
      window.dispatchEvent(new Event('storage'));
      return updated;
    });

    setIsProductModalOpen(false);
    setEditingProduct(null);
    notify('Đã lưu thông tin sản phẩm!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Xác nhận xóa sản phẩm này?')) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem('app_products', JSON.stringify(updated));
      window.dispatchEvent(new Event('app-products-updated'));
      window.dispatchEvent(new Event('storage'));
      notify('Đã xóa sản phẩm');
    }
  };

  const handleAddSpec = () => {
    if (!specKey.trim()) return;
    const text = specVal.trim() ? `${specKey.trim()}: ${specVal.trim()}` : specKey.trim();
    setEditingProduct({
      ...editingProduct,
      specsList: [...(editingProduct.specsList || []), text],
    });
    setSpecKey('');
    setSpecVal('');
  };

  const handleRemoveSpec = (index: number) => {
    setEditingProduct({
      ...editingProduct,
      specsList: editingProduct.specsList.filter((_: any, i: number) => i !== index),
    });
  };

  const handleToggleCarBrand = (brandId: string) => {
    const list: string[] = editingProduct.compatibleBrands || [];
    if (list.includes(brandId)) {
      setEditingProduct({
        ...editingProduct,
        compatibleBrands: list.filter((b) => b !== brandId),
      });
    } else {
      setEditingProduct({
        ...editingProduct,
        compatibleBrands: [...list, brandId],
      });
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.name.trim()) return;
    const slug = editingCategory.slug?.trim() || editingCategory.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const finalized = { ...editingCategory, slug };

    setCategories((prev) => {
      const exists = prev.some((c) => c.id === finalized.id);
      const updated = exists
        ? prev.map((c) => (c.id === finalized.id ? finalized : c))
        : [...prev, finalized];
      localStorage.setItem('app_categories', JSON.stringify(updated));
      return updated;
    });
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
    notify('Đã cập nhật danh mục!');
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Xác nhận xóa danh mục này?')) {
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
      localStorage.setItem('app_categories', JSON.stringify(updated));
      notify('Đã xóa danh mục');
    }
  };

  const handleAddModelToBrand = (brandId: string) => {
    if (!newModelName.trim()) return;
    const modelSlug = newModelName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newModel = { id: modelSlug, name: newModelName.trim(), years: newModelYears.trim() };

    setCarBrands((prev) => {
      const updated = prev.map((b) => {
        if (b.id === brandId) {
          return { ...b, models: [...b.models, newModel] };
        }
        return b;
      });
      localStorage.setItem('app_car_brands', JSON.stringify(updated));
      return updated;
    });
    setNewModelName('');
    notify('Đã thêm dòng xe mới!');
  };

  const handleDeleteModel = (brandId: string, modelId: string) => {
    if (confirm('Xác nhận xóa dòng xe này?')) {
      setCarBrands((prev) => {
        const updated = prev.map((b) => {
          if (b.id === brandId) {
            return { ...b, models: b.models.filter((m) => m.id !== modelId) };
          }
          return b;
        });
        localStorage.setItem('app_car_brands', JSON.stringify(updated));
        return updated;
      });
      notify('Đã xóa dòng xe');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('app_shop_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('app-settings-updated'));
    window.dispatchEvent(new Event('storage'));
    notify('Đã lưu thông tin cửa hàng thành công! Đã tự động cập nhật toàn bộ trang.');
  };

  const filteredProducts = products.filter((p) => {
    if (filterCategory !== 'all' && p.categorySlug !== filterCategory) return false;
    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  // Màn hình đăng nhập Light Mode
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-base font-bold text-slate-900 uppercase tracking-wider">Hệ Thống Quản Lý</h1>
            <p className="text-xs text-slate-500 mt-1">Cửa Hàng Phụ Kiện Ô Tô</p>
          </div>

          {authError && (
            <div className="mb-4 p-2.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Tài khoản</label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-slate-600 focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded transition"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="mt-4 text-center text-[11px] text-slate-400">
            Mật khẩu mặc định: <span className="text-slate-700 font-mono font-bold">admin123</span>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Light Mode
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar Sáng */}
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900 text-sm tracking-wide">
            {settings.shop_name || 'QUẢN TRỊ CỬA HÀNG'}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 hidden sm:inline">Quản lý kho hàng & nội dung website</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-slate-600 hover:text-slate-900 transition flex items-center gap-1 font-medium"
          >
            <span>Xem Website</span>
            <span>↗</span>
          </a>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 font-medium transition"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Tabs Menu Nền Sáng */}
      <div className="bg-white border-b border-slate-200 px-4 flex gap-1 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-4 font-semibold border-b-2 transition ${
            activeTab === 'products'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sản phẩm ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`py-3 px-4 font-semibold border-b-2 transition ${
            activeTab === 'categories'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Danh mục ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab('cars')}
          className={`py-3 px-4 font-semibold border-b-2 transition ${
            activeTab === 'cars'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Dòng xe & Đời xe ({carBrands.length})
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`py-3 px-4 font-semibold border-b-2 transition ${
            activeTab === 'posts'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Bài viết ({posts.length})
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-4 font-semibold border-b-2 transition ${
            activeTab === 'settings'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Thông tin Shop & Liên hệ
        </button>
      </div>

      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-xs flex items-center gap-2">
          <span>✓</span>
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* ======================================================= */}
        {/* TAB 1: SẢN PHẨM */}
        {/* ======================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 text-xs shadow-2xs">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Tìm tên, SKU, thương hiệu..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 w-48 focus:outline-none focus:bg-white focus:border-slate-500"
                />

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:bg-white"
                >
                  <option value="all">Tất cả danh mục ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleOpenProductEdit()}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition shadow-2xs"
              >
                + Thêm Sản Phẩm Mới
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-3">Ảnh</th>
                    <th className="p-3">Tên Sản Phẩm</th>
                    <th className="p-3">Mã SKU</th>
                    <th className="p-3">Danh Mục</th>
                    <th className="p-3">Giá Niêm Yết</th>
                    <th className="p-3">Giá Khuyến Mãi</th>
                    <th className="p-3">Loại Xe</th>
                    <th className="p-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-10 object-cover rounded bg-slate-100 border border-slate-200"
                        />
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900 line-clamp-1">{prod.name}</div>
                        <div className="text-[11px] text-slate-500">{prod.brand} • BH {prod.warrantyMonths || 12}T</div>
                      </td>
                      <td className="p-3 font-mono text-slate-600">{prod.sku}</td>
                      <td className="p-3 text-slate-600">{prod.categoryName}</td>
                      <td className="p-3 font-medium text-slate-700">
                        {prod.price > 0 ? prod.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                      </td>
                      <td className="p-3 font-bold text-red-600">
                        {prod.salePrice ? prod.salePrice.toLocaleString('vi-VN') + ' đ' : '-'}
                      </td>
                      <td className="p-3">
                        {prod.isUniversal ? (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] border border-emerald-200 font-medium">
                            Mọi dòng xe
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200">
                            Theo xe ({prod.compatibleBrands?.length || 0} hãng)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => handleOpenProductEdit(prod)}
                          className="text-slate-700 hover:text-slate-900 font-medium underline"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="text-red-600 hover:text-red-700 font-medium underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Không có sản phẩm nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: DANH MỤC */}
        {/* ======================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 text-xs shadow-2xs">
              <span className="text-slate-600">Quản lý các nhóm sản phẩm chính trên website</span>
              <button
                onClick={() => {
                  setEditingCategory({ id: 'cat-' + Date.now(), name: '', slug: '' });
                  setIsCategoryModalOpen(true);
                }}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded transition"
              >
                + Thêm Danh Mục
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs shadow-2xs">
                  <div>
                    <div className="font-bold text-slate-800">{cat.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">/{cat.slug}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsCategoryModalOpen(true);
                      }}
                      className="text-slate-600 hover:text-slate-900 underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: DÒNG XE & ĐỜI XE */}
        {/* ======================================================= */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 shadow-2xs">
              Quản lý hãng xe và đời xe phục vụ tra cứu tương thích mặt dưỡng & phụ kiện.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carBrands.map((brand) => (
                <div key={brand.id} className="p-4 rounded-lg bg-white border border-slate-200 space-y-3 text-xs shadow-2xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-sm">{brand.name}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{brand.models.length} dòng xe</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {brand.models.map((m) => (
                      <span
                        key={m.id}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-[11px]"
                      >
                        <span>{m.name} ({m.years})</span>
                        <button
                          onClick={() => handleDeleteModel(brand.id, m.id)}
                          className="text-slate-400 hover:text-red-600 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tên dòng xe (vd: Raize)"
                      value={editingBrand?.id === brand.id ? newModelName : ''}
                      onFocus={() => setEditingBrand(brand)}
                      onChange={(e) => setNewModelName(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 text-xs focus:outline-none focus:bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Đời xe (vd: 2021-2024)"
                      value={editingBrand?.id === brand.id ? newModelYears : '2018 - 2024'}
                      onChange={(e) => setNewModelYears(e.target.value)}
                      className="w-28 bg-slate-50 border border-slate-300 rounded px-2.5 py-1 text-slate-900 text-xs focus:outline-none focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddModelToBrand(brand.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium text-xs shrink-0"
                    >
                      + Thêm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: BÀI VIẾT */}
        {/* ======================================================= */}
        {activeTab === 'posts' && (
          <div className="space-y-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-600 shadow-2xs">
              Danh sách bài viết tư vấn kỹ thuật trên website
            </div>

            <div className="space-y-2">
              {posts.map((post) => (
                <div key={post.id} className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-2xs">
                  <div>
                    <div className="font-bold text-slate-800">{post.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Chuyên mục: {post.category} • Ngày: {post.publishedAt}
                    </div>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-slate-600 hover:text-slate-900 underline shrink-0 font-medium"
                  >
                    Xem bài viết ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 5: THÔNG TIN SHOP & LIÊN HỆ (SETTINGS) */}
        {/* ======================================================= */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-xl p-5 space-y-6 text-xs max-w-3xl shadow-2xs">
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Cài Đặt Cửa Hàng & Kênh Liên Hệ</h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Các thay đổi tại đây sẽ cập nhật trực tiếp lên website (Hotline, Zalo, địa chỉ, bản đồ...)
              </p>
            </div>

            {/* Logo */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-800">Logo Cửa Hàng</div>
              <div className="flex items-center gap-4">
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="w-14 h-14 object-contain rounded bg-white p-1 border border-slate-300" />
                ) : (
                  <div className="w-14 h-14 rounded bg-white flex items-center justify-center text-slate-400 border border-slate-300 font-bold">
                    Logo
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    ref={logoInputRef}
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded border border-slate-300 font-medium shadow-2xs"
                  >
                    Tải logo từ máy tính
                  </button>
                  <div className="text-[11px] text-slate-400 mt-1">Định dạng PNG, JPG hoặc WebP</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Tên Cửa Hàng *</label>
                <input
                  type="text"
                  required
                  value={settings.shop_name}
                  onChange={(e) => setSettings({ ...settings, shop_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Khẩu Hiệu Ngắn</label>
                <input
                  type="text"
                  value={settings.shop_tagline}
                  onChange={(e) => setSettings({ ...settings, shop_tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Số Điện Thoại Hotline *</label>
                <input
                  type="text"
                  required
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Số Zalo Kỹ Thuật *</label>
                <input
                  type="text"
                  required
                  value={settings.zalo}
                  onChange={(e) => setSettings({ ...settings, zalo: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Địa Chỉ Xưởng *</label>
                <input
                  type="text"
                  required
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Thời Gian Làm Việc</label>
                <input
                  type="text"
                  value={settings.operating_hours}
                  onChange={(e) => setSettings({ ...settings, operating_hours: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Link Google Maps</label>
                <input
                  type="text"
                  value={settings.google_maps_url}
                  onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Tiêu Đề SEO (Google)</label>
                <input
                  type="text"
                  value={settings.seo_title}
                  onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Mô Tả SEO (Meta Description)</label>
                <textarea
                  rows={2}
                  value={settings.seo_description}
                  onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded transition shadow-2xs"
              >
                Lưu Thay Đổi Thông Tin
              </button>
            </div>
          </form>
        )}
      </main>

      {/* MODAL SỬA / THÊM SẢN PHẨM SÁNG */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-xl text-xs">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <h2 className="font-bold text-slate-900 text-sm">
                {editingProduct.name ? `Chỉnh Sửa: ${editingProduct.name}` : 'Thêm Sản Phẩm Mới'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-5 space-y-5 overflow-y-auto flex-1">
              {/* 1. THÔNG TIN CƠ BẢN */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
                  1. Thông tin cơ bản
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">Tên Sản Phẩm *</label>
                    <input
                      type="text"
                      required
                      placeholder="Màn hình Android..."
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Mã SKU / Model</label>
                    <input
                      type="text"
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Thương Hiệu</label>
                    <input
                      type="text"
                      value={editingProduct.brand}
                      onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Danh Mục Sản Phẩm</label>
                    <select
                      value={editingProduct.categorySlug}
                      onChange={(e) => setEditingProduct({ ...editingProduct, categorySlug: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Thời Gian Bảo Hành (Tháng)</label>
                    <input
                      type="number"
                      value={editingProduct.warrantyMonths || 12}
                      onChange={(e) => setEditingProduct({ ...editingProduct, warrantyMonths: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Giá Bán Niêm Yết (VNĐ)</label>
                    <input
                      type="number"
                      value={editingProduct.price || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      placeholder="0 = Liên hệ"
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Giá Khuyến Mãi (nếu có)</label>
                    <input
                      type="number"
                      value={editingProduct.salePrice || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. TẢI ẢNH TỪ MÁY */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
                  2. Hình ảnh sản phẩm
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-24 h-20 rounded bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {editingProduct.image ? (
                      <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-400 text-[10px]">Chưa có ảnh</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded border border-slate-300 font-semibold shadow-2xs"
                    >
                      📁 Chọn ảnh từ máy tính / Thư viện ảnh
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Hoặc dán URL:</span>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. THÔNG SỐ KỸ THUẬT */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
                  3. Thông số kỹ thuật chi tiết
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {editingProduct.specsList?.map((spec: string, idx: number) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs">
                      <span>{spec}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-slate-400 hover:text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Thông số (vd: RAM)"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className="w-1/3 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị (vd: 4GB - 64GB)"
                    value={specVal}
                    onChange={(e) => setSpecVal(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-slate-900 focus:outline-none focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium"
                  >
                    + Thêm
                  </button>
                </div>
              </div>

              {/* 4. DÒNG XE TƯƠNG THÍCH */}
              <div className="space-y-3">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
                  4. Dòng xe tương thích
                </div>

                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isUniversal}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isUniversal: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600"
                  />
                  <span className="text-slate-900 font-semibold">
                    Sản phẩm phổ thông (Lắp được cho 100% tất cả các dòng xe)
                  </span>
                </label>

                {!editingProduct.isUniversal && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-slate-600 block text-[11px]">
                      Chọn các hãng xe tương thích có sẵn mặt dưỡng hoặc canbus:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {carBrands.map((brand) => {
                        const isChecked = editingProduct.compatibleBrands?.includes(brand.id);
                        return (
                          <label
                            key={brand.id}
                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                              isChecked
                                ? 'bg-red-50 border-red-300 text-red-700 font-semibold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleCarBrand(brand.id)}
                              className="w-3.5 h-3.5 rounded text-red-600"
                            />
                            <span>{brand.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. MÔ TẢ CHI TIẾT */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] pb-1 border-b border-slate-100">
                  5. Mô tả chi tiết & Hướng dẫn thi công
                </div>
                <textarea
                  rows={4}
                  placeholder="Mô tả sản phẩm, ưu điểm cắm giắc zin..."
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition shadow-xs"
                >
                  Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DANH MỤC */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-5 shadow-xl text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">
              {editingCategory.name ? 'Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Tên Danh Mục *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Màn hình Android"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Đường dẫn tĩnh (Slug)</label>
                <input
                  type="text"
                  placeholder="Tự động tạo nếu để trống"
                  value={editingCategory.slug}
                  onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:bg-white"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
