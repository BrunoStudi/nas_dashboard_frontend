import { Outlet } from "react-router-dom";
import Sidebar from "../composants/sidebar";
import "../styles/main_layout.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;