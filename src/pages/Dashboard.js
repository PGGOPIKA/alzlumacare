import React from "react";
import "./Dashboard.css";  // ✅ Make sure this line is present

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="systems">
        <div className="system-box">System 1</div>
        <div className="system-box">System 2</div>
        <div className="system-box">System 3</div>
        <div className="system-box">System 4</div>
      </div>
    </div>
  );
};

export default Dashboard;
