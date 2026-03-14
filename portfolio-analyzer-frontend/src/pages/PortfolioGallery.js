import React, { useState, useEffect } from "react";
import { analyzePortfolio } from "../api/portfolioAPI";
import StatCard from "../components/StatCard";
import ChartsSection from "../components/ChartsSection";
import "../styles/PortfolioGallery.css";

function PortfolioGallery({ onSelectDeveloper }) {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sampleDevelopers = [
    "torvalds",
    "gvanrossum",
    "octocat",
    "mojombo",
    "schacon",
    "defunkt",
  ];

  useEffect(() => {
    const loadPortfolios = async () => {
      setLoading(true);
      const devs = [];

      for (const dev of sampleDevelopers) {
        try {
          const data = await analyzePortfolio(dev);
          devs.push({ username: dev, ...data });
        } catch (err) {
          console.error(`Failed to load ${dev}`);
        }
      }

      setDevelopers(devs);
      setLoading(false);
    };

    loadPortfolios();
  }, []);

  const filteredDevelopers = developers.filter((dev) =>
    dev.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portfolio-gallery">
      <div className="gallery-header">
        <h1>Developer Portfolio Gallery</h1>
        <p>Explore amazing GitHub developers</p>
      </div>

      <div className="gallery-search">
        <input
          type="text"
          placeholder="Search developers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading portfolios...</p>
        </div>
      )}

      <div className="gallery-grid">
        {filteredDevelopers.map((dev) => (
          <div key={dev.username} className="gallery-card">
            <div className="card-header">
              <h3>{dev.username}</h3>
              <span className="badge">★ {(dev.Stars || 0).toLocaleString()}</span>
            </div>

            <div className="card-stats">
              <div className="stat">
                <span className="stat-icon">📁</span>
                <span>{dev.Repositories || 0} Repos</span>
              </div>
              <div className="stat">
                <span className="stat-icon">👥</span>
                <span>{dev.Followers || 0} Followers</span>
              </div>
              <div className="stat">
                <span className="stat-icon">👁️</span>
                <span>{dev.Watching || 0} Watching</span>
              </div>
            </div>

            <button
              className="view-btn"
              onClick={() => onSelectDeveloper("profile", dev)}
            >
              View Profile →
            </button>
          </div>
        ))}
      </div>

      {!loading && filteredDevelopers.length === 0 && (
        <div className="empty-state">
          <p>No developers found matching your search</p>
        </div>
      )}
    </div>
  );
}

export default PortfolioGallery;
