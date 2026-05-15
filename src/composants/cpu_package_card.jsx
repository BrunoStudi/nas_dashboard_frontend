function CpuPackageCard({ pack }) {
  const getColor = () => {
    if (pack.temperature >= 75) return "#dc2626";
    if (pack.temperature >= 60) return "#f59e0b";
    return "#16a34a";
  };

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
      <h3 style={{ marginTop: 0 }}>{pack.name}</h3>

      <div
        style={{
          background: getColor(),
          color: "white",
          borderRadius: "14px",
          padding: "12px 16px",
          fontSize: "22px",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        {pack.temperature}°C
      </div>
    </div>
  );
}

export default CpuPackageCard;