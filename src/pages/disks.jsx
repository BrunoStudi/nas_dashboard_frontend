import { useEffect, useState } from "react";
import API from "../api/api";
import DiskCard from "../composants/disk_card";

function Disk() {

  const [disks, setDisks] = useState([]);

  useEffect(() => {

    API.get("/api/disks/")
      .then((response) => {
        setDisks(response.data);
      })
      .catch((error) => {
        console.error("Erreur API :", error);
      });

  }, []);

  return (

    <div style={{ fontFamily: "Arial" }}>

      <h1>Surveillance des disques</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px"
        }}
      >

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