import { useEffect, useState } from "react";
import { FaDatabase } from "react-icons/fa";

import API from "../api/api";
import ZpoolCard from "../composants/zpools_card";

import "../styles/zpools.css";

function Zpools() {
  const [zpools, setZpools] = useState([]);
  const [zpoolDetails, setZpoolDetails] = useState({});
  const [zpoolStatus, setZpoolStatus] = useState("N/A");

  useEffect(() => {
    API.get("/api/zpools/")
      .then((response) => {
        setZpools(response.data.zpools || []);
        setZpoolDetails(response.data.zpool_details || {});
        setZpoolStatus(response.data.zpool_status || "N/A");
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

      <div className="section-divider"></div>

      {zpoolStatus !== "all pools are healthy" && (
        <div className="zpool-global-alert">
          {zpoolStatus}
        </div>
      )}

      <div className="zpools-grid">
        {zpools.map((pool) => (
          <ZpoolCard
            key={pool.name}
            pool={pool}
            details={zpoolDetails[pool.name]}
          />
        ))}
      </div>

    </div>
  );
}

export default Zpools;