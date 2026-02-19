import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">LaptopAI</div>

      <nav>
        <NavLink to="/" end>
          Predict
        </NavLink>

        <NavLink to="/insights">Insights</NavLink>

        <NavLink to="/performance">Performance</NavLink>

        <NavLink to="/about">About</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
