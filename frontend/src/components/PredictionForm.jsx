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

  // -----------------------------
  // DATA (Aligned with Dataset)
  // -----------------------------

  const companies = [
    "Acer",
    "Apple",
    "Asus",
    "Dell",
    "HP",
    "Lenovo",
    "MSI",
    "Razer",
    "Samsung",
  ];

  const types = [
    "Notebook",
    "Gaming",
    "Ultrabook",
    "Workstation",
    "2 in 1 Convertible",
  ];

  const rams = [4, 8, 16, 32, 64];

  const cpus = [
    "Intel Core i3-6006U 2.0GHz",
    "Intel Core i5-8250U 1.6GHz",
    "Intel Core i5-7200U 2.5GHz",
    "Intel Core i7-7500U 2.7GHz",
    "Intel Core i7-8750H 2.2GHz",
    "Intel Core i9-8950HK 2.9GHz",
    "AMD Ryzen 3 2200U 2.5GHz",
    "AMD Ryzen 5 2500U 2.0GHz",
    "AMD Ryzen 7 2700U 2.2GHz",
  ];

  const screens = [
    "1366x768",
    "IPS 1920x1080",
    "Touch IPS 1920x1080",
    "IPS 2560x1440",
    "Touch IPS 3840x2160",
  ];

  const storage = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB HDD",
    "2TB HDD",
    "256GB SSD + 1TB HDD",
    "512GB SSD + 1TB HDD",
  ];

  const gpus = [
    "Intel HD Graphics 620",
    "Intel UHD Graphics 620",
    "Nvidia GTX 1050",
    "Nvidia GTX 1650",
    "Nvidia RTX 2060",
    "Nvidia RTX 3060",
    "AMD Radeon RX 560",
    "AMD Radeon Vega 8",
  ];

  const osList = [
    "Windows 10",
    "Windows 10 S",
    "Mac OS X",
    "macOS",
    "Linux",
    "No OS",
  ];

  // -----------------------------
  // HANDLER
  // -----------------------------

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    for (let key in form) {
      if (!form[key]) {
        alert(`Please fill ${key}`);
        return;
      }
    }

    onPredict(form);
  };

  // -----------------------------
  // STYLES
  // -----------------------------

  const inputStyle =
    "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 " +
    "border border-white/10 bg-slate-900/60 text-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500/60";

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-6 bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
        Enter Specifications
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("Company", e.target.value)}
        >
          <option value="">Company</option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Type */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("TypeName", e.target.value)}
        >
          <option value="">Type</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        {/* RAM */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("Ram", e.target.value)}
        >
          <option value="">RAM</option>
          {rams.map((r) => (
            <option key={r}>{r} GB</option>
          ))}
        </select>

        {/* CPU */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("Cpu", e.target.value)}
        >
          <option value="">CPU</option>
          {cpus.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Screen */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("ScreenResolution", e.target.value)}
        >
          <option value="">Screen</option>
          {screens.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* Storage */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("Memory", e.target.value)}
        >
          <option value="">Storage</option>
          {storage.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        {/* GPU */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("Gpu", e.target.value)}
        >
          <option value="">GPU</option>
          {gpus.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>

        {/* OS */}
        <select
          className={inputStyle}
          onChange={(e) => handleChange("OpSys", e.target.value)}
        >
          <option value="">OS</option>
          {osList.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>

        {/* Screen Size */}
        <input
          type="number"
          step="0.1"
          placeholder="Screen Size (Inches)"
          className={inputStyle}
          onChange={(e) => handleChange("Inches", e.target.value)}
        />

        {/* Weight */}
        <input
          type="number"
          step="0.01"
          placeholder="Weight (kg)"
          className={inputStyle}
          onChange={(e) => handleChange("Weight", e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-8 w-full rounded-xl py-3 font-medium
        bg-linear-to-r from-blue-600 to-indigo-600
        hover:from-blue-700 hover:to-indigo-700
        text-white transition-all shadow-lg"
      >
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </div>
  );
};

export default PredictionForm;
