function DiskCard({ disk }) {

  const getTemperatureColor = () => {

    if (disk.temperature >= 55) {
      return "#dc2626";
    }

    if (disk.temperature >= 45) {
      return "#f59e0b";
    }

    return "#16a34a";
  };

  return (

    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.2s",
        border: "1px solid #e5e7eb"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px"
        }}
      >

        <div>

          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#111827"
            }}
          >
            {disk.device}
          </h3>

          <p
            style={{
              margin: "4px 0 0 0",
              color: "#6b7280",
              fontSize: "14px"
            }}
          >
            {disk.model}
          </p>

        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px"
          }}
        >

          <div
            style={{
              background: getTemperatureColor(),
              color: "white",
              borderRadius: "12px",
              padding: "10px 14px",
              fontWeight: "bold",
              fontSize: "18px",
              minWidth: "90px",
              textAlign: "center"
            }}
          >
            {disk.temperature ?? "N/A"}°C
          </div>

          <div
            style={{
              background: "#dc2626",
              color: "white",
              borderRadius: "10px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              minWidth: "90px",
              textAlign: "center"
            }}
          >
            MAX {disk.max_temperature ?? "N/A"}°C
          </div>

        </div>

      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        <div>
          <strong>Série :</strong>

          <div
            style={{
              color: "#4b5563",
              marginTop: "4px",
              wordBreak: "break-all"
            }}
          >
            {disk.serial}
          </div>
        </div>

        <div>
          <strong>SMART :</strong>

          <span
            style={{
              marginLeft: "8px",
              color:
                disk.health === "PASSED" || disk.health === "OK"
                  ? "#16a34a"
                  : "#dc2626",
              fontWeight: "bold"
            }}
          >
            {disk.health}
          </span>
        </div>

        <div>
          <strong>Alerte :</strong>

          <span
            style={{
              marginLeft: "8px",
              color:
                disk.alert === "CRIT"
                  ? "#dc2626"
                  : disk.alert === "WARN"
                    ? "#f59e0b"
                    : "#16a34a",
              fontWeight: "bold"
            }}
          >
            {disk.alert}
          </span>
        </div>

      </div>

    </div>

  );
}

export default DiskCard;