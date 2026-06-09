import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  HardDrive,
  Database,
  Server,
  Bot,
  Menu,
  X
} from "lucide-react";

import "../styles/sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  const links = [
    {
      to: "/",
      label: "NAS EXODUS",
      icon: <LayoutDashboard size={20} />
    },
    {
      to: "/cpu",
      label: "CPU",
      icon: <Cpu size={20} />
    },
    {
      to: "/disks",
      label: "Disques",
      icon: <HardDrive size={20} />
    },
    {
      to: "/zpools",
      label: "Pools ZFS",
      icon: <Database size={20} />
    },
    {
      to: "/ipmi",
      label: "IPMI",
      icon: <Server size={20} />
    },
    {
      to: "/hestia",
      label: "HESTIA",
      icon: <Bot size={20} />,
      disabled: true
    }
  ];

  return (
    <>
      <button
        className="burger-btn"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && <div className="overlay" onClick={closeSidebar} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Server size={26} />
          </div>

          <div>
            <h2>DashboardNAS</h2>
            <p>EXODUS</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) =>
            link.disabled ? (
              <div key={link.to} className="sidebar-link disabled">
                {link.icon}
                <span>{link.label}</span>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="sidebar-footer">
          <span>🚀 EXODUS</span>
          <small>Monitoring local</small>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;