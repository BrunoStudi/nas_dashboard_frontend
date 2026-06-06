function ZpoolCard({ pool }) {
  const isHealthy = pool.health === "ONLINE";

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: 0 }}>{pool.name}</h3>
          <p style={{ color: "#6b7280" }}>Pool ZFS</p>
        </div>

        <span
          style={{
            background: isHealthy ? "#16a34a" : "#dc2626",
            color: "white",
            borderRadius: "12px",
            padding: "8px 12px",
            fontWeight: "bold"
          }}
        >
          {pool.health}
        </span>
      </div>

      <p><strong>Taille :</strong> {pool.size}B</p>
      <p><strong>Utilisé :</strong> {pool.allocated}B</p>
      <p><strong>Libre :</strong> {pool.free}B</p>
      <p><strong>Utilisation :</strong> {pool.capacity}</p>
      <p><strong>Fragmentation :</strong> {pool.fragmentation}</p>
      <p><strong>Dedup :</strong> {pool.dedup}</p>
    </div>
  );
}

export default ZpoolCard;