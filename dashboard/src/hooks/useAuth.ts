import { useState } from "react";
const API = import.meta.env.VITE_API_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!data.success) {
        setErrorMsg(data.message);
        return false;
      }

      localStorage.setItem("token", data.token);
      return true;
    } catch {
      setLoading(false);
      setErrorMsg("Gagal terhubung ke server");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return { login, logout, loading, errorMsg };
}
