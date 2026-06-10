import { useEffect, useState } from "react";
import API from "../api/api";
import DiskCard from "../composants/disk_card";
import { FaHdd } from "react-icons/fa";
import "../styles/disks.css";

function Disk() {

  const [disks, setDisks] = useState([]);

  useEffect(() => {
    const fetchDisks = () => {
      API.get("/api/disks/")
        .then((response) => {
          setDisks(response.data);
        })
        .catch((error) => {
          console.error("Erreur API :", error);
        });
    };

    fetchDisks();

    const interval = setInterval(fetchDisks, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="disks-page">

      <h1 className="disks-page-title">
        <FaHdd className="disks-title-icon" />
        Surveillance des disques
      </h1>

      <div className="section-divider"></div>

      <div className="disks-grid">

        {disks.map((disk) => (
          <DiskCard
            key={disk.serial}
            disk={disk}
          />
        ))}

      </div>

    </div>

  );
}

export default Disk;