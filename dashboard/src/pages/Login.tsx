import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message);
        return;
      }

      // Simpan ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("nama", data.user.nama);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);

      navigate("/dashboard");
    } catch {
      setErrorMsg("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleLogin}
        className="
          bg-gray-900 p-8 rounded-xl w-full max-w-sm
          border border-gray-800 shadow-lg
        "
      >
        {/* ==== LOGO ==== */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/jernihin1.svg"
            className="w-18 h-18 mb-5"
            alt="Jernihin Logo"
          />
          <h2 className="text-white text-xl font-bold tracking-wide">
            JERNIHIN
          </h2>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Username */}
        <label className="text-gray-300 text-sm">Username</label>
        <input
          className="w-full p-2 mt-1 mb-4 bg-gray-800 text-gray-200 rounded-md border border-gray-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <label className="text-gray-300 text-sm">Password</label>
        <input
          type="password"
          className="w-full p-2 mt-1 mb-4 bg-gray-800 text-gray-200 rounded-md border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
