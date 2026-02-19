import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import React from "react";

const Performance = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />

        <div className="metrics">
          <div className="metric-card">
            <h4>R² Score</h4>
            <p>0.89</p>
          </div>

          <div className="metric-card">
            <h4>MAE</h4>
            <p>₹ 4,200</p>
          </div>

          <div className="metric-card">
            <h4>RMSE</h4>
            <p>₹ 6,100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
