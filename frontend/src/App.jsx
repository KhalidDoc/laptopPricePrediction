import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Performance from "./pages/Performance";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
