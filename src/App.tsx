import { useState } from "react";
import "./App.css";

function App() {
  const [lastChecked, setLastChecked] = useState(
    new Date().toLocaleTimeString(),
  );

  const services = [
    {
      name: "CI Pipeline",
      status: "Passed",
      description: "GitHub Actions",
      icon: "✓",
    },
    {
      name: "Docker Container",
      status: "Healthy",
      description: "Production container",
      icon: "▣",
    },
    {
      name: "Deployment",
      status: "Production",
      description: "Oracle Cloud VPS",
      icon: "↗",
    },
    {
      name: "Container Registry",
      status: "Published",
      description: "GitHub Container Registry",
      icon: "◈",
    },
  ];

  const refreshStatus = () => {
    setLastChecked(new Date().toLocaleTimeString());
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">DEVOPS PORTFOLIO PROJECT</p>
          <h1>Deployment Dashboard</h1>
          <p className="subtitle">
            Monitor your application deployment at a glance.
          </p>
        </div>

        <span className="environment">PRODUCTION</span>
      </header>

      <section className="status-grid">
        {services.map((service) => (
          <article className="status-card" key={service.name}>
            <span className="service-icon">{service.icon}</span>
            <h2>{service.name}</h2>
            <p className="service-status">{service.status}</p>
            <p className="service-description">{service.description}</p>
          </article>
        ))}
      </section>

      <section className="deployment-panel">
        <div>
          <h2>Deployment Overview</h2>
          <p>Application: devops-react-app</p>
          <p>Platform: Docker + Oracle Cloud</p>
          <p>Registry: GHCR</p>
          <p>Last checked: {lastChecked}</p>
        </div>

        <button type="button" onClick={refreshStatus}>
          Refresh Status
        </button>
      </section>

      <footer>DevOps React Deployment Project</footer>
    </main>
  );
}

export default App;
