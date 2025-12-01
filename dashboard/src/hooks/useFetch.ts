const API = import.meta.env.VITE_API_URL;

export function useFetch() {
  const token = localStorage.getItem("token") || "";

  const get = async (endpoint: string) => {
    const res = await fetch(`${API}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  };

  const post = async (endpoint: string, body: any = {}) => {
    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  return { get, post };
}
