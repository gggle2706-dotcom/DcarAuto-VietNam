import React, { useState } from 'react';

const CAR_DATA: Record<string, { name: string; models: { id: string; name: string; years: string }[] }> = {
  toyota: {
    name: 'Toyota',
    models: [
      { id: 'vios', name: 'Vios', years: '2014 - 2024' },
      { id: 'camry', name: 'Camry', years: '2012 - 2024' },
      { id: 'corolla-cross', name: 'Corolla Cross', years: '2020 - 2024' },
      { id: 'fortuner', name: 'Fortuner', years: '2012 - 2024' },
      { id: 'veloz', name: 'Veloz Cross', years: '2022 - 2024' },
      { id: 'innova', name: 'Innova', years: '2016 - 2024' },
    ],
  },
  honda: {
    name: 'Honda',
    models: [
      { id: 'city', name: 'City', years: '2014 - 2024' },
      { id: 'civic', name: 'Civic', years: '2016 - 2024' },
      { id: 'cr-v', name: 'CR-V', years: '2013 - 2024' },
      { id: 'hr-v', name: 'HR-V', years: '2018 - 2024' },
    ],
  },
  hyundai: {
    name: 'Hyundai',
    models: [
      { id: 'accent', name: 'Accent', years: '2018 - 2024' },
      { id: 'tucson', name: 'Tucson', years: '2016 - 2024' },
      { id: 'santafe', name: 'SantaFe', years: '2015 - 2024' },
      { id: 'creta', name: 'Creta', years: '2022 - 2024' },
    ],
  },
  kia: {
    name: 'Kia',
    models: [
      { id: 'seltos', name: 'Seltos', years: '2020 - 2024' },
      { id: 'k3-cerato', name: 'K3 / Cerato', years: '2016 - 2024' },
      { id: 'carnival', name: 'Carnival', years: '2016 - 2024' },
      { id: 'sonet', name: 'Sonet', years: '2021 - 2024' },
    ],
  },
  mazda: {
    name: 'Mazda',
    models: [
      { id: 'mazda-3', name: 'Mazda 3', years: '2015 - 2024' },
      { id: 'cx-5', name: 'CX-5', years: '2013 - 2024' },
      { id: 'cx-8', name: 'CX-8', years: '2019 - 2024' },
    ],
  },
  ford: {
    name: 'Ford',
    models: [
      { id: 'ranger', name: 'Ranger', years: '2015 - 2024' },
      { id: 'everest', name: 'Everest', years: '2016 - 2024' },
      { id: 'territory', name: 'Territory', years: '2022 - 2024' },
    ],
  },
  vinfast: {
    name: 'VinFast',
    models: [
      { id: 'vf-3', name: 'VF 3', years: '2024' },
      { id: 'vf-5', name: 'VF 5', years: '2023 - 2024' },
      { id: 'vf-8', name: 'VF 8', years: '2022 - 2024' },
      { id: 'fadil', name: 'Fadil', years: '2019 - 2023' },
    ],
  },
  mitsubishi: {
    name: 'Mitsubishi',
    models: [
      { id: 'xpander', name: 'Xpander', years: '2018 - 2024' },
      { id: 'xforce', name: 'Xforce', years: '2024' },
      { id: 'outlander', name: 'Outlander', years: '2016 - 2024' },
    ],
  },
};

export default function CarSelectorWidget() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const currentModels = selectedBrand && CAR_DATA[selectedBrand] ? CAR_DATA[selectedBrand].models : [];

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
    setSelectedYear('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) return;

    const params = new URLSearchParams();
    params.set('brand', selectedBrand);
    if (selectedModel) params.set('model', selectedModel);
    if (selectedYear) params.set('year', selectedYear);

    window.location.href = `/tim-theo-xe?${params.toString()}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl bg-white border border-slate-200 p-4 sm:p-5 shadow-md text-slate-900">
      <div className="text-left mb-3">
        <h2 className="text-slate-900 font-bold text-sm sm:text-base">
          Tra cứu phụ kiện chuẩn theo dòng xe
        </h2>
        <p className="text-slate-500 text-xs">
          Chọn dòng xe của bạn để xem danh sách màn hình có sẵn mặt dưỡng zin, camera và phụ kiện tương thích.
        </p>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
        {/* Chọn Hãng xe */}
        <div>
          <label htmlFor="brand-select" className="block text-slate-700 font-medium mb-1">
            1. Hãng xe
          </label>
          <select
            id="brand-select"
            value={selectedBrand}
            onChange={handleBrandChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 focus:outline-none focus:border-red-600 focus:bg-white transition"
          >
            <option value="">-- Chọn Hãng --</option>
            {Object.entries(CAR_DATA).map(([key, item]) => (
              <option key={key} value={key}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Chọn Dòng xe */}
        <div>
          <label htmlFor="model-select" className="block text-slate-700 font-medium mb-1">
            2. Dòng xe
          </label>
          <select
            id="model-select"
            value={selectedModel}
            disabled={!selectedBrand}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 disabled:opacity-50 focus:outline-none focus:border-red-600 focus:bg-white transition"
          >
            <option value="">-- Chọn Dòng Xe --</option>
            {currentModels.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Chọn Đời xe */}
        <div>
          <label htmlFor="year-select" className="block text-slate-700 font-medium mb-1">
            3. Đời xe (Năm)
          </label>
          <select
            id="year-select"
            value={selectedYear}
            disabled={!selectedModel}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-900 disabled:opacity-50 focus:outline-none focus:border-red-600 focus:bg-white transition"
          >
            <option value="">-- Tất cả các đời --</option>
            {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
              <option key={y} value={y}>Đời {y}</option>
            ))}
          </select>
        </div>

        {/* Nút bấm */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={!selectedBrand}
            className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold transition active:scale-95 shadow-xs"
          >
            Tìm Phụ Kiện
          </button>
        </div>
      </form>
    </div>
  );
}
