import React, { useState } from "react";
import { analyzePortfolio, analyzeMultiple } from "../api/portfolioAPI";
import StatCard from "../components/StatCard";
import ChartsSection from "../components/ChartsSection";
import "../styles/Dashboard.css";

function Dashboard({ onNavigate }) {
  const [username, setUsername] = useState("");
  const [developerData, setDeveloperData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [compareMode, setCompareMode] = useState(false);
  const [dev1Username, setDev1Username] = useState("");
  const [dev2Username, setDev2Username] = useState("");
  const [compareData, setCompareData] = useState(null);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await analyzePortfolio(username);
      setDeveloperData(data);
      setUsername("");
    } catch (err) {
      setError(err.message || "Failed to analyze. Ensure backend is running on port 9090");
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = async () => {
    setError("");
    setLoading(true);
    try {
      const results = await analyzeMultiple([dev1Username, dev2Username]);
      setCompareData(results);
      setDev1Username("");
      setDev2Username("");
    } catch (err) {
      setError(err.message || "Failed to compare profiles");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">GitHub Developer Analyzer</h1>
          <p className="hero-subtitle">
            Discover insights about GitHub developers, analyze portfolios, and compare profiles
          </p>
        </div>
      </section>

      <section className="mode-selector">
        <button
          className={`mode-btn ${!compareMode ? "active" : ""}`}
          onClick={() => {
            setCompareMode(false);
            setError("");
            setCompareData(null);
          }}
        >
          🔍 Single Developer
        </button>
        <button
          className={`mode-btn ${compareMode ? "active" : ""}`}
          onClick={() => {
            setCompareMode(true);
            setError("");
            setDeveloperData(null);
          }}
        >
          ⚔️ Compare Developers
        </button>
      </section>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {!compareMode ? (
        <section className="search-section">
          <div className="search-card">
            <h2>Search Developer</h2>
            <div className="search-group">
              <input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                className="search-input"
              />
              <button
                onClick={handleAnalyze}
                className="search-btn btn-primary"
                disabled={loading}
              >
                {loading ? "🔄 Analyzing..." : "🔍 Analyze"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="search-section">
          <div className="search-card">
            <h2>Compare Two Developers</h2>
            <div className="compare-group">
              <input
                type="text"
                placeholder="First GitHub username..."
                value={dev1Username}
                onChange={(e) => setDev1Username(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCompare()}
                className="search-input"
              />
              <span className="vs-badge">VS</span>
              <input
                type="text"
                placeholder="Second GitHub username..."
                value={dev2Username}
                onChange={(e) => setDev2Username(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCompare()}
                className="search-input"
              />
              <button
                onClick={handleCompare}
                className="search-btn btn-primary"
                disabled={loading}
              >
                {loading ? "⚙️ Comparing..." : "⚔️ Compare"}
              </button>
            </div>
          </div>
        </section>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>{compareMode ? "Comparing profiles..." : "Analyzing profile..."}</p>
        </div>
      )}

      {!compareMode && developerData && (
        <section className="results-section">
          <div className="result-header">
            <h2>Developer Profile Analysis</h2>
            <button className="btn-secondary" onClick={() => onNavigate("profile", developerData)}>
              View Full Profile
            </button>
          </div>

          <div className="stats-grid">
            <StatCard icon="📊" label="Repositories" value={developerData.Repositories || 0} />
            <StatCard icon="⭐" label="Total Stars" value={developerData.Stars || 0} />
            <StatCard icon="🔗" label="Followers" value={developerData.Followers || 0} />
            <StatCard icon="👁️" label="Watching" value={developerData.Watching || 0} />
          </div>

          {developerData && <ChartsSection data={developerData} />}
        </section>
      )}

      {compareMode && compareData && (
        <section className="comparison-results">
          <h2>Comparison Results</h2>
          <div className="comparison-grid">
            {Object.entries(compareData).map(([username, data]) => (
              <div key={username} className="comparison-card">
                <h3>{username}</h3>
                {data ? (
                  <div className="comparison-stats">
                    <div className="stat-item">
                      <span className="stat-label">Repositories:</span>
                      <span className="stat-value">{data.Repositories || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Stars:</span>
                      <span className="stat-value">{data.Stars || 0}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Followers:</span>
                      <span className="stat-value">{data.Followers || 0}</span>
                    </div>
                  </div>
                ) : (
                  <p className="error-text">Unable to fetch data</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Profile Analysis</h3>
            <p>Analyze any GitHub profile with detailed statistics and insights</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚔️</div>
            <h3>Developer Comparison</h3>
            <p>Compare multiple developers side by side to find the best fit</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Visualize skills, repositories, and contribution patterns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Gallery View</h3>
            <p>Browse through portfolios in a beautiful gallery interface</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
