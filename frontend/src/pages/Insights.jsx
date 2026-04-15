import { useEffect, useState, useRef } from "react";
import StatsCards from "../insights/StatsCards";
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000" || "https://laptoppriceprediction-5tom.onrender.com";
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

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const [insights, setInsights] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [autoplayRunning, setAutoplayRunning] = useState(true);

  const swiperRef = useRef(null);

  /* ---------------- Detect Theme ---------------- */

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

  /* ---------------- Fetch Insights ---------------- */

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/insights`); // Backend endpoint for insights data
        const data = await res.json();
        setInsights(data);
      } catch (err) {
        console.error("Insights fetch error:", err);
      }
    };

    fetchInsights();
  }, []);

  /* ---------------- Swiper Controls ---------------- */

  const toggleAutoplay = () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current.swiper;

    if (autoplayRunning) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }

    setAutoplayRunning(!autoplayRunning);
  };

  if (!insights) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-500 text-lg">
          Loading market insights...
        </div>
      </div>
    );
  }

  /* ---------------- Chart Options ---------------- */

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 2,

    plugins: {
      legend: {
        labels: {
          color: isDark ? "#e2e8f0" : "#334155",
          font: { size: 14 },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: isDark ? "#94a3b8" : "#475569",
          font: { size: 13 },
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        },
      },

      y: {
        ticks: {
          color: isDark ? "#94a3b8" : "#475569",
          font: { size: 13 },
        },
        grid: {
          color: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        },
      },
    },
  };

  /* ---------------- Chart Data ---------------- */

  const companyChart = {
    labels: insights.company_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.company_prices,
        backgroundColor: "rgba(59,130,246,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const ramChart = {
    labels: insights.ram_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.ram_prices,
        borderColor: "rgba(168,85,247,0.9)",
        backgroundColor: "rgba(168,85,247,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const gpuChart = {
    labels: insights.gpu_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.gpu_prices,
        backgroundColor: "rgba(16,185,129,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const cpuChart = {
    labels: insights.cpu_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.cpu_prices,
        backgroundColor: "rgba(245,158,11,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const priceDistChart = {
    labels: insights.price_dist_labels,
    datasets: [
      {
        label: "Laptop Count",
        data: insights.price_dist_values,
        backgroundColor: "rgba(239,68,68,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const screenChart = {
    labels: insights.screen_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.screen_prices,
        borderColor: "rgba(99,102,241,0.9)",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const storageChart = {
    labels: insights.storage_labels,
    datasets: [
      {
        label: "Average Price",
        data: insights.storage_prices,
        backgroundColor: "rgba(20,184,166,0.8)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* HEADER */}

        <div className="mb-10">
          <h1
            className="
            text-4xl font-bold
            bg-linear-to-r
            from-blue-600 via-cyan-500 to-indigo-600
            dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
            bg-clip-text text-transparent"
          >
            Laptop Market Intelligence
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-xl">
            Explore analytical insights derived from laptop hardware datasets
            and machine learning price modeling.
          </p>
        </div>

        {/* STATS */}

        <StatsCards stats={insights} />

        {/* AUTOSCROLL BUTTON */}

        <div className="flex justify-end mt-10 mb-4">
          <button
            onClick={toggleAutoplay}
            className="
            px-4 py-2
            rounded-lg
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-900
            hover:bg-slate-100 dark:hover:bg-slate-800
            transition"
          >
            {autoplayRunning ? "Pause Auto Scroll" : "Start Auto Scroll"}
          </button>
        </div>

        {/* CHART SLIDER */}

        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={40}
          slidesPerView={1}
        >
          <SwiperSlide>
            <ChartShowcase
              title="Company vs Average Laptop Price"
              insight="Premium brands dominate higher price segments."
            >
              <Bar data={companyChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="RAM vs Price Trend"
              insight="Higher RAM configurations strongly increase laptop price."
            >
              <Line data={ramChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="GPU Brand vs Laptop Price"
              insight="Dedicated GPUs significantly increase price tiers."
            >
              <Bar data={gpuChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="CPU Tier vs Price"
              insight="Higher tier processors correlate with premium laptops."
            >
              <Bar data={cpuChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="Laptop Price Distribution"
              insight="Most laptops fall in mid-range price categories."
            >
              <Bar data={priceDistChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="Screen Size vs Price"
              insight="Large display laptops tend to be premium devices."
            >
              <Line data={screenChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>

          <SwiperSlide>
            <ChartShowcase
              title="SSD Storage vs Price"
              insight="Higher SSD capacity correlates with higher cost."
            >
              <Bar data={storageChart} options={chartOptions} />
            </ChartShowcase>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

/* ---------------- Chart Card ---------------- */

const ChartShowcase = ({ title, insight, children }) => (
  <div
    className="
    max-w-5xl mx-auto
    rounded-2xl
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    shadow-xl
    p-10"
  >
    <h2 className="text-2xl font-semibold mb-3">{title}</h2>

    <div
      className="
      mb-6
      text-sm
      rounded-lg
      bg-blue-50 dark:bg-blue-900/20
      border border-blue-200 dark:border-blue-700
      px-4 py-3"
    >
      <span className="font-semibold">Insight:</span> {insight}
    </div>

    <div className="h-105">{children}</div>
  </div>
);

export default Insights;
