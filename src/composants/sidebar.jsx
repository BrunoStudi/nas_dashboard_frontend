import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bouton burger mobile */}
      <button
        className="burger-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Fond sombre */}
      {open && (
        <div
          className="overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2>NAS Monitor</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "30px"
          }}
        >
          <Link onClick={() => setOpen(false)} to="/">NAS Exodus</Link>
          <Link onClick={() => setOpen(false)} to="/cpu">CPU</Link>
          <Link onClick={() => setOpen(false)} to="/disks">Disques</Link>
          <Link onClick={() => setOpen(false)} to="/zpools">Status pools</Link>
          <Link onClick={() => setOpen(false)} to="/ipmi">IPMI</Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;