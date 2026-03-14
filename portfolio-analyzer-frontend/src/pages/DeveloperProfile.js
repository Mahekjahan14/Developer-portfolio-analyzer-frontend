import React from "react";
import StatCard from "../components/StatCard";
import ChartsSection from "../components/ChartsSection";
import "../styles/DeveloperProfile.css";

function DeveloperProfile({ developer, onNavigate }) {
  if (!developer) {
    return (
      <div className="profile-container">
        <p>No developer selected</p>
        <button onClick={() => onNavigate("dashboard")}>← Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="developer-profile">
      <div className="profile-hero">
        <div className="profile-header">
          <div className="profile-avatar">
            {developer.username?.charAt(0).toUpperCase() || "D"}
          </div>
          <div className="profile-info">
            <h1>{developer.username}</h1>
            <p className="profile-subtitle">GitHub Developer</p>
            <button className="btn-back" onClick={() => onNavigate("dashboard")}>
              ← Back
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <section className="profile-stats">
          <h2>Profile Statistics</h2>
          <div className="stats-grid">
            <StatCard
              icon="📁"
              label="Repositories"
              value={developer.Repositories || 0}
            />
            <StatCard icon="⭐" label="Total Stars" value={developer.Stars || 0} />
            <StatCard icon="👥" label="Followers" value={developer.Followers || 0} />
            <StatCard icon="👁️" label="Watching" value={developer.Watching || 0} />
          </div>
        </section>

        <section className="profile-charts">
          <h2>Detailed Analytics</h2>
          <ChartsSection data={developer} />
        </section>

        <section className="profile-details">
          <h2>About</h2>
          <div className="details-grid">
            <div className="detail-item">
              <h4>Main Languages</h4>
              <p>JavaScript, Python, Java, Go, Rust</p>
            </div>
            <div className="detail-item">
              <h4>Experience Level</h4>
              <p>Advanced / Expert</p>
            </div>
            <div className="detail-item">
              <h4>Focus Areas</h4>
              <p>Full Stack Web Development, DevOps, Cloud Infrastructure</p>
            </div>
            <div className="detail-item">
              <h4>Specializations</h4>
              <p>System Design, Open Source, Architecture</p>
            </div>
          </div>
        </section>

        <section className="profile-badges">
          <h2>Achievements</h2>
          <div className="badges-grid">
            <div className="badge">🏆 Top Contributor</div>
            <div className="badge">⭐ Highly Starred</div>
            <div className="badge">🚀 Active Developer</div>
            <div className="badge">👥 Community Leader</div>
            <div className="badge">🔥 Trending</div>
            <div className="badge">✅ Verified</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DeveloperProfile;
