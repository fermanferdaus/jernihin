import { Link, useLocation } from "react-router-dom";
import { Home, Clock, List } from "lucide-react";

export default function SideBarMobile() {
  const loc = useLocation().pathname;

  const menu = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Riwayat", icon: List, path: "/riwayat" },
    { name: "Jadwal", icon: Clock, path: "/jadwal" },
  ];

  return (
    <div
      className="
        fixed left-0 right-0 bottom-4 z-50
        mx-auto w-[92%] max-w-md
        bg-gray-900/80 backdrop-blur-xl
        rounded-2xl
        border border-gray-700/40
        shadow-[0_8px_25px_rgba(0,0,0,0.5)]
        py-2 px-3
        flex justify-around
      "
    >
      {menu.map((m, i) => {
        const active = loc === m.path || loc.startsWith(m.path + "/");
        const Icon = m.icon;

        return (
          <Link
            key={i}
            to={m.path}
            className="flex flex-col items-center gap-0.5 active:scale-95 transition"
          >
            <Icon
              size={22}
              className={`
                transition
                ${
                  active
                    ? "text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.7)]"
                    : "text-gray-400"
                }
              `}
            />
            <span
              className={`
                text-[11px] transition
                ${active ? "text-blue-400 font-medium" : "text-gray-400"}
              `}
            >
              {m.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
