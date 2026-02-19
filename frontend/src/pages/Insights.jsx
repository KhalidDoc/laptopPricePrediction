import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const Insights = () => {
  const barData = {
    labels: ["Dell", "HP", "Lenovo", "Asus", "Apple"],
    datasets: [
      {
        label: "Average Price",
        data: [55000, 60000, 52000, 70000, 95000],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const lineData = {
    labels: ["4GB", "8GB", "16GB", "32GB"],
    datasets: [
      {
        label: "Price Trend",
        data: [30000, 45000, 75000, 120000],
        borderColor: "#9333ea",
        fill: false,
      },
    ],
  };
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="dashboard-grid">
          <div className="glass-card">
            <h3>Company vs Average Price</h3>
            <Bar data={barData} />
          </div>

          <div className="glass-card">
            <h3>RAM vs Price Trend</h3>
            <Line data={lineData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
