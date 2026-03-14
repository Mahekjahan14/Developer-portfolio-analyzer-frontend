import React, { useState } from "react";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/SkillsAnalytics.css";

function SkillsAnalytics() {
  const skillsData = [
    { skill: "JavaScript", proficiency: 95, projects: 45 },
    { skill: "Python", proficiency: 88, projects: 32 },
    { skill: "React", proficiency: 92, projects: 28 },
    { skill: "Node.js", proficiency: 85, projects: 24 },
    { skill: "Java", proficiency: 80, projects: 18 },
    { skill: "SQL", proficiency: 87, projects: 30 },
  ];

  const contributionData = [
    { week: "W1", commits: 45, PR: 12, issues: 8 },
    { week: "W2", commits: 52, PR: 15, issues: 10 },
    { week: "W3", commits: 48, PR: 14, issues: 9 },
    { week: "W4", commits: 61, PR: 18, issues: 12 },
    { week: "W5", commits: 55, PR: 16, issues: 11 },
  ];

  const radarData = [
    { category: "Coding", value: 95 },
    { category: "Documentation", value: 80 },
    { category: "Testing", value: 88 },
    { category: "Collaboration", value: 92 },
    { category: "Innovation", value: 85 },
    { category: "Performance", value: 90 },
  ];

  return (
    <div className="skills-analytics">
      <div className="analytics-header">
        <h1>Skills & Analytics Dashboard</h1>
        <p>Comprehensive developer metrics and insights</p>
      </div>

      <div className="analytics-grid">
        <div className="chart-box">
          <h3>Top Skills</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="proficiency" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Developer Competencies</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ddd" />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis />
              <Radar
                name="Competency"
                dataKey="value"
                stroke="#667eea"
                fill="#667eea"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box full-width">
          <h3>Weekly Contribution Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="commits"
                stroke="#667eea"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="PR"
                stroke="#764ba2"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="issues"
                stroke="#f093fb"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section className="metrics-summary">
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <h4>Expertise Level</h4>
              <p className="metric-value">Advanced</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🚀</div>
            <div className="metric-content">
              <h4>Most Used Language</h4>
              <p className="metric-value">JavaScript</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <h4>Primary Focus</h4>
              <p className="metric-value">Web Development</p>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🏆</div>
            <div className="metric-content">
              <h4>Achievement Score</h4>
              <p className="metric-value">9.2/10</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SkillsAnalytics;
