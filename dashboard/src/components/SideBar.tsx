import { Link, useLocation } from "react-router-dom";
import { Home, Clock, List } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Riwayat", icon: <List size={20} />, path: "/riwayat" },
    { name: "Jadwal", icon: <Clock size={20} />, path: "/jadwal" },
  ];

  const loc = useLocation().pathname;

  return (
    <div className="w-64 h-screen bg-gray-950 p-5 fixed">
      <div className="flex items-center gap-3 mb-7 px-2">
        <img src="/jernihin.svg" alt="Jernihin Logo" className="w-35 h-10" />
      </div>
      <nav className="flex flex-col gap-2">
        {menu.map((m, i) => {
          const isActive = loc === m.path || loc.startsWith(m.path + "/");

          return (
            <Link
              key={i}
              to={m.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {m.icon} {m.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
