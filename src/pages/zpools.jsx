import { useEffect, useState } from "react";
import API from "../api/api";
import ZpoolCard from "../composants/zpools_card";

function Zpools() {
  const [zpools, setZpools] = useState([]);

  useEffect(() => {
    API.get("/api/zpools/")
      .then((response) => {
        setZpools(response.data);
      })
      .catch((error) => {
        console.error("Erreur API ZPools :", error);
      });
  }, []);

  return (
    <div>
      <h1>Surveillance des pools ZFS</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px"
        }}
      >
        {zpools.map((pool) => (
          <ZpoolCard key={pool.name} pool={pool} />
        ))}
      </div>
    </div>
  );
}

export default Zpools;