import { useEffect, useState } from "react";
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
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const Insights = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/insights");
        const data = await res.json();

        setBarData({
          labels: data.company_labels,
          datasets: [
            {
              label: "Average Price",
              data: data.company_prices,
              backgroundColor: isDark
                ? "rgba(59,130,246,0.6)"
                : "rgba(37,99,235,0.6)",
              borderRadius: 8,
            },
          ],
        });

        setLineData({
          labels: data.ram_labels,
          datasets: [
            {
              label: "Price Trend",
              data: data.ram_prices,
              borderColor: isDark
                ? "rgba(168,85,247,0.9)"
                : "rgba(124,58,237,0.9)",
              backgroundColor: isDark
                ? "rgba(168,85,247,0.1)"
                : "rgba(124,58,237,0.1)",
              tension: 0.4,
              fill: true,
              pointRadius: 4,
            },
          ],
        });
      } catch (err) {
        console.error("Insights fetch error:", err);
      }
    };

    fetchInsights();
  }, [isDark]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#cbd5e1" : "#334155",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#94a3b8" : "#475569" },
        grid: {
          color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        },
      },
      y: {
        ticks: { color: isDark ? "#94a3b8" : "#475569" },
        grid: {
          color: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <div
      className="min-h-screen flex
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div
          className="backdrop-blur-xl 
          bg-white dark:bg-white/5
          border-b border-slate-200 dark:border-white/10"
        >
          <Header />
        </div>

        <div className="flex-1 p-6 md:p-10">
          {/* Title */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold 
              bg-linear-to-r 
              from-blue-600 to-cyan-500
              dark:from-blue-400 dark:to-cyan-400
              bg-clip-text text-transparent"
            >
              Market Insights
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
              Data-driven visualization of laptop pricing patterns
            </p>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div
              className="rounded-2xl
              border border-slate-200 dark:border-white/10
              bg-white dark:bg-white/5
              backdrop-blur-xl
              p-6 shadow-xl"
            >
              <h3
                className="text-lg font-medium 
                text-slate-800 dark:text-slate-300 mb-6"
              >
                Company vs Average Price
              </h3>

              {barData ? (
                <Bar data={barData} options={chartOptions} />
              ) : (
                <p className="text-slate-500 text-sm">Loading data...</p>
              )}
            </div>

            <div
              className="rounded-2xl
              border border-slate-200 dark:border-white/10
              bg-white dark:bg-white/5
              backdrop-blur-xl
              p-6 shadow-xl"
            >
              <h3
                className="text-lg font-medium 
                text-slate-800 dark:text-slate-300 mb-6"
              >
                RAM vs Price Trend
              </h3>

              {lineData ? (
                <Line data={lineData} options={chartOptions} />
              ) : (
                <p className="text-slate-500 text-sm">Loading data...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
