import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Performance from "./pages/Performance";
import About from "./pages/About";
import Model from "./pages/Model";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/insights" element={<Insights />} />

          <Route path="/performance" element={<Performance />} />

          <Route path="/model" element={<Model />} />

          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
