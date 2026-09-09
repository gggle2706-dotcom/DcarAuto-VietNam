import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_Klmzst-W.mjs";
import { t as createComponent } from "./compiler_BRFb4go0.mjs";
import { i as DEFAULT_SHOP_SETTINGS, n as CAR_BRANDS_SAMPLE, r as CATEGORIES_LIST, t as $$Layout } from "./Layout_Bl7_188Z.mjs";
import { n as MOCK_POSTS, t as parseVideoUrl } from "./video-helpers_CTX83E6X.mjs";
import { t as MOCK_PRODUCTS } from "./mock-products_B-uxnCdY.mjs";
import { t as $$ProductCard } from "./ProductCard_DdYE0tor.mjs";
import React, { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/CarSelectorWidget.tsx
var CAR_DATA = {
	toyota: {
		name: "Toyota",
		models: [
			{
				id: "vios",
				name: "Vios",
				years: "2014 - 2024"
			},
			{
				id: "camry",
				name: "Camry",
				years: "2012 - 2024"
			},
			{
				id: "corolla-cross",
				name: "Corolla Cross",
				years: "2020 - 2024"
			},
			{
				id: "fortuner",
				name: "Fortuner",
				years: "2012 - 2024"
			},
			{
				id: "veloz",
				name: "Veloz Cross",
				years: "2022 - 2024"
			},
			{
				id: "innova",
				name: "Innova",
				years: "2016 - 2024"
			}
		]
	},
	honda: {
		name: "Honda",
		models: [
			{
				id: "city",
				name: "City",
				years: "2014 - 2024"
			},
			{
				id: "civic",
				name: "Civic",
				years: "2016 - 2024"
			},
			{
				id: "cr-v",
				name: "CR-V",
				years: "2013 - 2024"
			},
			{
				id: "hr-v",
				name: "HR-V",
				years: "2018 - 2024"
			}
		]
	},
	hyundai: {
		name: "Hyundai",
		models: [
			{
				id: "accent",
				name: "Accent",
				years: "2018 - 2024"
			},
			{
				id: "tucson",
				name: "Tucson",
				years: "2016 - 2024"
			},
			{
				id: "santafe",
				name: "SantaFe",
				years: "2015 - 2024"
			},
			{
				id: "creta",
				name: "Creta",
				years: "2022 - 2024"
			}
		]
	},
	kia: {
		name: "Kia",
		models: [
			{
				id: "seltos",
				name: "Seltos",
				years: "2020 - 2024"
			},
			{
				id: "k3-cerato",
				name: "K3 / Cerato",
				years: "2016 - 2024"
			},
			{
				id: "carnival",
				name: "Carnival",
				years: "2016 - 2024"
			},
			{
				id: "sonet",
				name: "Sonet",
				years: "2021 - 2024"
			}
		]
	},
	mazda: {
		name: "Mazda",
		models: [
			{
				id: "mazda-3",
				name: "Mazda 3",
				years: "2015 - 2024"
			},
			{
				id: "cx-5",
				name: "CX-5",
				years: "2013 - 2024"
			},
			{
				id: "cx-8",
				name: "CX-8",
				years: "2019 - 2024"
			}
		]
	},
	ford: {
		name: "Ford",
		models: [
			{
				id: "ranger",
				name: "Ranger",
				years: "2015 - 2024"
			},
			{
				id: "everest",
				name: "Everest",
				years: "2016 - 2024"
			},
			{
				id: "territory",
				name: "Territory",
				years: "2022 - 2024"
			}
		]
	},
	vinfast: {
		name: "VinFast",
		models: [
			{
				id: "vf-3",
				name: "VF 3",
				years: "2024"
			},
			{
				id: "vf-5",
				name: "VF 5",
				years: "2023 - 2024"
			},
			{
				id: "vf-8",
				name: "VF 8",
				years: "2022 - 2024"
			},
			{
				id: "fadil",
				name: "Fadil",
				years: "2019 - 2023"
			}
		]
	},
	mitsubishi: {
		name: "Mitsubishi",
		models: [
			{
				id: "xpander",
				name: "Xpander",
				years: "2018 - 2024"
			},
			{
				id: "xforce",
				name: "Xforce",
				years: "2024"
			},
			{
				id: "outlander",
				name: "Outlander",
				years: "2016 - 2024"
			}
		]
	}
};
function CarSelectorWidget() {
	const [selectedBrand, setSelectedBrand] = useState("");
	const [selectedModel, setSelectedModel] = useState("");
	const [selectedYear, setSelectedYear] = useState("");
	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const p = new URLSearchParams(window.location.search);
			const b = (p.get("brand") || "").toLowerCase();
			const m = (p.get("model") || "").toLowerCase();
			const y = p.get("year") || "";
			if (b && CAR_DATA[b]) {
				setSelectedBrand(b);
				if (m) setSelectedModel(m);
				if (y) setSelectedYear(y);
			}
		}
	}, []);
	const currentModels = selectedBrand && CAR_DATA[selectedBrand] ? CAR_DATA[selectedBrand].models : [];
	const handleBrandChange = (e) => {
		setSelectedBrand(e.target.value);
		setSelectedModel("");
		setSelectedYear("");
	};
	const handleSearch = (e) => {
		e.preventDefault();
		if (!selectedBrand) return;
		const params = new URLSearchParams();
		params.set("brand", selectedBrand);
		if (selectedModel) params.set("model", selectedModel);
		if (selectedYear) params.set("year", selectedYear);
		window.location.href = `/tim-theo-xe?${params.toString()}`;
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "w-full max-w-3xl mx-auto rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-md text-slate-900",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "text-left mb-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-slate-900 font-bold text-sm sm:text-base",
				children: "Tra cứu phụ kiện chuẩn theo dòng xe"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-slate-500 text-xs",
				children: "Chọn dòng xe của bạn để xem danh sách màn hình có sẵn mặt dưỡng zin, camera và phụ kiện tương thích."
			})]
		}), /* @__PURE__ */ jsxs("form", {
			onSubmit: handleSearch,
			className: "grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "brand-select",
					className: "block text-slate-700 font-medium mb-1",
					children: "1. Hãng xe"
				}), /* @__PURE__ */ jsxs("select", {
					id: "brand-select",
					value: selectedBrand,
					onChange: handleBrandChange,
					className: "w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "-- Chọn Hãng --"
					}), Object.entries(CAR_DATA).map(([key, item]) => /* @__PURE__ */ jsx("option", {
						value: key,
						children: item.name
					}, key))]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "model-select",
					className: "block text-slate-700 font-medium mb-1",
					children: "2. Dòng xe"
				}), /* @__PURE__ */ jsxs("select", {
					id: "model-select",
					value: selectedModel,
					disabled: !selectedBrand,
					onChange: (e) => setSelectedModel(e.target.value),
					className: "w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 disabled:opacity-50 focus:outline-none focus:border-red-600 focus:bg-white transition",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "-- Chọn Dòng Xe --"
					}), currentModels.map((m) => /* @__PURE__ */ jsx("option", {
						value: m.id,
						children: m.name
					}, m.id))]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "year-select",
					className: "block text-slate-700 font-medium mb-1",
					children: "3. Đời xe (Năm)"
				}), /* @__PURE__ */ jsxs("select", {
					id: "year-select",
					value: selectedYear,
					disabled: !selectedModel,
					onChange: (e) => setSelectedYear(e.target.value),
					className: "w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 disabled:opacity-50 focus:outline-none focus:border-red-600 focus:bg-white transition",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "-- Tất cả các đời --"
					}), [
						2025,
						2024,
						2023,
						2022,
						2021,
						2020,
						2019,
						2018,
						2017,
						2016,
						2015
					].map((y) => /* @__PURE__ */ jsxs("option", {
						value: y,
						children: ["Đời ", y]
					}, y))]
				})] }),
				/* @__PURE__ */ jsx("div", {
					className: "flex items-end",
					children: /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: !selectedBrand,
						className: "w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold transition active:scale-95 shadow-xs",
						children: "Tìm Phụ Kiện"
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
	const latestPosts = MOCK_POSTS.slice(0, 3);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section class="bg-gradient-to-b from-slate-100 to-slate-50 py-10 sm:py-16 px-4 sm:px-6 border-b border-slate-200"><div class="max-w-6xl mx-auto text-center space-y-4"><h1 class="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Nâng Cấp Phụ Kiện & Đồ Chơi Công Nghệ Ô Tô</h1><p class="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">Phân phối và lắp đặt Màn hình Android, Camera 360, Âm thanh, Độ đèn Bi LED, Cảm biến áp suất lốp chuẩn giắc zin 100% theo từng đời xe.</p><!-- Widget Tra cứu theo xe --><div class="pt-2">${renderComponent($$result, "CarSelectorWidget", CarSelectorWidget, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/CarSelectorWidget",
		"client:component-export": "default"
	})}</div><!-- 4 Cam kết ngắn gọn --><div class="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left text-xs text-slate-600"><div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span><span>100% Cắm giắc zin theo xe</span></div><div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span><span>Bảo hành chính hãng 12 - 36 tháng</span></div><div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span><span>Hỗ trợ kỹ thuật trọn đời</span></div><div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span><span>Hỗ trợ lắp đặt tận nơi</span></div></div></div></section><section class="py-12 px-4 sm:px-6 max-w-7xl mx-auto"><div class="flex items-center justify-between mb-6"><h2 class="text-lg sm:text-xl font-bold text-slate-900">Danh Mục Sản Phẩm</h2><a href="/san-pham" class="text-xs font-semibold text-slate-600 hover:text-red-600 transition">Xem tất cả →</a></div><div id="home-categories-grid" class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">${CATEGORIES_LIST.map((cat) => renderTemplate`<a${addAttribute(`/san-pham?category=${cat.slug}`, "href")} class="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-md transition flex flex-col justify-between group"><div class="font-bold text-slate-800 group-hover:text-red-600 transition text-sm">${cat.name}</div><span class="text-[11px] text-slate-400 mt-3 flex items-center gap-1 group-hover:text-red-600 transition"><span>Xem phụ kiện</span><span>→</span></span></a>`)}</div></section><section class="py-12 px-4 sm:px-6 bg-slate-100/70 border-y border-slate-200"><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-6"><div><h2 class="text-lg sm:text-xl font-bold text-slate-900">Sản Phẩm Được Lắp Đặt Nhiều Nhất</h2><p class="text-xs text-slate-500 mt-0.5">Sản phẩm chính hãng, đầy đủ mặt dưỡng zin và canbus theo xe</p></div><a href="/san-pham" class="text-xs font-semibold text-slate-600 hover:text-red-600 transition">Xem toàn bộ (<span id="home-products-count">${MOCK_PRODUCTS.length}</span>) →</a></div><div id="home-featured-products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">${featuredProducts.map((prod) => renderTemplate`${renderComponent($$result, "ProductCard", $$ProductCard, {
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
	})}`)}</div></div></section><section class="py-12 px-4 sm:px-6 max-w-7xl mx-auto"><div class="text-center max-w-xl mx-auto mb-8"><h2 class="text-lg sm:text-xl font-bold text-slate-900">Tra Cứu Theo Hãng Xe Của Bạn</h2><p class="text-xs text-slate-500 mt-1">Bấm chọn hãng xe để xem ngay toàn bộ phụ kiện tương thích</p></div><div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">${CAR_BRANDS_SAMPLE.map((brand) => renderTemplate`<a${addAttribute(`/tim-theo-xe?brand=${brand.slug}`, "href")} class="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-sm text-center transition flex flex-col items-center justify-center gap-2 group"><div class="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-red-50 text-slate-700 group-hover:text-red-600 font-extrabold text-sm flex items-center justify-center transition">${brand.name[0]}</div><span class="font-semibold text-xs text-slate-700 group-hover:text-red-600 transition">${brand.name}</span></a>`)}</div></section><section class="py-12 px-4 sm:px-6 bg-slate-50 border-t border-slate-200"><div class="max-w-7xl mx-auto"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8"><div><div class="flex items-center gap-2 mb-1"><span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span><span class="text-xs font-bold text-red-600 uppercase tracking-wider">Video & Hình Ảnh Thực Tế</span></div><h2 class="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Kinh Nghiệm & Dự Án Đã Thi Công</h2><p class="text-xs text-slate-500 mt-0.5">Xem thực tế hình ảnh lắp đặt màn hình, độ đèn bi LED, cách âm và loa sub trên từng dòng xe</p></div><a href="/blog" class="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1 shrink-0"><span>Xem tất cả bài viết & video</span><span>→</span></a></div><div id="home-latest-posts-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6">${latestPosts.map((post) => {
		const video = parseVideoUrl(post.videoUrl);
		return renderTemplate`<article class="flex flex-col rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition overflow-hidden group"><a${addAttribute(`/blog/${post.slug}`, "href")} class="relative aspect-video overflow-hidden bg-slate-100 block"><img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="w-full h-full object-cover group-hover:scale-103 transition duration-300"><span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 text-slate-800 border border-slate-200 shadow-2xs">${post.category}</span>${video && renderTemplate`<span${addAttribute(`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs flex items-center gap-1 ${video.badgeBg}`, "class")}><span>▶</span><span>Video ${video.platformName}</span></span>`}</a><div class="p-4 flex-1 flex flex-col justify-between text-xs"><div><div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5"><span>${post.publishedAt}</span>${post.relatedCar && renderTemplate`<span class="text-slate-600 font-semibold truncate max-w-[140px]">🚗 ${post.relatedCar}</span>`}</div><h3 class="font-bold text-sm text-slate-900 group-hover:text-red-600 transition line-clamp-2 mb-2 leading-snug"><a${addAttribute(`/blog/${post.slug}`, "href")}>${post.title}</a></h3><p class="text-slate-600 line-clamp-2 leading-relaxed">${post.excerpt}</p></div><div class="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">${post.relatedProductIds && post.relatedProductIds.length > 0 ? renderTemplate`<span class="text-[11px] text-emerald-700 font-medium">🛠️ ${post.relatedProductIds.length} phụ kiện gắn kèm</span>` : renderTemplate`<span class="text-[11px] text-slate-400">Tư vấn kỹ thuật</span>`}<a${addAttribute(`/blog/${post.slug}`, "href")} class="text-red-600 hover:underline font-semibold flex items-center gap-1"><span>Xem dự án</span><span>→</span></a></div></div></article>`;
	})}</div></div></section><section class="py-12 px-4 sm:px-6 bg-white border-t border-slate-200"><div class="max-w-4xl mx-auto text-center space-y-4"><h2 class="text-xl sm:text-2xl font-bold text-slate-900">Bạn Chưa Rõ Xe Của Mình Lắp Được Những Gì?</h2><p class="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">Hãy chụp ảnh bảng điều khiển hoặc nhắn tên dòng xe qua Zalo, kỹ thuật viên sẽ tư vấn cụ thể loại màn hình, mặt dưỡng và báo giá trọn gói thi công.</p><div class="flex flex-wrap items-center justify-center gap-3 pt-2"><a${addAttribute(`https://zalo.me/${DEFAULT_SHOP_SETTINGS.zalo}`, "href")} target="_blank" rel="noopener noreferrer" class="shop-zalo-link px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition">Nhắn Zalo Kỹ Thuật Viên (<span class="shop-zalo-val">${DEFAULT_SHOP_SETTINGS.zalo}</span>)</a><a${addAttribute(`tel:${DEFAULT_SHOP_SETTINGS.phone.replace(/[^0-9]/g, "")}`, "href")} class="shop-phone-link px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition">Gọi Hotline: <span class="shop-phone-val">${DEFAULT_SHOP_SETTINGS.phone}</span></a></div></div></section><script>
    (function () {
      try {
        const formatVND = function (n) {
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
        };

        const parseVideoBadge = function (url) {
          if (!url) return null;
          const u = url.toLowerCase();
          if (u.includes('youtube.com') || u.includes('youtu.be')) return { name: 'YouTube', bg: 'bg-red-600 text-white' };
          if (u.includes('tiktok.com')) return { name: 'TikTok', bg: 'bg-slate-950 text-white' };
          if (u.includes('facebook.com') || u.includes('fb.watch')) return { name: 'Facebook', bg: 'bg-blue-600 text-white' };
          return { name: 'Video', bg: 'bg-slate-800 text-white' };
        };

        // 1. Hydrate Categories
        const savedCats = localStorage.getItem('app_categories');
        if (savedCats) {
          const cats = JSON.parse(savedCats);
          if (Array.isArray(cats) && cats.length > 0) {
            const catGrid = document.getElementById('home-categories-grid');
            if (catGrid) {
              catGrid.innerHTML = cats.map(function (c) {
                return '<a href="/san-pham?category=' + c.slug + '" class="p-4 rounded-xl bg-white border border-slate-200 hover:border-red-500 hover:shadow-md transition flex flex-col justify-between group">' +
                  '<div class="font-bold text-slate-800 group-hover:text-red-600 transition text-sm">' + c.name + '</div>' +
                  '<span class="text-[11px] text-slate-400 mt-3 flex items-center gap-1 group-hover:text-red-600 transition">' +
                  '<span>Xem phụ kiện</span><span>→</span></span></a>';
              }).join('');
            }
          }
        }

        // 2. Hydrate Featured Products
        const savedProds = localStorage.getItem('app_products');
        if (savedProds) {
          const prods = JSON.parse(savedProds);
          if (Array.isArray(prods) && prods.length > 0) {
            const countEl = document.getElementById('home-products-count');
            if (countEl) countEl.textContent = prods.length;

            const featured = prods.filter(function (p) { return p.isFeatured; }).slice(0, 8);
            const displayProds = featured.length > 0 ? featured : prods.slice(0, 8);
            const prodGrid = document.getElementById('home-featured-products-grid');
            if (prodGrid) {
              prodGrid.innerHTML = displayProds.map(function (p) {
                const hasDiscount = p.salePrice && p.salePrice < p.price;
                const discountPct = hasDiscount ? Math.round(((p.price - p.salePrice) / p.price) * 100) : 0;
                const specs = Array.isArray(p.specs) ? p.specs.slice(0, 3) : [];

                return '<div class="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between group">' +
                  '<div>' +
                    '<a href="/san-pham/' + p.slug + '" class="block relative aspect-4/3 bg-slate-50 overflow-hidden">' +
                      '<img src="' + p.image + '" alt="' + p.name + '" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src=\\'/images/placeholder.jpg\\'" />' +
                      (hasDiscount ? '<span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white shadow-2xs">-' + discountPct + '%</span>' : '') +
                      '<span class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/80 text-white backdrop-blur-xs">' + (p.warrantyMonths || 24) + 'T BH</span>' +
                    '</a>' +
                    '<div class="p-3.5">' +
                      '<div class="text-[11px] text-slate-400 font-medium mb-1">' + (p.brand || 'Chính hãng') + '</div>' +
                      '<h3 class="font-bold text-xs text-slate-800 line-clamp-2 min-h-8 mb-2 group-hover:text-red-600 transition">' +
                        '<a href="/san-pham/' + p.slug + '">' + p.name + '</a>' +
                      '</h3>' +
                      (specs.length > 0 ? (
                        '<div class="space-y-1 py-1.5 mb-2 border-y border-slate-100">' +
                          specs.map(function (s) {
                            return '<div class="text-[11px] text-slate-600 truncate flex items-center gap-1.5">' +
                              '<span class="text-emerald-600 font-bold">✓</span>' +
                              '<span class="text-slate-400 font-medium">' + s.k + ':</span>' +
                              '<span class="font-semibold text-slate-700">' + s.v + '</span>' +
                            '</div>';
                          }).join('') +
                        '</div>'
                      ) : '') +
                    '</div>' +
                  '</div>' +
                  '<div class="p-3.5 pt-0 mt-auto">' +
                    '<div class="flex items-baseline justify-between mb-3">' +
                      '<div>' +
                        '<span class="text-sm font-extrabold text-red-600">' + formatVND(p.salePrice || p.price) + '</span>' +
                        (hasDiscount ? '<div class="text-[10px] text-slate-400 line-through">' + formatVND(p.price) + '</div>' : '') +
                      '</div>' +
                      '<span class="text-[10px] text-slate-400 font-medium">' + (p.categoryName || '') + '</span>' +
                    '</div>' +
                    '<a href="/san-pham/' + p.slug + '" class="block w-full text-center py-2 rounded-lg bg-slate-900 hover:bg-red-600 text-white font-bold text-xs transition">' +
                      'Xem Chi Tiết & Báo Giá' +
                    '</a>' +
                  '</div>' +
                '</div>';
              }).join('');
            }
          }
        }

        // 3. Hydrate Latest Posts
        const savedPosts = localStorage.getItem('app_posts');
        if (savedPosts) {
          const posts = JSON.parse(savedPosts);
          if (Array.isArray(posts) && posts.length > 0) {
            const latest = posts.slice(0, 3);
            const postGrid = document.getElementById('home-latest-posts-grid');
            if (postGrid) {
              postGrid.innerHTML = latest.map(function (post) {
                const vid = parseVideoBadge(post.videoUrl);
                const hasRel = post.relatedProductIds && post.relatedProductIds.length > 0;

                return '<article class="flex flex-col rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition overflow-hidden group">' +
                  '<a href="/blog/' + post.slug + '" class="relative aspect-video overflow-hidden bg-slate-100 block">' +
                    '<img src="' + post.image + '" alt="' + post.title + '" class="w-full h-full object-cover group-hover:scale-103 transition duration-300" onerror="this.src=\\'/images/placeholder.jpg\\'" />' +
                    '<span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 text-slate-800 border border-slate-200 shadow-2xs">' + (post.category || 'Chia sẻ') + '</span>' +
                    (vid ? '<span class="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold shadow-xs flex items-center gap-1 ' + vid.bg + '"><span>▶</span><span>Video ' + vid.name + '</span></span>' : '') +
                  '</a>' +
                  '<div class="p-4 flex-1 flex flex-col justify-between text-xs">' +
                    '<div>' +
                      '<div class="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">' +
                        '<span>' + (post.publishedAt || '') + '</span>' +
                        (post.relatedCar ? '<span class="text-slate-600 font-semibold truncate max-w-[140px]">🚗 ' + post.relatedCar + '</span>' : '') +
                      '</div>' +
                      '<h3 class="font-bold text-sm text-slate-900 group-hover:text-red-600 transition line-clamp-2 mb-2 leading-snug">' +
                        '<a href="/blog/' + post.slug + '">' + post.title + '</a>' +
                      '</h3>' +
                      '<p class="text-slate-600 line-clamp-2 leading-relaxed">' + (post.excerpt || '') + '</p>' +
                    '</div>' +
                    '<div class="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">' +
                      (hasRel ? '<span class="text-[11px] text-emerald-700 font-medium">🛠️ ' + post.relatedProductIds.length + ' phụ kiện gắn kèm</span>' : '<span class="text-[11px] text-slate-400">Tư vấn kỹ thuật</span>') +
                      '<a href="/blog/' + post.slug + '" class="text-red-600 hover:underline font-semibold flex items-center gap-1"><span>Xem dự án</span><span>→</span></a>' +
                    '</div>' +
                  '</div>' +
                '</article>';
              }).join('');
            }
          }
        }
      } catch (e) {
        console.error('Home hydration error:', e);
      }
    })();
  <\/script>` })}`;
}, "C:/Users/gggle/OneDrive/Documents/bababab/src/pages/index.astro", void 0);
var $$file = "C:/Users/gggle/OneDrive/Documents/bababab/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
