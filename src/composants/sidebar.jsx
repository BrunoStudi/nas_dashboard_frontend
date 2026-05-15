import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      background: "#111827",
      color: "white",
      padding: "20px"
    }}>
      <h2>NAS Monitor</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px" }}>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">Dashboard</Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/cpu">CPU</Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/disks">Disques</Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/zpools">ZPools</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;