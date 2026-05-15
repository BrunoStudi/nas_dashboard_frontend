import { Outlet } from "react-router-dom";
import Sidebar from "../composants/sidebar";

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh"
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f3f4f6"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;