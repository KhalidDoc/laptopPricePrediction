import { useState } from "react";

const PredictionForm = ({ onPredict, loading }) => {
  const [form, setForm] = useState({
    Company: "",
    TypeName: "",
    Ram: "",
    Cpu: "",
    Inches: "",
    Weight: "",
    ScreenResolution: "",
    Memory: "",
    Gpu: "",
    OpSys: "",
  });

  const companies = [
    "Acer",
    "Apple",
    "Asus",
    "Chuwi",
    "Dell",
    "Fujitsu",
    "Google",
    "HP",
    "Huawei",
    "LG",
    "Lenovo",
    "MSI",
    "Mediacom",
    "Microsoft",
    "Razer",
    "Samsung",
    "Toshiba",
    "Vero",
    "Xiaomi",
  ];

  const types = [
    "Notebook",
    "Gaming",
    "Ultrabook",
    "Workstation",
    "Netbook",
    "2 in 1 Convertible",
  ];

  const rams = [2, 4, 8, 12, 16, 24, 32, 64];
  const cpus = ["i3", "i5", "i7", "celeron", "atom"];

  const screens = [
    "1366x768",
    "1600x900",
    "1920x1080",
    "2560x1440",
    "3840x2160",
  ];

  const storage = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB HDD",
    "2TB HDD",
    "256GB SSD + 1TB HDD",
  ];

  const gpus = ["Intel", "Nvidia", "AMD"];

  const osList = [
    "Windows 10",
    "Windows 10 S",
    "Windows 7",
    "Mac OS X",
    "macOS",
    "Linux",
    "Chrome OS",
    "Android",
    "No OS",
  ];

  const handleSubmit = () => {
    onPredict(form);
  };

  const inputStyle =
    "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 " +
    "border border-slate-300 dark:border-white/10 " +
    "bg-white dark:bg-slate-900/60 " +
    "text-slate-800 dark:text-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500";

  return (
    <div className="flex flex-col h-full transition-colors duration-500">
      <h3
        className="text-xl font-semibold mb-6 tracking-tight 
        bg-linear-to-r from-blue-500 to-cyan-500 
        bg-clip-text text-transparent"
      >
        Enter Specifications
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Company: e.target.value })}
        >
          <option value="">Company</option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, TypeName: e.target.value })}
        >
          <option value="">Type</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Ram: e.target.value })}
        >
          <option value="">RAM</option>
          {rams.map((r) => (
            <option key={r} value={r}>
              {r} GB
            </option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Cpu: e.target.value })}
        >
          <option value="">CPU Tier</option>
          {cpus.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) =>
            setForm({ ...form, ScreenResolution: e.target.value })
          }
        >
          <option value="">Resolution</option>
          {screens.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Memory: e.target.value })}
        >
          <option value="">Storage</option>
          {storage.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Gpu: e.target.value })}
        >
          <option value="">GPU Brand</option>
          {gpus.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) => setForm({ ...form, OpSys: e.target.value })}
        >
          <option value="">Operating System</option>
          {osList.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        <input
          type="number"
          step="0.1"
          placeholder="Screen Size (Inches)"
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Inches: e.target.value })}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Weight (kg)"
          className={inputStyle}
          onChange={(e) => setForm({ ...form, Weight: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full rounded-xl py-3 font-medium tracking-wide
        bg-linear-to-r from-blue-600 to-indigo-600
        hover:from-blue-700 hover:to-indigo-700
        text-white
        transition-all duration-300 shadow-lg shadow-blue-500/20
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Predicting...
          </span>
        ) : (
          "Predict Price"
        )}
      </button>
    </div>
  );
};

export default PredictionForm;
