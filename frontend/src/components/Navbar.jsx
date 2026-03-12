import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import darkIcon from "../assets/icons/dark.svg";
import lightIcon from "../assets/icons/light.svg";

const Navbar = () => {
  const [dark, setDark] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <nav
      className="
      sticky top-0 z-50
      backdrop-blur-xl
      bg-white/80 dark:bg-slate-900/70
      border-b border-slate-200 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* LOGO */}

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="
          text-xl font-bold
          bg-linear-to-r
          from-blue-600 via-cyan-500 to-indigo-600
          dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
          bg-clip-text text-transparent"
        >
          LaptopAI
        </motion.h1>

        {/* NAV LINKS */}

        <div className="flex items-center gap-8 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-blue-500 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition hover:text-blue-500 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/model"
            className={({ isActive }) =>
              `transition hover:text-blue-500 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Model Insights
          </NavLink>

          <NavLink
            to="/insights"
            className={({ isActive }) =>
              `transition hover:text-blue-500 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            Market Insights
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition hover:text-blue-500 ${
                isActive ? "text-blue-500" : ""
              }`
            }
          >
            About
          </NavLink>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">
          {/* DARK MODE BUTTON */}

          <button
            onClick={toggleTheme}
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            border border-slate-200 dark:border-white/10
            hover:bg-slate-100 dark:hover:bg-white/10
            transition"
          >
            {dark ? (
              <img src={darkIcon} alt="Dark Mode" />
            ) : (
              <img src={lightIcon} alt="Light Mode" />
            )}
          </button>

          {/* CTA */}

          <Link
            to="/dashboard"
            className="
            px-4 py-2 rounded-lg
            bg-linear-to-r
            from-blue-600 to-indigo-600
            text-white text-sm
            hover:opacity-90 transition"
          >
            Launch Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
