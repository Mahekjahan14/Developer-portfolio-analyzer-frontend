import React, { useState, useMemo } from "react";
import "../styles/ProjectShowcase.css";

function ProjectShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Linux Kernel",
      owner: "torvalds",
      stars: 180000,
      forks: 25000,
      language: "C",
      description: "The Linux kernel source tree - Core of Linux OS",
      image: "🐧",
      url: "https://github.com/torvalds/linux",
      tags: ["OS", "System", "Kernel", "Performance"],
    },
    {
      id: 2,
      title: "Python",
      owner: "python",
      stars: 65000,
      forks: 30000,
      language: "Python",
      description: "The Python programming language - Dynamic scripting",
      image: "🐍",
      url: "https://github.com/python/cpython",
      tags: ["Language", "Data Science", "Web", "Scripting"],
    },
    {
      id: 3,
      title: "GitHub API",
      owner: "github",
      stars: 45000,
      forks: 12000,
      language: "JavaScript",
      description: "REST API for GitHub - Integrations & automation",
      image: "🚀",
      url: "https://github.com/github/docs",
      tags: ["API", "Integration", "Tools", "Documentation"],
    },
    {
      id: 4,
      title: "React",
      owner: "facebook",
      stars: 200000,
      forks: 45000,
      language: "JavaScript",
      description: "A JavaScript library for building UIs - Component-based",
      image: "⚛️",
      url: "https://github.com/facebook/react",
      tags: ["Frontend", "UI", "Library", "Web Development"],
    },
    {
      id: 5,
      title: "TensorFlow",
      owner: "tensorflow",
      stars: 180000,
      forks: 74000,
      language: "Python",
      description: "Machine learning framework - Deep learning power",
      image: "🤖",
      url: "https://github.com/tensorflow/tensorflow",
      tags: ["ML", "AI", "Data Science", "Deep Learning"],
    },
    {
      id: 6,
      title: "Kubernetes",
      owner: "kubernetes",
      stars: 100000,
      forks: 36000,
      language: "Go",
      description: "Container orchestration platform - DevOps essential",
      image: "☸️",
      url: "https://github.com/kubernetes/kubernetes",
      tags: ["DevOps", "Containers", "Orchestration", "Infrastructure"],
    },
    {
      id: 7,
      title: "Vue.js",
      owner: "vuejs",
      stars: 210000,
      forks: 35000,
      language: "JavaScript",
      description: "Progressive JavaScript framework for UIs",
      image: "💚",
      url: "https://github.com/vuejs/vue",
      tags: ["Frontend", "UI", "Framework", "Web Development"],
    },
    {
      id: 8,
      title: "Docker",
      owner: "moby",
      stars: 160000,
      forks: 42000,
      language: "Go",
      description: "Containerization platform - Package & deploy apps",
      image: "🐳",
      url: "https://github.com/moby/moby",
      tags: ["DevOps", "Containers", "Infrastructure", "Tools"],
    },
    {
      id: 9,
      title: "Node.js",
      owner: "nodejs",
      stars: 100000,
      forks: 28000,
      language: "C++",
      description: "JavaScript runtime - Server-side execution",
      image: "🟩",
      url: "https://github.com/nodejs/node",
      tags: ["Backend", "Runtime", "Server", "JavaScript"],
    },
    {
      id: 10,
      title: "Django",
      owner: "django",
      stars: 75000,
      forks: 32000,
      language: "Python",
      description: "High-level Python web framework - Rapid development",
      image: "🦆",
      url: "https://github.com/django/django",
      tags: ["Web", "Backend", "Framework", "Python"],
    },
    {
      id: 11,
      title: "MongoDB",
      owner: "mongodb",
      stars: 85000,
      forks: 20000,
      language: "C++",
      description: "NoSQL database - Flexible document storage",
      image: "🍃",
      url: "https://github.com/mongodb/mongo",
      tags: ["Database", "NoSQL", "Backend", "Data"],
    },
    {
      id: 12,
      title: "Angular",
      owner: "angular",
      stars: 92000,
      forks: 24000,
      language: "TypeScript",
      description: "TypeScript-based frontend framework - Enterprise apps",
      image: "🅰️",
      url: "https://github.com/angular/angular",
      tags: ["Frontend", "Framework", "Enterprise", "TypeScript"],
    },
  ];

  const allLanguages = ["All", ...new Set(projects.map((p) => p.language))];

  // Calculate similarity score for recommendations
  const calculateSimilarity = (project, searchText) => {
    const lowerSearch = searchText.toLowerCase();
    const lowerTitle = project.title.toLowerCase();
    const lowerDesc = project.description.toLowerCase();
    const lowerTags = project.tags.join(" ").toLowerCase();

    let score = 0;

    // Exact match in title
    if (lowerTitle === lowerSearch) score += 100;
    // Partial match in title
    else if (lowerTitle.includes(lowerSearch)) score += 80;
    // Match in tags
    else if (lowerTags.includes(lowerSearch)) score += 60;
    // Match in description
    else if (lowerDesc.includes(lowerSearch)) score += 40;

    // Bonus for related categories
    const categoryKeywords = {
      frontend: ["react", "vue", "angular", "javascript"],
      backend: ["django", "node", "python", "go"],
      devops: ["docker", "kubernetes", "infrastructure"],
      ml: ["tensorflow", "ai", "machine learning"],
      database: ["mongodb", "sql", "data"],
    };

    for (const keywords of Object.values(categoryKeywords)) {
      if (
        keywords.some((kw) => lowerSearch.includes(kw)) &&
        keywords.some((kw) => lowerTags.includes(kw) || lowerTitle.includes(kw))
      ) {
        score += 30;
      }
    }

    return score;
  };

  // Filter and sort projects based on search and language
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (selectedLanguage !== "All") {
      filtered = filtered.filter((p) => p.language === selectedLanguage);
    }

    if (searchTerm.trim()) {
      filtered = filtered.sort((a, b) => {
        const scoreA = calculateSimilarity(a, searchTerm);
        const scoreB = calculateSimilarity(b, searchTerm);
        return scoreB - scoreA;
      });
    }

    return filtered;
  }, [searchTerm, selectedLanguage, projects]);

  // Get suggested projects based on current selection
  const getSuggestions = () => {
    if (!searchTerm.trim()) return [];

    return filteredProjects.slice(0, 5);
  };

  const suggestions = getSuggestions();

  return (
    <div className="projects-showcase">
      <div className="showcase-header">
        <h1>Featured Projects & Search</h1>
        <p>Discover popular GitHub repositories & find similar projects</p>
      </div>

      <div className="search-and-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search projects (e.g., React, Python, Machine Learning, DevOps)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="project-search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="language-filter">
          <p className="filter-label">Filter by Language:</p>
          <div className="filter-buttons">
            {allLanguages.map((lang) => (
              <button
                key={lang}
                className={`filter-btn ${selectedLanguage === lang ? "active" : ""}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searchTerm && suggestions.length > 0 && (
        <div className="suggestions-box">
          <h3>📌 Suggested Similar Projects</h3>
          <div className="suggestions-list">
            {suggestions.map((project) => (
              <div key={project.id} className="suggestion-item">
                <span className="suggestion-icon">{project.image}</span>
                <div className="suggestion-info">
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  <div className="suggestion-tags">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="suggestion-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="suggestion-btn"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">{project.image}</div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-owner">by {project.owner}</p>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-meta">
                  <span className="language-badge">{project.language}</span>
                  <span className="meta-item">⭐ {(project.stars / 1000).toFixed(0)}K</span>
                  <span className="meta-item">🔗 {(project.forks / 1000).toFixed(0)}K</span>
                </div>

                <button
                  className="project-btn"
                  onClick={() => window.open(project.url, "_blank")}
                >
                  View on GitHub →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No projects found matching your search. Try a different query!</p>
          </div>
        )}
      </div>

      {filteredProjects.length > 0 && (
        <section className="projects-stats">
          <h2>Project Statistics</h2>
          <div className="stats-cards">
            <div className="stat-box">
              <div className="stat-number">
                {(
                  filteredProjects.reduce((sum, p) => sum + p.stars, 0) / 1000000
                ).toFixed(1)}
                M+
              </div>
              <p>Total Stars</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">{filteredProjects.length}</div>
              <p>Projects Found</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">
                {(
                  filteredProjects.reduce((sum, p) => sum + p.forks, 0) / 1000
                ).toFixed(0)}
                K+
              </div>
              <p>Total Forks</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">
                {new Set(filteredProjects.map((p) => p.language)).size}
              </div>
              <p>Languages</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProjectShowcase;
