import { useEffect, useState } from "react";
import { FaDatabase } from "react-icons/fa";

import API from "../api/api";
import ZpoolCard from "../composants/zpools_card";

import "../styles/zpools.css";

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
    <div className="zpools-page">

      <h1 className="zpools-page-title">
        <FaDatabase className="zpools-title-icon" />
        Surveillance des pools ZFS
      </h1>

      <div className="zpools-grid">
        {zpools.map((pool) => (
          <ZpoolCard
            key={pool.name}
            pool={pool}
          />
        ))}
      </div>

    </div>
  );
}

export default Zpools;