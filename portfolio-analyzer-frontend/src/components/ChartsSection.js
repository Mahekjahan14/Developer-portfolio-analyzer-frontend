import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../styles/Charts.css";

function ChartsSection({ data }) {
  const COLORS = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe", "#43e97b"];

  const languageData = [
    { name: "JavaScript", value: 25, percentage: 25 },
    { name: "Python", value: 20, percentage: 20 },
    { name: "Java", value: 18, percentage: 18 },
    { name: "Go", value: 15, percentage: 15 },
    { name: "Rust", value: 12, percentage: 12 },
    { name: "Other", value: 10, percentage: 10 },
  ];

  const contributionData = [
    { month: "Jan", repos: 15, stars: 120 },
    { month: "Feb", repos: 18, stars: 145 },
    { month: "Mar", repos: 22, stars: 180 },
    { month: "Apr", repos: 20, stars: 175 },
    { month: "May", repos: 25, stars: 210 },
    { month: "Jun", repos: 28, stars: 240 },
  ];

  return (
    <div className="charts-section">
      <div className="chart-container">
        <h3>Language Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Contribution Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={contributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="repos"
              stroke="#667eea"
              strokeWidth={2}
              dot={{ fill: "#667eea", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="stars"
              stroke="#764ba2"
              strokeWidth={2}
              dot={{ fill: "#764ba2", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>Repository Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { type: "Public", count: data.Repositories || 0 },
            { type: "Private", count: Math.floor((data.Repositories || 0) * 0.3) },
            { type: "Forks", count: Math.floor((data.Repositories || 0) * 0.2) },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsSection;
