import { useState } from "react";
import Header from "../components/Header";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import Metrics from "../components/Metrics";
import Sidebar from "../components/sidebar";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handlePredict = (formData) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockPrice = 72000; // Replace later with backend call
      setPredictedPrice(mockPrice);
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-grid">
          <PredictionForm onPredict={handlePredict} loading={loading} />

          <ResultCard price={predictedPrice} />

          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
