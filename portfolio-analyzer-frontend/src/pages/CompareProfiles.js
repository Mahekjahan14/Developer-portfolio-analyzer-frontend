import React, { useState } from "react";
import { analyzeMultiple } from "../api/portfolioAPI";
import "../styles/CompareProfiles.css";

function CompareProfiles() {
  const [dev1Username, setDev1Username] = useState("");
  const [dev2Username, setDev2Username] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (!dev1Username.trim() || !dev2Username.trim()) {
      setError("Please enter both usernames");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const results = await analyzeMultiple([dev1Username, dev2Username]);
      setCompareData(results);
    } catch (err) {
      setError(err.message || "Failed to compare profiles");
    } finally {
      setLoading(false);
    }
  };

  const getMetric = (data, key) => {
    return typeof data[key] === "number" ? data[key].toLocaleString() : data[key] || "N/A";
  };

  const compareMetric = (dev1Val, dev2Val) => {
    if (dev1Val > dev2Val) return "↑ +";
    if (dev1Val < dev2Val) return "↓ -";
    return "= ";
  };

  return (
    <div className="compare-profiles">
      <div className="compare-header">
        <h1>Developer Comparison Tool</h1>
        <p>Compare GitHub profiles side by side</p>
      </div>

      <div className="compare-search">
        <div className="compare-input-group">
          <input
            type="text"
            placeholder="First developer username..."
            value={dev1Username}
            onChange={(e) => setDev1Username(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCompare()}
            className="compare-input"
          />
          <span className="vs-badge">VS</span>
          <input
            type="text"
            placeholder="Second developer username..."
            value={dev2Username}
            onChange={(e) => setDev2Username(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCompare()}
            className="compare-input"
          />
        </div>
        <button
          onClick={handleCompare}
          className="btn-primary"
          disabled={loading}
        >
          {loading ? "Comparing..." : "Compare"}
        </button>
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Analyzing profiles...</p>
        </div>
      )}

      {compareData && (
        <div className="comparison-container">
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th className="dev-col dev1">
                    👤 {dev1Username}
                    <span className="developer-badge">Developer 1</span>
                  </th>
                  <th className="vs-col">Difference</th>
                  <th className="dev-col dev2">
                    👤 {dev2Username}
                    <span className="developer-badge">Developer 2</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {compareData[dev1Username] && compareData[dev2Username] && (
                  <>
                    <tr>
                      <td className="metric-name">📁 Repositories</td>
                      <td className="dev-value dev1">
                        {getMetric(compareData[dev1Username], "Repositories")}
                      </td>
                      <td className="vs-value">
                        {compareMetric(
                          compareData[dev1Username].Repositories || 0,
                          compareData[dev2Username].Repositories || 0
                        )}
                        {Math.abs(
                          (compareData[dev1Username].Repositories || 0) -
                            (compareData[dev2Username].Repositories || 0)
                        )}
                      </td>
                      <td className="dev-value dev2">
                        {getMetric(compareData[dev2Username], "Repositories")}
                      </td>
                    </tr>
                    <tr>
                      <td className="metric-name">⭐ Total Stars</td>
                      <td className="dev-value dev1">
                        {getMetric(compareData[dev1Username], "Stars")}
                      </td>
                      <td className="vs-value">
                        {compareMetric(
                          compareData[dev1Username].Stars || 0,
                          compareData[dev2Username].Stars || 0
                        )}
                        {Math.abs(
                          (compareData[dev1Username].Stars || 0) -
                            (compareData[dev2Username].Stars || 0)
                        )}
                      </td>
                      <td className="dev-value dev2">
                        {getMetric(compareData[dev2Username], "Stars")}
                      </td>
                    </tr>
                    <tr>
                      <td className="metric-name">👥 Followers</td>
                      <td className="dev-value dev1">
                        {getMetric(compareData[dev1Username], "Followers")}
                      </td>
                      <td className="vs-value">
                        {compareMetric(
                          compareData[dev1Username].Followers || 0,
                          compareData[dev2Username].Followers || 0
                        )}
                        {Math.abs(
                          (compareData[dev1Username].Followers || 0) -
                            (compareData[dev2Username].Followers || 0)
                        )}
                      </td>
                      <td className="dev-value dev2">
                        {getMetric(compareData[dev2Username], "Followers")}
                      </td>
                    </tr>
                    <tr>
                      <td className="metric-name">👁️ Watching</td>
                      <td className="dev-value dev1">
                        {getMetric(compareData[dev1Username], "Watching")}
                      </td>
                      <td className="vs-value">
                        {compareMetric(
                          compareData[dev1Username].Watching || 0,
                          compareData[dev2Username].Watching || 0
                        )}
                        {Math.abs(
                          (compareData[dev1Username].Watching || 0) -
                            (compareData[dev2Username].Watching || 0)
                        )}
                      </td>
                      <td className="dev-value dev2">
                        {getMetric(compareData[dev2Username], "Watching")}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="comparison-verdict">
            <h3>Comparison Summary</h3>
            <div className="verdict-cards">
              <div className="verdict-card">
                <h4>Developer Scores</h4>
                <div className="score-bars">
                  <div className="score-item">
                    <span>{dev1Username}</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill dev1-fill"
                        style={{
                          width: `${Math.min(
                            ((compareData[dev1Username].Repositories +
                              compareData[dev1Username].Stars +
                              compareData[dev1Username].Followers) /
                              1000) *
                              10,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="score-item">
                    <span>{dev2Username}</span>
                    <div className="progress-bar">
                      <div
                        className="progress-fill dev2-fill"
                        style={{
                          width: `${Math.min(
                            ((compareData[dev2Username].Repositories +
                              compareData[dev2Username].Stars +
                              compareData[dev2Username].Followers) /
                              1000) *
                              10,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareProfiles;
