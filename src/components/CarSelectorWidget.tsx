import React, { useState } from 'react';

// Dữ liệu mẫu ban đầu cho Car Fitment selector
const CAR_DATA: Record<string, { name: string; models: { id: string; name: string; years: string }[] }> = {
  toyota: {
    name: 'Toyota',
    models: [
      { id: 'vios', name: 'Vios', years: '2014 - 2024' },
      { id: 'camry', name: 'Camry', years: '2012 - 2024' },
      { id: 'corolla-cross', name: 'Corolla Cross', years: '2020 - 2024' },
      { id: 'fortuner', name: 'Fortuner', years: '2012 - 2024' },
      { id: 'innova', name: 'Innova / Cross', years: '2016 - 2024' },
      { id: 'veloz', name: 'Veloz Cross', years: '2022 - 2024' },
      { id: 'raize', name: 'Raize', years: '2021 - 2024' },
    ],
  },
  honda: {
    name: 'Honda',
    models: [
      { id: 'city', name: 'City', years: '2014 - 2024' },
      { id: 'civic', name: 'Civic', years: '2016 - 2024' },
      { id: 'cr-v', name: 'CR-V', years: '2013 - 2024' },
      { id: 'hr-v', name: 'HR-V', years: '2018 - 2024' },
      { id: 'br-v', name: 'BR-V', years: '2023 - 2024' },
    ],
  },
  hyundai: {
    name: 'Hyundai',
    models: [
      { id: 'accent', name: 'Accent', years: '2018 - 2024' },
      { id: 'tucson', name: 'Tucson', years: '2016 - 2024' },
      { id: 'santafe', name: 'SantaFe', years: '2015 - 2024' },
      { id: 'creta', name: 'Creta', years: '2022 - 2024' },
      { id: 'elantra', name: 'Elantra', years: '2016 - 2024' },
      { id: 'custin', name: 'Custin', years: '2023 - 2024' },
    ],
  },
  kia: {
    name: 'Kia',
    models: [
      { id: 'seltos', name: 'Seltos', years: '2020 - 2024' },
      { id: 'k3-cerato', name: 'K3 / Cerato', years: '2016 - 2024' },
      { id: 'carnival', name: 'Carnival / Sedona', years: '2016 - 2024' },
      { id: 'sonet', name: 'Sonet', years: '2021 - 2024' },
      { id: 'sorento', name: 'Sorento', years: '2016 - 2024' },
      { id: 'morning', name: 'Morning', years: '2012 - 2023' },
    ],
  },
  mazda: {
    name: 'Mazda',
    models: [
      { id: 'mazda-3', name: 'Mazda 3', years: '2015 - 2024' },
      { id: 'cx-5', name: 'CX-5', years: '2013 - 2024' },
      { id: 'mazda-2', name: 'Mazda 2', years: '2015 - 2024' },
      { id: 'cx-8', name: 'CX-8', years: '2019 - 2024' },
      { id: 'cx-30', name: 'CX-30', years: '2021 - 2024' },
    ],
  },
  ford: {
    name: 'Ford',
    models: [
      { id: 'ranger', name: 'Ranger / Raptor', years: '2015 - 2024' },
      { id: 'everest', name: 'Everest', years: '2016 - 2024' },
      { id: 'territory', name: 'Territory', years: '2022 - 2024' },
      { id: 'explorer', name: 'Explorer', years: '2016 - 2024' },
    ],
  },
  vinfast: {
    name: 'VinFast',
    models: [
      { id: 'fadil', name: 'Fadil', years: '2019 - 2023' },
      { id: 'lux-a', name: 'Lux A2.0', years: '2019 - 2023' },
      { id: 'lux-sa', name: 'Lux SA2.0', years: '2019 - 2023' },
      { id: 'vf-3', name: 'VF 3', years: '2024' },
      { id: 'vf-5', name: 'VF 5 Plus', years: '2023 - 2024' },
      { id: 'vf-6', name: 'VF 6', years: '2023 - 2024' },
      { id: 'vf-e34', name: 'VF e34', years: '2021 - 2024' },
      { id: 'vf-8', name: 'VF 8', years: '2022 - 2024' },
    ],
  },
  mitsubishi: {
    name: 'Mitsubishi',
    models: [
      { id: 'xpander', name: 'Xpander / Cross', years: '2018 - 2024' },
      { id: 'xforce', name: 'Xforce', years: '2024' },
      { id: 'outlander', name: 'Outlander', years: '2016 - 2024' },
      { id: 'attrage', name: 'Attrage', years: '2015 - 2024' },
      { id: 'triton', name: 'Triton', years: '2016 - 2024' },
    ],
  },
};

export default function CarSelectorWidget() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const currentModels = selectedBrand && CAR_DATA[selectedBrand] ? CAR_DATA[selectedBrand].models : [];

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleSearchByCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) return;

    const params = new URLSearchParams();
    params.set('brand', selectedBrand);
    if (selectedModel) params.set('model', selectedModel);
    if (selectedYear) params.set('year', selectedYear);

    window.location.href = `/tim-theo-xe?${params.toString()}`;
  };

  const handleKeywordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;
    window.location.href = `/san-pham?q=${encodeURIComponent(searchKeyword.trim())}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-slate-900/95 border border-slate-800 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 font-bold text-sm">
            🚗
          </div>
          <div>
            <h2 className="text-white font-bold text-sm sm:text-base">
              Tìm Phụ Kiện Chuẩn Theo Dòng Xe Của Bạn
            </h2>
            <p className="text-slate-400 text-xs hidden sm:block">
              Đảm bảo 100% cắm giắc zin, vừa vặn theo mặt dưỡng và hệ thống điện của xe
            </p>
          </div>
        </div>
      </div>

      {/* Form Chọn Xe */}
      <form onSubmit={handleSearchByCar} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* 1. Chọn Hãng xe */}
        <div>
          <label htmlFor="car-brand-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
            1. Hãng xe
          </label>
          <select
            id="car-brand-select"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
          >
            <option value="">-- Chọn Hãng Xe --</option>
            {Object.entries(CAR_DATA).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Chọn Dòng xe */}
        <div>
          <label htmlFor="car-model-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
            2. Dòng xe
          </label>
          <select
            id="car-model-select"
            value={selectedModel}
            disabled={!selectedBrand}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <option value="">-- Chọn Dòng Xe --</option>
            {currentModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.years})
              </option>
            ))}
          </select>
        </div>

        {/* 3. Năm sản xuất */}
        <div>
          <label htmlFor="car-year-select" className="block text-xs font-semibold text-slate-300 mb-1.5">
            3. Năm sản xuất (đời xe)
          </label>
          <select
            id="car-year-select"
            value={selectedYear}
            disabled={!selectedModel}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <option value="">-- Tất cả các đời --</option>
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012].map((year) => (
              <option key={year} value={year}>
                Năm {year}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Nút bấm Tìm kiếm */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={!selectedBrand}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Tìm Đồ Chơi Cho Xe</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </form>

      {/* Quick Search bằng từ khóa */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Gợi ý tìm kiếm:</span>
          <a href="/san-pham?q=man-hinh" className="text-amber-400 hover:underline">Màn hình Android</a>,
          <a href="/san-pham?q=camera-360" className="text-amber-400 hover:underline">Camera 360</a>,
          <a href="/san-pham?q=bi-led" className="text-amber-400 hover:underline">Bi LED</a>,
          <a href="/san-pham?q=sub" className="text-amber-400 hover:underline">Loa Sub gầm</a>
        </div>

        <form onSubmit={handleKeywordSearch} className="flex items-center gap-1 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Hoặc gõ tên sản phẩm..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 w-full sm:w-48"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 shrink-0"
          >
            Tìm
          </button>
        </form>
      </div>
    </div>
  );
}
