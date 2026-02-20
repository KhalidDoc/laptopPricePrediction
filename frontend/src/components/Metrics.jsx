import React from "react";

const Metrics = ({ metrics }) => {
  if (!metrics) {
    return (
      <div
        className="rounded-2xl 
        border border-slate-200 dark:border-white/10
        bg-white dark:bg-white/5
        backdrop-blur-xl
        p-8 shadow-xl
        transition-colors duration-500"
      >
        <h4
          className="text-lg font-medium 
          text-slate-800 dark:text-slate-300 
          mb-4"
        >
          Model Performance Overview
        </h4>

        <p className="text-slate-600 dark:text-slate-500 text-sm">
          Run a prediction to view model evaluation metrics and understand how
          well the regression model performs.
        </p>
      </div>
    );
  }

  const cardStyle =
    "relative rounded-2xl " +
    "border border-slate-200 dark:border-white/10 " +
    "bg-white dark:bg-white/5 " +
    "backdrop-blur-xl " +
    "p-6 shadow-xl " +
    "transition-all duration-300 " +
    "hover:shadow-blue-500/10";

  return (
    <div className="space-y-6">
      <h3
        className="text-xl font-semibold 
        bg-linear-to-r from-blue-500 to-cyan-500 
        bg-clip-text text-transparent"
      >
        Model Performance Metrics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* R2 Score */}
        <div className={cardStyle}>
          <h4 className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            R² Score
          </h4>

          <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-3">
            {metrics.r2}
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>What it shows:</strong> The proportion of variance in laptop
            prices explained by the model.
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Range: 0 to 1. Closer to 1 means better predictive accuracy.
          </p>
        </div>

        {/* MAE */}
        <div className={cardStyle}>
          <h4 className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            MAE
          </h4>

          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-3">
            ₹ {metrics.mae.toLocaleString()}
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>What it shows:</strong> The average absolute difference
            between predicted and actual laptop prices.
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Lower MAE means predictions are closer to real market prices.
          </p>
        </div>

        {/* RMSE */}
        <div className={cardStyle}>
          <h4 className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            RMSE
          </h4>

          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">
            ₹ {metrics.rmse.toLocaleString()}
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>What it shows:</strong> Measures prediction error while
            giving higher penalty to large mistakes.
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Lower RMSE indicates better model stability and fewer large errors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
