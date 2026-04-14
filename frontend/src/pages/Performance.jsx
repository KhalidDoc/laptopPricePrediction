import { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_API_URL || "https://laptoppriceprediction-5tom.onrender.com";

const Performance = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/metrics`);  // Backend endpoint for performance metrics
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Metrics fetch error:", err);
      }
    };

    fetchMetrics();
  }, []);

  const performanceGrade = (r2) => {
    if (r2 >= 0.9)
      return {
        label: "Excellent",
        color: "text-green-600 dark:text-green-400",
      };

    if (r2 >= 0.8)
      return {
        label: "Good",
        color: "text-blue-600 dark:text-blue-400",
      };

    if (r2 >= 0.7)
      return {
        label: "Moderate",
        color: "text-yellow-600 dark:text-yellow-400",
      };

    return {
      label: "Needs Improvement",
      color: "text-red-600 dark:text-red-400",
    };
  };

  const grade = metrics ? performanceGrade(metrics.r2) : null;

  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}

        <div className="mb-10">
          <h1
            className="
            text-3xl md:text-4xl font-bold
            bg-linear-to-r
            from-blue-600 via-cyan-500 to-indigo-600
            dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
            bg-clip-text text-transparent"
          >
            Model Performance Evaluation
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Detailed analysis of regression accuracy and prediction stability.
          </p>
        </div>

        {!metrics && (
          <div className="text-slate-500 text-sm">
            Fetching model performance metrics...
          </div>
        )}

        {metrics && (
          <>
            {/* Overall Grade */}

            <div
              className="
              mb-8
              rounded-2xl
              border border-slate-200 dark:border-white/10
              bg-white dark:bg-white/5
              backdrop-blur-xl
              p-6 shadow-xl"
            >
              <h3 className="text-lg font-medium mb-3">Overall Model Grade</h3>

              <p className={`text-2xl font-bold ${grade.color}`}>
                {grade.label}
              </p>

              <p className="text-slate-600 dark:text-slate-500 text-sm mt-2">
                Based on R² evaluation threshold standards for regression
                models.
              </p>
            </div>

            {/* Metrics Grid */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* R2 */}

              <MetricCard
                title="R² Score"
                value={metrics.r2}
                color="text-blue-600 dark:text-blue-400"
                description="Measures how well the model explains price variability."
                extra={`A value of ${metrics.r2} means the model explains ${(
                  metrics.r2 * 100
                ).toFixed(1)}% of market price variation.`}
              />

              {/* MAE */}

              <MetricCard
                title="MAE"
                value={`₹ ${metrics.mae.toLocaleString()}`}
                color="text-green-600 dark:text-green-400"
                description="Average prediction error in currency terms."
                extra={`On average, predictions deviate by ₹ ${metrics.mae.toLocaleString()} from actual prices.`}
              />

              {/* RMSE */}

              <MetricCard
                title="RMSE"
                value={`₹ ${metrics.rmse.toLocaleString()}`}
                color="text-purple-600 dark:text-purple-400"
                description="Penalizes larger errors more heavily than MAE."
                extra="Higher difference between RMSE and MAE may indicate outliers."
              />
            </div>

            {/* Interpretation */}

            <div
              className="
              mt-10
              rounded-2xl
              border border-slate-200 dark:border-white/10
              bg-white dark:bg-white/5
              backdrop-blur-xl
              p-6 shadow-xl"
            >
              <h3 className="text-lg font-medium mb-4">Interpretation Guide</h3>

              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-400">
                <li>
                  • High R² (≥ 0.90) indicates strong predictive capability.
                </li>
                <li>
                  • Lower MAE means the model is consistently close to real
                  prices.
                </li>
                <li>
                  • If RMSE is significantly higher than MAE, large price
                  outliers may exist.
                </li>
                <li>
                  • Combined evaluation ensures both accuracy and stability.
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, color, description, extra }) => (
  <div
    className="
    rounded-2xl
    border border-slate-200 dark:border-white/10
    bg-white dark:bg-white/5
    backdrop-blur-xl
    p-6 shadow-xl"
  >
    <h4 className="text-sm text-slate-500 dark:text-slate-400 mb-2">{title}</h4>

    <div className={`text-3xl font-bold ${color} mb-3`}>{value}</div>

    <p className="text-sm text-slate-700 dark:text-slate-300">{description}</p>

    <p className="text-xs text-slate-500 mt-3">{extra}</p>
  </div>
);

export default Performance;
