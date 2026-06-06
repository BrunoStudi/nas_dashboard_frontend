import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import Dashboard from "./pages/dashboard";
import Disks from "./pages/disks";
import Cpu from "./pages/cpu";
import Zpools from "./pages/zpools";
import Ipmi from "./pages/ipmi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cpu" element={<Cpu />} />
          <Route path="/disks" element={<Disks />} />
          <Route path="/zpools" element={<Zpools />} />
          <Route path="/ipmi" element={<Ipmi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;