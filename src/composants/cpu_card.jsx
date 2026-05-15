function CpuCard({ cpu }) {
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
      <h2 style={{ marginTop: 0 }}>CPU</h2>

      <p><strong>Modèle :</strong> {cpu.model}</p>
      <p><strong>Socket(s) :</strong> {cpu.sockets}</p>
      <p><strong>Cœurs / socket :</strong> {cpu.cores_per_socket}</p>
      <p><strong>Threads / cœur :</strong> {cpu.threads_per_core}</p>
      <p><strong>Threads total :</strong> {cpu.threads_total}</p>
      <p><strong>NUMA nodes :</strong> {cpu.numa_nodes}</p>
      <p><strong>Fréquence :</strong> {cpu.cpu_min_mhz} MHz → {cpu.cpu_max_mhz} MHz</p>
    </div>
  );
}

export default CpuCard;