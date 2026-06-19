import { useEffect, useState } from "react";
import { FaFan, FaBolt, FaClipboardList, FaServer, FaMicrochip, FaGamepad } from "react-icons/fa";
import API from "../api/api";
import "../styles/ipmi.css";

function Ipmi() {
  const [fans, setFans] = useState([]);
  const [log, setLog] = useState([]);

  const [hddMode, setHddMode] = useState("AUTO");
  const [gpuMode, setGpuMode] = useState("AUTO");

  const [hddPwm, setHddPwm] = useState(70);
  const [gpuPwm, setGpuPwm] = useState(70);

  const fetchIpmi = () => {
    API.get("/api/ipmi/status")
      .then((response) => {
        setFans(response.data.fans || []);
        setHddMode(response.data.hdd_mode || response.data.mode || "AUTO");
        setGpuMode(response.data.gpu_mode || "AUTO");
      })
      .catch((error) => {
        console.error("Erreur d'acquisition du status IPMI :", error);
      });

    API.get("/api/ipmi/log")
      .then((response) => {
        setLog(response.data.lines || []);
      })
      .catch((error) => {
        console.error("Erreur d'acquisition du log IPMI :", error);
      });
  };

  useEffect(() => {
    fetchIpmi();

    const interval = setInterval(fetchIpmi, 30000);

    return () => clearInterval(interval);
  }, []);

  const setHddFanMode = (value) => {
    API.post(`/api/ipmi/fans/hdd/${value}`)
      .then(() => fetchIpmi())
      .catch((error) => {
        console.error("Erreur de changement du mode HDD :", error);
      });
  };

  const setGpuFanMode = (value) => {
    API.post(`/api/ipmi/fans/gpu/${value}`)
      .then(() => fetchIpmi())
      .catch((error) => {
        console.error("Erreur de changement du mode GPU :", error);
      });
  };

  const getFanSpeedClass = (rpm) => {
    const value = Number(rpm);

    if (!value || value <= 0) {
      return "fan-stopped";
    }

    if (value < 2500) {
      return "fan-slow";
    }

    if (value < 4000) {
      return "fan-medium";
    }

    return "fan-fast";
  };

  const renderFanGrid = (zoneFans) => (
    <div className="fan-grid">
      {zoneFans.map((fan) => (
        <div key={fan.name} className="fan-card">
          <div className="fan-name">
            <FaFan className={`fan-icon ${getFanSpeedClass(fan.rpm)}`} />
            {fan.name}
          </div>

          <div className="fan-rpm">
            {fan.rpm} RPM
          </div>

          <div
            className={`fan-status ${
              fan.status.toLowerCase() === "ok"
                ? "fan-status-ok"
                : fan.status.toLowerCase() === "warn"
                  ? "fan-status-warn"
                  : "fan-status-crit"
            }`}
          >
            {fan.status}
          </div>
        </div>
      ))}
    </div>
  );

  const hddFans = fans.filter((fan) =>
    ["FAN1", "FAN2", "FAN3"].includes(fan.name)
  );

  const cpuFans = fans.filter((fan) =>
    ["FAN4", "FAN5"].includes(fan.name)
  );

  const sasFans = fans.filter((fan) =>
    ["FAN6"].includes(fan.name)
  );

  const gpuFans = fans.filter((fan) =>
    ["FANA", "FANB"].includes(fan.name)
  );

  return (
    <div className="ipmi-page">
      <h1 className="ipmi-page-title">
        <FaServer className="ipmi-title-icon" />
        Gestion des contrôles IPMI
      </h1>

      <div className="section-divider"></div>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaBolt className="ipmi-section-icon" />
          Mode ventilateurs HDD
        </h2>

        <p>
          Mode actuel : <strong>{hddMode}</strong>
        </p>

        <div className="ipmi-slider-zone">
          <div className="ipmi-slider-header">
            <span className="pwm-title">
              <FaBolt className="pwm-icon" />
              PWM manuel HDD
            </span>

            <strong className="pwm-value">
              {hddPwm}%
            </strong>
          </div>

          <input
            type="range"
            min="40"
            max="100"
            step="1"
            value={hddPwm}
            onChange={(e) => setHddPwm(e.target.value)}
            className="ipmi-slider"
          />

          <div className="ipmi-slider-labels">
            <span>40%</span>
            <span>100%</span>
          </div>

          <div className="ipmi-buttons">
            <button className="ipmi-btn" onClick={() => setHddFanMode("auto")}>
              Mode Auto HDD
            </button>

            <button className="ipmi-btn ipmi-btn-manual" onClick={() => setHddFanMode(hddPwm)}>
              Appliquer HDD {hddPwm}%
            </button>
          </div>
        </div>
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaGamepad className="ipmi-section-icon" />
          Mode ventilateurs GPU
        </h2>

        <p>
          Mode actuel : <strong>{gpuMode}</strong>
        </p>

        <div className="ipmi-slider-zone">
          <div className="ipmi-slider-header">
            <span className="pwm-title">
              <FaBolt className="pwm-icon" />
              PWM manuel GPU
            </span>

            <strong className="pwm-value">
              {gpuPwm}%
            </strong>
          </div>

          <input
            type="range"
            min="40"
            max="100"
            step="1"
            value={gpuPwm}
            onChange={(e) => setGpuPwm(e.target.value)}
            className="ipmi-slider"
          />

          <div className="ipmi-slider-labels">
            <span>40%</span>
            <span>100%</span>
          </div>

          <div className="ipmi-buttons">
            <button className="ipmi-btn" onClick={() => setGpuFanMode("auto")}>
              Mode Auto GPU
            </button>

            <button className="ipmi-btn ipmi-btn-manual" onClick={() => setGpuFanMode(gpuPwm)}>
              Appliquer GPU {gpuPwm}%
            </button>
          </div>
        </div>
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaFan className="ipmi-section-icon" />
          Ventilateurs zone HDD
        </h2>

        {renderFanGrid(hddFans)}
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaMicrochip className="ipmi-section-icon" />
          Ventilateurs zone CPU
        </h2>

        {renderFanGrid(cpuFans)}
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaServer className="ipmi-section-icon" />
          Ventilateurs zone SAS
        </h2>

        {renderFanGrid(sasFans)}
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaGamepad className="ipmi-section-icon" />
          Ventilateurs zone GPU
        </h2>

        {renderFanGrid(gpuFans)}
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaClipboardList className="ipmi-section-icon" />
          Log de la ventilation
        </h2>

        <div className="ipmi-log-list">
          {log.length > 0 ? (
            log.slice().reverse().map((line, index) => (
              <div key={index} className="ipmi-log-line">
                {line}
              </div>
            ))
          ) : (
            <div className="ipmi-log-empty">
              Aucun log disponible pour le moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Ipmi;