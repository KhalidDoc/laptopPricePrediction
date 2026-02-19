import { useState } from "react";

const PredictionForm = ({ onPredict, loading }) => {
  const [form, setForm] = useState({
    Company: "",
    TypeName: "",
    Ram: "",
    Cpu: "",
    Inches: "",
    Weight: "",
  });

  const [errors, setErrors] = useState({});

  const companies = ["Dell", "HP", "Lenovo", "Asus", "Apple"];
  const types = ["Notebook", "Gaming", "Ultrabook", "Workstation"];
  const rams = [4, 8, 16, 32];
  const cpus = ["i3", "i5", "i7", "Ryzen 5", "Ryzen 7"];

  const validate = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key]) newErrors[key] = "Required";
    });

    if (form.Inches && form.Inches <= 0)
      newErrors.Inches = "Invalid screen size";

    if (form.Weight && form.Weight <= 0) newErrors.Weight = "Invalid weight";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onPredict(form);
    }
  };
  return (
    <div className="glass-card">
      <h3>Enter Specifications</h3>

      <div className="form-grid">
        <select
          name="Company"
          onChange={(e) => setForm({ ...form, Company: e.target.value })}
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {errors.Company && <span className="error">{errors.Company}</span>}

        <select
          name="TypeName"
          onChange={(e) => setForm({ ...form, TypeName: e.target.value })}
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <select
          name="Ram"
          onChange={(e) => setForm({ ...form, Ram: e.target.value })}
        >
          <option value="">Select RAM</option>
          {rams.map((r) => (
            <option key={r}>{r} GB</option>
          ))}
        </select>

        <select
          name="Cpu"
          onChange={(e) => setForm({ ...form, Cpu: e.target.value })}
        >
          <option value="">Select CPU</option>
          {cpus.map((cpu) => (
            <option key={cpu}>{cpu}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Screen Size (Inches)"
          onChange={(e) => setForm({ ...form, Inches: e.target.value })}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          onChange={(e) => setForm({ ...form, Weight: e.target.value })}
        />
      </div>

      <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Predicting..." : "Predict Price"}
      </button>
    </div>
  );
};

export default PredictionForm;
