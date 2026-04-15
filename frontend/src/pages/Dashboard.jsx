import { useState } from "react";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import Metrics from "../components/Metrics";
const BASE_URL = import.meta.env.VITE_API_URL ;
console.log("ENV:", import.meta.env);
console.log("API URL:", import.meta.env.VITE_API_URL);

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [metrics, setMetrics] = useState(null);

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
      Weight: `${formData.Weight}kg`,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/predict`, { // Backend endpoint for prediction
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setPrediction(data);
      setMetrics(data.metrics);
    } catch (err) {
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Title */}
      <div className="mb-10">
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight 
          bg-linear-to-r 
          from-blue-600 via-cyan-500 to-indigo-600
          dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
          bg-clip-text text-transparent"
        >
          Laptop Price Intelligence
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mt-2">
          AI-powered price prediction & analytics dashboard
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Prediction Form */}
        <div
          className="
          rounded-2xl
          border border-slate-200 dark:border-white/10
          bg-white dark:bg-white/5
          backdrop-blur-xl
          shadow-xl
          p-6"
        >
          <PredictionForm onPredict={handlePredict} loading={loading} />
        </div>

        {/* Result + Metrics */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          <div
            className="
            rounded-2xl
            border border-slate-200 dark:border-white/10
            bg-linear-to-br 
            from-blue-100 to-indigo-100
            dark:from-blue-500/10 dark:to-indigo-500/10
            backdrop-blur-xl
            shadow-xl
            p-6"
          >
            <h2 className="text-xl font-bold mb-4">Prediction Result</h2>
            {prediction && !loading && <ResultCard prediction={prediction} />}
          </div>

          <div
            className="
            rounded-2xl
            border border-slate-200 dark:border-white/10
            bg-white dark:bg-white/5
            backdrop-blur-xl
            shadow-xl
            p-6"
          >
            <Metrics metrics={metrics} />
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="fixed inset-0 
          bg-black/40 dark:bg-black/60
          backdrop-blur-sm
          flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-14 h-14 border-4 
              border-blue-600 dark:border-blue-400
              border-t-transparent
              rounded-full animate-spin"
            ></div>

            <p className="text-blue-600 dark:text-blue-400">
              Running AI Prediction...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
