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
    OpSys: ""
  });

  const companies = [
    "Acer","Apple","Asus","Chuwi","Dell","Fujitsu","Google","HP","Huawei",
    "LG","Lenovo","MSI","Mediacom","Microsoft","Razer","Samsung","Toshiba","Vero","Xiaomi"
  ];

  const types = [
    "Notebook",
    "Gaming",
    "Ultrabook",
    "Workstation",
    "Netbook",
    "2 in 1 Convertible"
  ];

  const rams = [2,4,8,12,16,24,32,64];

  const cpus = ["i3","i5","i7","celeron","atom"];

  const screens = [
    "1366x768",
    "1600x900",
    "1920x1080",
    "2560x1440",
    "3840x2160"
  ];

  const storage = [
    "128GB SSD",
    "256GB SSD",
    "512GB SSD",
    "1TB HDD",
    "2TB HDD",
    "256GB SSD + 1TB HDD"
  ];

  const gpus = [
    "Intel",
    "Nvidia",
    "AMD"
  ];

  const osList = [
    "Windows 10",
    "Windows 10 S",
    "Windows 7",
    "Mac OS X",
    "macOS",
    "Linux",
    "Chrome OS",
    "Android",
    "No OS"
  ];

  const handleSubmit = () => {
    onPredict(form);
  };

  return (
    <div className="glass-card">
      <h3>Enter Specifications</h3>

      <div className="form-grid">

        <select onChange={(e)=>setForm({...form,Company:e.target.value})}>
          <option value="">Company</option>
          {companies.map(c=> <option key={c}>{c}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,TypeName:e.target.value})}>
          <option value="">Type</option>
          {types.map(t=> <option key={t}>{t}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,Ram:e.target.value})}>
          <option value="">RAM</option>
          {rams.map(r=> <option key={r}>{r} GB</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,Cpu:e.target.value})}>
          <option value="">CPU Tier</option>
          {cpus.map(c=> <option key={c}>{c}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,ScreenResolution:e.target.value})}>
          <option value="">Resolution</option>
          {screens.map(s=> <option key={s}>{s}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,Memory:e.target.value})}>
          <option value="">Storage</option>
          {storage.map(s=> <option key={s}>{s}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,Gpu:e.target.value})}>
          <option value="">GPU Brand</option>
          {gpus.map(g=> <option key={g}>{g}</option>)}
        </select>

        <select onChange={(e)=>setForm({...form,OpSys:e.target.value})}>
          <option value="">Operating System</option>
          {osList.map(o=> <option key={o}>{o}</option>)}
        </select>

        <input
          type="number"
          placeholder="Screen Size (Inches)"
          onChange={(e)=>setForm({...form,Inches:e.target.value})}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          onChange={(e)=>setForm({...form,Weight:e.target.value})}
        />

      </div>

      <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </div>
  );
};

export default PredictionForm;
