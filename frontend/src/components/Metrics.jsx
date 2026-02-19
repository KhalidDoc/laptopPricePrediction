import React from "react";

const Metrics = () => {
  return (
    <div className="metrics">
      <div className="metric-card">
        <h4>R² Score</h4>
        <p>0.89</p>
      </div>

      <div className="metric-card">
        <h4>MAE</h4>
        <p>₹ 4,250</p>
      </div>

      <div className="metric-card">
        <h4>RMSE</h4>
        <p>₹ 6,130</p>
      </div>
    </div>
  );
};

export default Metrics;
