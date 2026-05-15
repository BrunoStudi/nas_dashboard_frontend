import { useEffect, useState } from "react";
import API from "../api/api";
import CpuCard from "../composants/cpu_card";
import CpuPackageCard from "../composants/cpu_package_card";
import CpuLoadChart from "../composants/cpu_charge";

function Cpu() {
    const [cpu, setCpu] = useState(null);

    useEffect(() => {
        API.get("/api/cpu/")
            .then((response) => {
                setCpu(response.data);
            })
            .catch((error) => {
                console.error("Erreur API CPU :", error);
            });
    }, []);

    if (!cpu) {
        return <p>Chargement CPU...</p>;
    }

    return (
        <div>
            <h1>Surveillance des processeurs</h1>

            <div style={{ marginBottom: "24px" }}>
                <CpuCard cpu={cpu} />
            </div>

            <div style={{ marginBottom: "24px" }}>
                <CpuLoadChart load={cpu.cpu_load} />
            </div>

            <h2>Températures CPU</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "24px"
                }}
            >
                {cpu.packages?.map((pack) => (
                    <CpuPackageCard key={pack.name} pack={pack} />
                ))}
            </div>
        </div>
    );
}

export default Cpu;