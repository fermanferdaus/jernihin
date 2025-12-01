import { useState, useRef, useEffect } from "react";

interface Props {
  title: string;
}

export default function Navbar({ title }: Props) {
  const [openMenu, setOpenMenu] = useState(false);

  const user = {
    nama: localStorage.getItem("nama") || "User",
    username: localStorage.getItem("username") || "username",
  };

  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="w-full px-4 md:px-6 pt-4 md:pt-6">
      <div
        className="
          w-full rounded-2xl px-4 md:px-6 py-4
          bg-gray-900/70 backdrop-blur-xl
          border border-gray-700/40 shadow-xl
          flex justify-between items-center gap-3
        "
      >
        {/* TITLE */}
        <h2 className="text-lg md:text-xl text-white font-semibold tracking-wide truncate">
          {title}
        </h2>

        {/* PROFILE */}
        <div className="relative min-w-fit" ref={menuRef}>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="
              flex items-center gap-3 px-3 py-1.5 
              rounded-xl hover:bg-gray-800/60 transition
            "
          >
            <span className="text-gray-200 font-medium truncate max-w-[120px] md:max-w-[160px]">
              Hi, {user.nama}
            </span>

            <img
              src="/Logo.png"
              className="w-10 h-10 rounded-full border border-gray-600 shadow-md object-cover"
              alt="logo"
            />
          </button>

          {/* DROPDOWN */}
          {openMenu && (
            <div
              className="
                absolute right-0 mt-3 w-60
                bg-gray-900/90 backdrop-blur-xl
                border border-gray-700 rounded-xl shadow-xl
                p-4 z-20
                animate-dropdown
              "
            >
              <div className="space-y-1 mb-3">
                <p className="text-xs text-gray-400">Nama</p>
                <p className="text-white font-semibold">{user.nama}</p>
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-400">Username</p>
                <p className="text-white font-semibold">{user.username}</p>
              </div>

              <div className="w-full h-px bg-gray-700 my-2"></div>

              <button
                onClick={logout}
                className="
                  w-full py-2 bg-red-600 hover:bg-red-500 
                  text-white rounded-lg text-sm transition active:scale-95
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
