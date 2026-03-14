import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import PortfolioGallery from "./pages/PortfolioGallery";
import ProjectShowcase from "./pages/ProjectShowcase";
import SkillsAnalytics from "./pages/SkillsAnalytics";
import DeveloperProfile from "./pages/DeveloperProfile";
import CompareProfiles from "./pages/CompareProfiles";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [developerData, setDeveloperData] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleNavigate = (page, developer = null) => {
    setCurrentPage(page);
    if (developer) setSelectedDeveloper(developer);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "gallery":
        return <PortfolioGallery onSelectDeveloper={handleNavigate} />;
      case "projects":
        return <ProjectShowcase />;
      case "skills":
        return <SkillsAnalytics />;
      case "profile":
        return (
          <DeveloperProfile
            developer={selectedDeveloper}
            onNavigate={handleNavigate}
          />
        );
      case "compare":
        return <CompareProfiles />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <main className="app-main">{renderPage()}</main>
      <footer className="app-footer">
        <p>&copy; 2026 Developer Portfolio Analyzer. Built with React & Spring Boot.</p>
      </footer>
    </div>
  );
}

export default App;
