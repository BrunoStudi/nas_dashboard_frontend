import { useEffect, useState } from "react";
import { FaFan, FaBolt, FaClipboardList, FaServer, FaMicrochip } from "react-icons/fa";
import API from "../api/api";
import "../styles/ipmi.css";

function Ipmi() {
  const [fans, setFans] = useState([]);
  const [log, setLog] = useState([]);
  const [mode, setMode] = useState("AUTO");
  const [pwm, setPwm] = useState(70);

  const fetchIpmi = () => {
    API.get("/api/ipmi/status")
      .then((response) => {
        setFans(response.data.fans || []);
        setMode(response.data.mode || "AUTO");
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

    const interval = setInterval(fetchIpmi, 15000);

    return () => clearInterval(interval);
  }, []);

  const setFanMode = (value) => {
    API.post(`/api/ipmi/fans/${value}`)
      .then(() => fetchIpmi())
      .catch((error) => {
        console.error("Erreur de changement du mode des ventilateurs :", error);
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

  const cpuFans = fans.filter((fan) =>
    ["FAN1", "FAN2"].includes(fan.name)
  );

  const hddFans = fans.filter((fan) =>
    ["FAN3", "FAN4", "FANA"].includes(fan.name)
  );

  const sasFans = fans.filter((fan) =>
    ["FAN5", "FAN6"].includes(fan.name)
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
          Mode des ventilateurs HDD
        </h2>

        <p>
          Mode actuel : <strong>{mode}</strong>
        </p>

        <div className="ipmi-slider-zone">
          <div className="ipmi-slider-header">
            <span className="pwm-title">
              <FaBolt className="pwm-icon" />
              PWM manuel
            </span>

            <strong className="pwm-value">
              {pwm}%
            </strong>
          </div>

          <input
            type="range"
            min="40"
            max="100"
            step="1"
            value={pwm}
            onChange={(e) => setPwm(e.target.value)}
            className="ipmi-slider"
          />

          <div className="ipmi-slider-labels">
            <span>40%</span>
            <span>100%</span>
          </div>

          <div className="ipmi-buttons">
            <button className="ipmi-btn" onClick={() => setFanMode("auto")}>
              Mode Auto
            </button>

            <button className="ipmi-btn ipmi-btn-manual" onClick={() => setFanMode(pwm)}>
              Appliquer {pwm}%
            </button>
          </div>
        </div>
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaMicrochip className="ipmi-section-icon" />
          Ventilateurs zone CPU
        </h2>

        <div className="fan-grid">
          {cpuFans.map((fan) => (
            <div key={fan.name} className="fan-card">

              <div className="fan-name">
                <FaFan className={`fan-icon ${getFanSpeedClass(fan.rpm)}`} />
                {fan.name}
              </div>

              <div className="fan-rpm">
                {fan.rpm} RPM
              </div>

              <div
                className={`fan-status ${fan.status.toLowerCase() === "ok"
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
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaFan className="ipmi-section-icon" />
          Ventilateurs zones HDD
        </h2>

        <div className="fan-grid">
          {hddFans.map((fan) => (
            <div key={fan.name} className="fan-card">

              <div className="fan-name">
                <FaFan className={`fan-icon ${getFanSpeedClass(fan.rpm)}`} />
                {fan.name}
              </div>

              <div className="fan-rpm">
                {fan.rpm} RPM
              </div>

              <div
                className={`fan-status ${fan.status.toLowerCase() === "ok"
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
      </section>

      <section className="ipmi-card">
        <h2 className="ipmi-section-title">
          <FaServer className="ipmi-section-icon" />
          Ventilateurs zone SAS
        </h2>

        <div className="fan-grid">
          {sasFans.map((fan) => (
            <div key={fan.name} className="fan-card">

              <div className="fan-name">
                <FaFan className={`fan-icon ${getFanSpeedClass(fan.rpm)}`} />
                {fan.name}
              </div>

              <div className="fan-rpm">
                {fan.rpm} RPM
              </div>

              <div
                className={`fan-status ${fan.status.toLowerCase() === "ok"
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