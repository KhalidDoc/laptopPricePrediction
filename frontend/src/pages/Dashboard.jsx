import { useState } from "react";
import Header from "../components/Header";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import Metrics from "../components/Metrics";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async (formData) => {
    setLoading(true);

    const payload = {
      Company: formData.Company,
      TypeName: formData.TypeName,
      Inches: parseFloat(formData.Inches),
      ScreenResolution: "1920x1080",
      Cpu: `Intel Core ${formData.Cpu} 2.5GHz`,
      Ram: `${formData.Ram}GB`,
      Memory: "256GB SSD",
      Gpu: "Intel HD Graphics 620",
      OpSys: "Windows 10",
      Weight: `${formData.Weight}kg`
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setPrediction(data); // contains price + category
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-grid">
          <PredictionForm onPredict={handlePredict} loading={loading} />
          <ResultCard prediction={prediction} />
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
