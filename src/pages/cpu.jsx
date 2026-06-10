import { useEffect, useState } from "react";
import { FaMicrochip, FaTemperatureHalf } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa";
import "../styles/cpu.css";

import API from "../api/api";

import CpuCard from "../composants/cpu_card";
import CpuPackageCard from "../composants/cpu_package_card";
import CpuLoadChart from "../composants/cpu_charge";

import "../styles/cpu.css";

function Cpu() {
  const [cpu, setCpu] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    API.get("/api/cpu/")
      .then((response) => {
        setCpu(response.data.cpu);
        setHistory(response.data.cpu_history || []);
      })
      .catch((error) => {
        console.error("Erreur API CPU :", error);
      });
  }, []);

  if (!cpu) {
    return <p className="cpu-loading">Chargement CPU...</p>;
  }

  return (
    <div className="cpu-page">
      <h1 className="cpu-page-title">
        <FaMicrochip className="cpu-title-icon" />
        Surveillance des processeurs
      </h1>

      <div className="section-divider"></div>

      <section className="cpu-section">
        <CpuCard cpu={cpu} />
      </section>

      <section className="cpu-section">
        <h2 className="cpu-section-title">
          <FaChartLine className="cpu-section-icon" />
          Charge CPU
        </h2>

        <CpuLoadChart history={history} />
      </section>

      <section className="cpu-section">
        <h2 className="cpu-section-title">
          <FaTemperatureHalf className="cpu-section-icon" />
          Températures CPU
        </h2>

        <div className="cpu-packages-grid">
          {cpu.packages?.map((pack) => (
            <CpuPackageCard key={pack.name} pack={pack} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Cpu;