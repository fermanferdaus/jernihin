import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export function useNTU() {
  const { get } = useFetch();
  const [latest, setLatest] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchLatest();
    fetchHistory();
  }, []);

  const fetchLatest = async () => {
    const res = await get("/ntu/latest"); // 🔥 PAKAI AUTH
    setLatest(res.data);
  };

  const fetchHistory = async () => {
    const res = await get("/ntu/history"); // 🔥 PAKAI AUTH
    setHistory(res.data || []);
  };

  return { latest, history, fetchLatest, fetchHistory };
}
