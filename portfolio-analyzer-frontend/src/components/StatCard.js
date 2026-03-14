import React from "react";
import "../styles/StatCard.css";

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default StatCard;
