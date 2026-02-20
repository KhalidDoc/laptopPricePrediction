import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkStyle =
    "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300";

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50
        bg-white dark:bg-slate-900/90
        border border-slate-300 dark:border-white/10
        backdrop-blur-md
        p-2 rounded-lg
        text-slate-800 dark:text-white"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:sticky top-0 left-0 z-50
        h-screen lg:h-auto
        w-64
        bg-white dark:bg-slate-950/90
        border-r border-slate-200 dark:border-white/10
        backdrop-blur-xl
        flex flex-col p-6
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold tracking-tight 
          bg-linear-to-r from-blue-600 via-cyan-500 to-indigo-600 
          dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
          bg-clip-text text-transparent"
          >
            LaptopAI
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-500 mt-1">
            Price Intelligence System
          </p>

          {/* Model Badge */}
          <div
            className="mt-4 inline-flex px-3 py-1 rounded-full text-[10px] font-medium 
            bg-purple-100 text-purple-700 border border-purple-300
            dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30"
          >
            XGBoost Regression
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {[
            { path: "/", label: "Predict", end: true },
            { path: "/insights", label: "Insights" },
            { path: "/performance", label: "Performance" },
            { path: "/about", label: "About" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive
                    ? "bg-linear-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-300 dark:from-blue-500/20 dark:to-indigo-500/20 dark:text-blue-400 dark:border-blue-500/30 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10 text-xs text-slate-500">
          <p>v1.0 • ML Powered</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
