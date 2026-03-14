import React from "react";
import "../styles/Navigation.css";

function Navigation({ currentPage, onNavigate, darkMode, onToggleDarkMode }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onNavigate("dashboard")}>
          <span className="logo-icon">👨‍💻</span>
          <span className="logo-text">DevAnalyzer</span>
        </div>
        
        <ul className="nav-menu">
          <li className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}>
            <button onClick={() => onNavigate("dashboard")} className="nav-link">
              🏠 Dashboard
            </button>
          </li>
          <li className={`nav-item ${currentPage === "gallery" ? "active" : ""}`}>
            <button onClick={() => onNavigate("gallery")} className="nav-link">
              🎨 Portfolio Gallery
            </button>
          </li>
          <li className={`nav-item ${currentPage === "projects" ? "active" : ""}`}>
            <button onClick={() => onNavigate("projects")} className="nav-link">
              📁 Projects
            </button>
          </li>
          <li className={`nav-item ${currentPage === "skills" ? "active" : ""}`}>
            <button onClick={() => onNavigate("skills")} className="nav-link">
              📊 Skills & Stats
            </button>
          </li>
          <li className={`nav-item ${currentPage === "compare" ? "active" : ""}`}>
            <button onClick={() => onNavigate("compare")} className="nav-link">
              ⚔️ Compare
            </button>
          </li>
        </ul>

        <button className="theme-toggle" onClick={onToggleDarkMode} title="Toggle dark mode">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
