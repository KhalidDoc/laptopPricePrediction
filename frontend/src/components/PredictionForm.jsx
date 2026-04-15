import { useState, useEffect } from "react";
const BASE_URL =
  import.meta.env.VITE_API_URL ??
  "https://laptoppriceprediction-5tom.onrender.com";

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

  const [options, setOptions] = useState(null);

  // -----------------------------
  // FETCH OPTIONS
  // -----------------------------
  useEffect(() => {
    fetch(`${BASE_URL}/api/options`)
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((err) => console.error("Error loading options:", err));
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    for (let key in form) {
      if (form[key] === "") {
        alert(`Please fill the ${key} field`);
        return;
      }
    }
    onPredict(form);
  };

  // -----------------------------
  // SHARED STYLES
  // -----------------------------
  const labelStyle =
    "block text-xs font-medium text-slate-400 mb-1.5 ml-1 uppercase tracking-wider";

  const inputStyle =
    "w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 " +
    "border border-white/10 bg-slate-900/60 text-white " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent " +
    "appearance-none cursor-pointer";

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  if (!options) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
        <p className="animate-pulse">Loading specifications...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="mb-8">
        <h3 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Laptop Specifications
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Provide the hardware details to estimate price.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {/* Company */}
        <div className="relative">
          <label className={labelStyle}>Brand</label>
          <select
            className={inputStyle}
            value={form.Company}
            onChange={(e) => handleChange("Company", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Brand
            </option>
            {options.Company.map((c) => (
              <option key={c} value={c} className="bg-slate-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="relative">
          <label className={labelStyle}>Laptop Category</label>
          <select
            className={inputStyle}
            value={form.TypeName}
            onChange={(e) => handleChange("TypeName", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Type
            </option>
            {options.TypeName.map((t) => (
              <option key={t} value={t} className="bg-slate-900">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* RAM */}
        <div className="relative">
          <label className={labelStyle}>Memory (RAM)</label>
          <select
            className={inputStyle}
            value={form.Ram}
            onChange={(e) => handleChange("Ram", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select RAM
            </option>
            {options.Ram.map((r) => (
              <option key={r} value={r} className="bg-slate-900">
                {r} GB
              </option>
            ))}
          </select>
        </div>

        {/* CPU */}
        <div className="relative">
          <label className={labelStyle}>Processor (CPU)</label>
          <select
            className={inputStyle}
            value={form.Cpu}
            onChange={(e) => handleChange("Cpu", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Processor
            </option>
            {options.Cpu.map((c) => (
              <option key={c} value={c} className="bg-slate-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Screen */}
        <div className="relative">
          <label className={labelStyle}>Resolution</label>
          <select
            className={inputStyle}
            value={form.ScreenResolution}
            onChange={(e) => handleChange("ScreenResolution", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Resolution
            </option>
            {options.ScreenResolution.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Storage */}
        <div className="relative">
          <label className={labelStyle}>Storage (Hard Drive/SSD)</label>
          <select
            className={inputStyle}
            value={form.Memory}
            onChange={(e) => handleChange("Memory", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Storage
            </option>
            {options.Memory.map((m) => (
              <option key={m} value={m} className="bg-slate-900">
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* GPU */}
        <div className="relative">
          <label className={labelStyle}>Graphics (GPU)</label>
          <select
            className={inputStyle}
            value={form.Gpu}
            onChange={(e) => handleChange("Gpu", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select Graphics
            </option>
            {options.Gpu.map((g) => (
              <option key={g} value={g} className="bg-slate-900">
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* OS */}
        <div className="relative">
          <label className={labelStyle}>Operating System</label>
          <select
            className={inputStyle}
            value={form.OpSys}
            onChange={(e) => handleChange("OpSys", e.target.value)}
          >
            <option value="" disabled className="bg-slate-900">
              Select OS
            </option>
            {options.OpSys.map((o) => (
              <option key={o} value={o} className="bg-slate-900">
                {o}
              </option>
            ))}
          </select>
        </div>

        {/* Inches */}
        <div className="relative">
          <label className={labelStyle}>Screen Size (Inches)</label>
          <input
            type="number"
            step="0.1"
            placeholder="e.g. 15.6"
            className={inputStyle + " cursor-text"}
            value={form.Inches}
            onChange={(e) => handleChange("Inches", e.target.value)}
          />
        </div>

        {/* Weight */}
        <div className="relative">
          <label className={labelStyle}>Weight (kg)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 2.1"
            className={inputStyle + " cursor-text"}
            value={form.Weight}
            onChange={(e) => handleChange("Weight", e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-10 w-full rounded-xl py-4 font-bold text-white transition-all shadow-xl flex items-center justify-center gap-2
          ${
            loading
              ? "bg-slate-700 cursor-not-allowed opacity-70"
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] hover:shadow-blue-500/20"
          }`}
      >
        {loading ? (
          <>
            <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          "Predict Price"
        )}
      </button>
    </div>
  );
};

export default PredictionForm;
