import { useEffect, useState } from "react";

const ResultCard = ({ prediction }) => {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!prediction?.price) return;

    let start = 0;
    const duration = 600;
    const steps = 30;
    const increment = prediction.price / steps;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= prediction.price) {
        setDisplayPrice(prediction.price);
        clearInterval(interval);
      } else {
        setDisplayPrice(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [prediction]);

  if (!prediction) return null;

  const categoryColors = {
    Budget:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30",

    "Mid-Range":
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30",

    Premium:
      "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl
      border border-slate-200 dark:border-white/10
      bg-white dark:bg-white/5
      backdrop-blur-xl
      p-8 shadow-xl
      transition-all duration-500"
    >
      {/* Background Glow (Dark Mode Only Visible) */}
      <div
        className="absolute -top-20 -right-20 w-60 h-60 
        bg-blue-200/40 dark:bg-blue-500/20
        rounded-full blur-3xl pointer-events-none"
      ></div>

      {/* Title */}
      <h3
        className="text-lg font-medium 
        text-slate-700 dark:text-slate-400 
        tracking-wide mb-6"
      >
        Prediction Result
      </h3>

      {/* Price */}
      <div
        className="text-4xl md:text-5xl font-bold tracking-tight 
        bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 
        dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
        bg-clip-text text-transparent drop-shadow-sm"
      >
        ₹ {displayPrice.toLocaleString()}
      </div>

      {/* Category Badge */}
      <div className="mt-6">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            categoryColors[prediction.category] ||
            "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30"
          }`}
        >
          {prediction.category}
        </span>
      </div>

      {/* Sub Text */}
      <p className="mt-6 text-slate-600 dark:text-slate-500 text-sm">
        This estimate is generated using your trained XGBoost regression model.
      </p>
    </div>
  );
};

export default ResultCard;
