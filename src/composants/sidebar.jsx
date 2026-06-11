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
  X,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import "../styles/sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [exodusOpen, setExodusOpen] = useState(true);
  const [hephaistosOpen, setHephaistosOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

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
            <p>Infrastructure</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className="sidebar-group-btn"
            onClick={() => setExodusOpen(!exodusOpen)}
          >
            <span className="sidebar-group-title">
              <Server size={20} />
              EXODUS
            </span>

            {exodusOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {exodusOpen && (
            <div className="sidebar-submenu">
              <NavLink
                to="/"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/cpu"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Cpu size={18} />
                <span>CPU</span>
              </NavLink>

              <NavLink
                to="/disks"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HardDrive size={18} />
                <span>Disques</span>
              </NavLink>

              <NavLink
                to="/zpools"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Database size={18} />
                <span>Pools ZFS</span>
              </NavLink>

              <NavLink
                to="/ipmi"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <Server size={18} />
                <span>IPMI</span>
              </NavLink>
            </div>
          )}

          <button
            className="sidebar-group-btn disabled"
            onClick={() => setHephaistosOpen(!hephaistosOpen)}
          >
            <span className="sidebar-group-title">
              <Server size={20} />
              HÉPHAÏSTOS
            </span>

            {hephaistosOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {hephaistosOpen && (
            <div className="sidebar-submenu disabled">
              <div className="sidebar-link disabled">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </div>

              <div className="sidebar-link disabled">
                <Cpu size={18} />
                <span>CPU</span>
              </div>

              <div className="sidebar-link disabled">
                <HardDrive size={18} />
                <span>Disques</span>
              </div>

              <div className="sidebar-link disabled">
                <Database size={18} />
                <span>Pools ZFS</span>
              </div>
            </div>
          )}

          <div className="sidebar-link disabled">
            <Bot size={20} />
            <span>HESTIA</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <span>🚀 Serveurs</span>
          <small>Monitoring local</small>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;