import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import Dashboard from "./pages/dashboard";
import Disks from "./pages/disks";
import Cpu from "./pages/cpu";
import Zpools from "./pages/zpools";
import Ipmi from "./pages/ipmi";
import Gpu from "./pages/gpu";

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
          <Route path="/gpu" element={<Gpu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;