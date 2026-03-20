import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500"
    >
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
