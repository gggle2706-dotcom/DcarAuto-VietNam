import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Klmzst-W.mjs";
import { t as createComponent } from "./compiler_BRFb4go0.mjs";
import { i as DEFAULT_SHOP_SETTINGS, t as $$Layout } from "./Layout_Bl7_188Z.mjs";
import { t as MOCK_PRODUCTS } from "./mock-products_B-uxnCdY.mjs";
import { t as $$ProductCard } from "./ProductCard_DdYE0tor.mjs";
//#region src/pages/san-pham/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const product = MOCK_PRODUCTS.find((p) => p.slug === slug) || {
		id: "prod-" + (slug || "custom"),
		slug: slug || "",
		sku: "SP-" + (slug || "").toUpperCase().slice(0, 8),
		name: "Đang tải thông tin sản phẩm...",
		brand: "Dcar Auto",
		categorySlug: "phu-kien-xe-hoi",
		categoryName: "Phụ kiện ô tô",
		price: 0,
		salePrice: void 0,
		image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
		specs: ["100% Giắc cắm zin", "Bảo hành chính hãng"],
		warrantyMonths: 24,
		isUniversal: true,
		isFeatured: false,
		compatibleBrands: [],
		compatibleModels: [],
		description: "Sản phẩm phụ kiện chính hãng tại Dcar Auto."
	};
	const formatCurrency = (val) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND"
		}).format(val);
	};
	const hasDiscount = product.salePrice && product.salePrice < product.price;
	const currentPrice = hasDiscount ? product.salePrice : product.price;
	const zaloMessage = encodeURIComponent(`Chào shop ${DEFAULT_SHOP_SETTINGS.shop_name}, tôi quan tâm sản phẩm "${product.name}" (Mã: ${product.sku}). Cho tôi xin báo giá trọn gói thi công cho xe.`);
	const zaloUrl = `https://zalo.me/${DEFAULT_SHOP_SETTINGS.zalo}?text=${zaloMessage}`;
	const relatedProducts = MOCK_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${product.name} - ${DEFAULT_SHOP_SETTINGS.shop_name}`,
		"description": product.description
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-slate-100 border-b border-slate-200 py-3 px-4 sm:px-6 text-xs text-slate-500"><div class="max-w-7xl mx-auto flex items-center gap-2 flex-wrap"><a href="/" class="hover:text-slate-900">Trang chủ</a><span>/</span><a href="/san-pham" class="hover:text-slate-900">Sản phẩm</a><span>/</span><a id="product-breadcrumb-cat"${addAttribute(`/san-pham?category=${product.categorySlug}`, "href")} class="hover:text-slate-900">${product.categoryName}</a><span>/</span><span id="product-breadcrumb-name" class="text-slate-900 font-semibold truncate max-w-xs">${product.name}</span></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"><!-- Cột Ảnh (5 cols) --><div class="lg:col-span-5 space-y-4"><div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm"><img id="main-product-image"${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="w-full h-full object-cover">${hasDiscount && renderTemplate`<span id="product-discount-tag" class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-xs">Giảm giá</span>`}</div><div class="grid grid-cols-3 gap-2 text-center text-xs text-slate-700"><div class="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs"><div class="font-bold text-slate-900">100% Giắc Zin</div><div class="text-[10px] text-slate-500 mt-0.5">Không cắt trích dây</div></div><div class="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs"><div class="font-bold text-slate-900">BH <span id="product-warranty-val">${product.warrantyMonths}</span> Tháng</div><div class="text-[10px] text-slate-500 mt-0.5">Lỗi 1 đổi 1 chính hãng</div></div><div class="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs"><div class="font-bold text-slate-900">Lắp Đặt Xưởng</div><div class="text-[10px] text-slate-500 mt-0.5">Hoặc hỗ trợ tận nơi</div></div></div></div><!-- Cột Thông tin & Nút Mua (7 cols) --><div class="lg:col-span-7 flex flex-col justify-between"><div class="space-y-4"><div class="flex items-center gap-3 text-xs"><span id="product-brand-val" class="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold uppercase tracking-wider">${product.brand}</span><span class="text-slate-500">Mã SKU: <span id="product-sku-val" class="text-slate-800 font-mono font-semibold">${product.sku}</span></span><span class="text-emerald-700 font-semibold">● Sẵn hàng tại xưởng</span></div><h1 id="product-name-val" class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">${product.name}</h1><!-- Giá --><div class="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline gap-3"><span id="product-price-val" class="text-2xl sm:text-3xl font-extrabold text-red-600">${formatCurrency(currentPrice)}</span><span id="product-oldprice-val"${addAttribute(`text-sm text-slate-400 line-through ${hasDiscount ? "" : "hidden"}`, "class")}>${formatCurrency(product.price)}</span><span class="text-xs text-slate-500 ml-auto">(Giá tham khảo - Đã bao gồm công lắp cơ bản)</span></div><!-- Tương thích xe --><div class="p-4 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5 shadow-2xs"><div class="font-bold text-slate-900">🚗 Dòng xe tương thích:</div>${product.isUniversal ? renderTemplate`<p class="text-emerald-700 font-medium">Sản phẩm phổ thông — Lắp đặt tương thích với 100% tất cả các dòng xe.</p>` : renderTemplate`<div><p class="text-slate-600 mb-2">Tương thích với các hãng: <span class="font-semibold text-slate-900 uppercase">${product.compatibleBrands.join(", ")}</span> (Có sẵn dưỡng theo form xe).</p><div class="flex flex-wrap gap-1">${product.compatibleModels.map((m) => renderTemplate`<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono">${m.toUpperCase()}</span>`)}</div></div>`}</div><!-- Thông số kỹ thuật -->${product.specs.length > 0 && renderTemplate`<div class="space-y-2"><div class="text-xs font-bold text-slate-900 uppercase tracking-wide">Thông số nổi bật</div><div id="product-specs-list" class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">${product.specs.map((spec) => renderTemplate`<div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">✓ ${spec}</div>`)}</div></div>`}</div><!-- CTA Buttons --><div class="pt-6 border-t border-slate-200 space-y-2.5 mt-6"><div class="grid grid-cols-1 sm:grid-cols-2 gap-3"><a id="product-zalo-btn"${addAttribute(zaloUrl, "href")} target="_blank" rel="noopener noreferrer" class="shop-zalo-link py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center transition shadow-xs flex items-center justify-center gap-2"><span>Nhận Báo Giá Qua Zalo</span></a><a${addAttribute(`tel:${DEFAULT_SHOP_SETTINGS.phone.replace(/[^0-9]/g, "")}`, "href")} class="shop-phone-link py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm text-center transition shadow-xs flex items-center justify-center gap-2"><span>Gọi Kỹ Thuật: <span class="shop-phone-val">${DEFAULT_SHOP_SETTINGS.phone}</span></span></a></div><p class="text-[11px] text-center text-slate-500">* Kỹ thuật viên sẽ kiểm tra form taplo xe của bạn trước khi bắt đầu thi công.</p></div></div></div><!-- Mô tả chi tiết --><div class="mt-12 pt-8 border-t border-slate-200 max-w-4xl"><h2 class="text-xl font-bold text-slate-900 mb-3">Mô Tả Sản Phẩm & Quy Trình Thi Công</h2><div class="prose max-w-none text-slate-700 text-sm leading-relaxed space-y-3"><p id="product-description-text">${product.description}</p><p>Khi lắp đặt <strong id="product-name-footer" class="text-slate-900">${product.name}</strong> tại <span class="shop-name-val">${DEFAULT_SHOP_SETTINGS.shop_name}</span>, khách hàng an tâm tuyệt đối về quy chuẩn:</p><ul class="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600"><li>Toàn bộ dây nguồn dùng <strong>giắc cắm zin 100%</strong>, không chích dây hay cắt nối điện xe.</li><li>Tích hợp đầy đủ phím điều khiển trên vô lăng và hiển thị thông tin điều hòa/cửa xe.</li><li>Mặt dưỡng chuẩn theo từng xe, lắp khít nguyên bản.</li><li>Cài đặt sẵn các ứng dụng hữu ích: Vietmap dẫn đường, YouTube không quảng cáo, điều khiển giọng nói tiếng Việt Kiki.</li></ul></div></div><!-- Sản phẩm liên quan -->${relatedProducts.length > 0 && renderTemplate`<div class="mt-12 pt-8 border-t border-slate-200"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-slate-900">Sản Phẩm Cùng Phân Khúc</h2><a${addAttribute(`/san-pham?category=${product.categorySlug}`, "href")} class="text-xs font-semibold text-red-600 hover:underline">Xem thêm trong danh mục →</a></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">${relatedProducts.map((prod) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
		"id": prod.id,
		"slug": prod.slug,
		"name": prod.name,
		"brand": prod.brand,
		"categoryName": prod.categoryName,
		"price": prod.price,
		"salePrice": prod.salePrice,
		"image": prod.image,
		"specs": prod.specs,
		"warrantyMonths": prod.warrantyMonths,
		"isUniversal": prod.isUniversal
	})}`)}</div></div>`}</div><script>
    (function () {
      try {
        const path = window.location.pathname;
        const currentSlug = path.split('/').filter(Boolean).pop();
        const savedProdsRaw = localStorage.getItem('app_products');
        if (!savedProdsRaw) return;
        const products = JSON.parse(savedProdsRaw);
        const dynamicProd = products.find((p) => p.slug === currentSlug);
        if (!dynamicProd) return;

        // Cập nhật thông tin sản phẩm
        document.title = dynamicProd.name + ' - Dcar Auto Vietnam';
        const nameEl = document.getElementById('product-name-val');
        if (nameEl) nameEl.textContent = dynamicProd.name;

        const breadcrumbName = document.getElementById('product-breadcrumb-name');
        if (breadcrumbName) breadcrumbName.textContent = dynamicProd.name;

        const nameFooter = document.getElementById('product-name-footer');
        if (nameFooter) nameFooter.textContent = dynamicProd.name;

        const brandEl = document.getElementById('product-brand-val');
        if (brandEl) brandEl.textContent = dynamicProd.brand;

        const skuEl = document.getElementById('product-sku-val');
        if (skuEl) skuEl.textContent = dynamicProd.sku;

        const imgEl = document.getElementById('main-product-image');
        if (imgEl && dynamicProd.image) imgEl.src = dynamicProd.image;

        const hasDiscount = dynamicProd.salePrice && dynamicProd.salePrice < dynamicProd.price;
        const currentPrice = hasDiscount ? dynamicProd.salePrice : dynamicProd.price;

        const priceEl = document.getElementById('product-price-val');
        if (priceEl) priceEl.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentPrice);

        const oldPriceEl = document.getElementById('product-oldprice-val');
        if (oldPriceEl) {
          if (hasDiscount) {
            oldPriceEl.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dynamicProd.price);
            oldPriceEl.classList.remove('hidden');
          } else {
            oldPriceEl.classList.add('hidden');
          }
        }

        const warrantyEl = document.getElementById('product-warranty-val');
        if (warrantyEl) warrantyEl.textContent = dynamicProd.warrantyMonths || 24;

        const descEl = document.getElementById('product-description-text');
        if (descEl && dynamicProd.description) descEl.textContent = dynamicProd.description;

        // Cập nhật thông số
        const specsContainer = document.getElementById('product-specs-list');
        if (specsContainer && dynamicProd.specs && dynamicProd.specs.length > 0) {
          specsContainer.innerHTML = dynamicProd.specs.map(function (s) {
            return '<div class="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium">✓ ' + s + '</div>';
          }).join('');
        }

        // Cập nhật nút Zalo
        const zaloBtn = document.getElementById('product-zalo-btn');
        if (zaloBtn) {
          const zaloMsg = encodeURIComponent('Chào shop Dcar Auto, tôi quan tâm sản phẩm "' + dynamicProd.name + '" (Mã: ' + dynamicProd.sku + '). Cho tôi xin báo giá trọn gói thi công cho xe.');
          zaloBtn.href = 'https://zalo.me/0977694364?text=' + zaloMsg;
        }
      } catch (err) {
        console.error('Error hydrating product detail:', err);
      }
    })();
  <\/script>` })}`;
}, "C:/Users/gggle/OneDrive/Documents/bababab/src/pages/san-pham/[slug].astro", void 0);
var $$file = "C:/Users/gggle/OneDrive/Documents/bababab/src/pages/san-pham/[slug].astro";
var $$url = "/san-pham/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/san-pham/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
