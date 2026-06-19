import { useEffect, useState } from "react";
import {
  FaMicrochip,
  FaTemperatureHigh,
  FaBolt,
  FaMemory,
  FaTachometerAlt,
  FaServer,
} from "react-icons/fa";
import API from "../api/api";
import "../styles/gpu.css";

function Gpu() {
  const [gpu, setGpu] = useState(null);

  const fetchGpu = () => {
    API.get("/api/gpu/status")
      .then((response) => {
        setGpu(response.data);
      })
      .catch((error) => {
        console.error("Erreur d'acquisition GPU :", error);
      });
  };

  useEffect(() => {
    fetchGpu();

    const interval = setInterval(fetchGpu, 15000);

    return () => clearInterval(interval);
  }, []);

  if (!gpu) {
    return (
      <div className="gpu-page">
        <h1 className="gpu-page-title">
          <FaMicrochip className="gpu-title-icon" />
          Monitoring GPU
        </h1>

        <div className="gpu-loading">
          Chargement des informations GPU...
        </div>
      </div>
    );
  }

  const memoryPercent =
    gpu.memory_total > 0
      ? Math.round((gpu.memory_used / gpu.memory_total) * 100)
      : 0;

  const powerPercent =
    gpu.power_limit > 0
      ? Math.round((gpu.power / gpu.power_limit) * 100)
      : 0;

  const getTempClass = (temp) => {
    if (temp >= 80) return "gpu-danger";
    if (temp >= 65) return "gpu-warning";
    return "gpu-ok";
  };

  const getUsageClass = (value) => {
    if (value >= 80) return "gpu-danger";
    if (value >= 50) return "gpu-warning";
    return "gpu-ok";
  };

  return (
    <div className="gpu-page">
      <h1 className="gpu-page-title">
        <FaMicrochip className="gpu-title-icon" />
        Monitoring GPU
      </h1>

      <div className="section-divider"></div>

      <section className="gpu-main-card">
        <div>
          <h2>{gpu.name}</h2>
          <p>Accélérateur IA / CUDA</p>
        </div>

        <div className="gpu-badge">
          {gpu.pstate}
        </div>
      </section>

      <div className="gpu-grid">
        <section className="gpu-card">
          <FaTemperatureHigh className="gpu-card-icon" />
          <span>Température</span>
          <strong className={getTempClass(gpu.temperature)}>
            {gpu.temperature}°C
          </strong>
        </section>

        <section className="gpu-card">
          <FaTachometerAlt className="gpu-card-icon" />
          <span>Charge GPU</span>
          <strong className={getUsageClass(gpu.utilization)}>
            {gpu.utilization}%
          </strong>
        </section>

        <section className="gpu-card">
          <FaBolt className="gpu-card-icon" />
          <span>Consommation</span>
          <strong>
            {gpu.power} W / {gpu.power_limit} W
          </strong>

          <div className="gpu-progress">
            <div
              className="gpu-progress-fill"
              style={{ width: `${powerPercent}%` }}
            ></div>
          </div>

          <small>{powerPercent}% de la limite</small>
        </section>

        <section className="gpu-card">
          <FaMemory className="gpu-card-icon" />
          <span>VRAM</span>
          <strong>
            {gpu.memory_used} / {gpu.memory_total} Mo
          </strong>

          <div className="gpu-progress">
            <div
              className="gpu-progress-fill"
              style={{ width: `${memoryPercent}%` }}
            ></div>
          </div>

          <small>{memoryPercent}% utilisée</small>
        </section>
      </div>

      <section className="gpu-info-card">
        <h2>
          <FaServer className="gpu-section-icon" />
          Informations pilote
        </h2>

        <div className="gpu-info-grid">
          <div>
            <span>Driver NVIDIA</span>
            <strong>{gpu.driver}</strong>
          </div>

          <div>
            <span>P-State</span>
            <strong>{gpu.pstate}</strong>
          </div>

          <div>
            <span>Mémoire totale</span>
            <strong>{gpu.memory_total} Mo</strong>
          </div>

          <div>
            <span>Power limit</span>
            <strong>{gpu.power_limit} W</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gpu;