import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/dashboard.css";
import { FaMicrochip, FaMemory, FaHdd, FaServer } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";

function Dashboard() {
  const [system, setSystem] = useState({});
  const [temps, setTemps] = useState([]);

  const storagePercent = Number(system.storage?.percent ?? 0);
  const storageColor =
    system.storage?.percent > 80
      ? "#dc2626"
      : system.storage?.percent > 60
        ? "#f59e0b"
        : "#16a34a";

  const formatRam = (value) => {
    if (!value) return "N/A";

    return value
      .replace("Gi", "GB")
      .replace("Ti", "TB");
  };

  const parseRamValue = (value) => {
    if (!value || value === "N/A") return 0;

    return parseFloat(
      value
        .replace("Gi", "")
        .replace("Mi", "")
        .replace("GB", "")
        .replace("MB", "")
    );
  };

  const ramTotal = parseRamValue(system.ram_total);
  const ramUsed = parseRamValue(system.ram_used);
  const ramPercent = ramTotal > 0 ? Math.round((ramUsed / ramTotal) * 100) : 0;

  const ramColor =
    ramPercent > 90
      ? "#dc2626"
      : ramPercent > 70
        ? "#f59e0b"
        : "#16a34a";

  useEffect(() => {
    const fetchDashboard = () => {
      API.get("/api/system/info")
        .then((res) => setSystem(res.data))
        .catch((err) => console.error("Erreur system info :", err));

      API.get("/api/ipmi/temps")
        .then((res) => setTemps(res.data.temperatures || []))
        .catch((err) => console.error("Erreur IPMI temps :", err));
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-header">
        <FaServer className="dashboard-header-icon" />
        NAS EXODUS (Serveur Primaire)
      </h1>

      <div className="section-divider"></div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2 className="dashboard-title">
            <FaMicrochip className="dashboard-icon cpu-icon" />
            Processeurs
          </h2>
          <p className="dashboard-main-value">{system.cpu_model || "N/A"}</p>
          <p className="dashboard-sub-value">
            Fréquence actuelle : <strong>{system.cpu_current_ghz} GHz</strong>
          </p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-title">
            <FaMemory className="dashboard-icon ram-icon" />
            Mémoire RAM
          </h2>

          <p className="dashboard-main-value">
            {formatRam(system.ram_total)}
          </p>

          <div className="ram-progress-wrapper">
            <div className="ram-progress-info">
              <span>{ramPercent}% utilisé</span>
              <span>
                {formatRam(system.ram_used)} / {formatRam(system.ram_total)}
              </span>
            </div>

            <div className="ram-progress-bar">
              <div
                className="ram-progress-fill"
                style={{
                  width: `${ramPercent}%`,
                  backgroundColor: ramColor
                }}
              />
            </div>
          </div>

          <div className="ram-details">
            <div>
              Utilisée : <strong>{formatRam(system.ram_used)}</strong>
            </div>

            <div>
              Disponible : <strong>{formatRam(system.ram_available)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">
          <FaHdd className="dashboard-icon storage-icon" />
          Stockage global
        </h2>

        <p className="dashboard-main-value">
          {system.storage?.total_tb ?? "N/A"} TB
        </p>

        <div className="ram-progress-wrapper">
          <div className="ram-progress-info">
            <span>{system.storage?.percent ?? 0}% utilisé</span>
            <span>
              {system.storage?.used_tb ?? 0} TB / {system.storage?.total_tb ?? 0} TB
            </span>
          </div>

          <div className="ram-progress-bar">
            <div
              className="storage-progress-fill"
              style={{
                width: `${storagePercent}%`,
                backgroundColor: storageColor
              }}
            />
          </div>
        </div>

        <div className="ram-details">
          <div>
            Utilisé : <strong>{system.storage?.used_tb ?? 0} TB</strong>
          </div>

          <div>
            Libre : <strong>{system.storage?.free_tb ?? 0} TB</strong>
          </div>
        </div>
      </div>

      <section className="dashboard-card">
        <h2 className="dashboard-title">
          <FaTemperatureHalf className="dashboard-icon temp-icon" />
          Températures IPMI
        </h2>

        <div className="temp-grid">
          {temps.map((temp) => (
            <div key={temp.name} className="temp-card">
              <span className="temp-name">{temp.name}</span>
              <span className="temp-value">{temp.value}°C</span>
              <span className={`temp-status temp-${temp.status}`}>
                {temp.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div >
  );
}

export default Dashboard;