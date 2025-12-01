import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import CardStat from "../components/CardStat";
import CleaningStatus from "../components/CleaningStatus";
import ChartNTU from "../components/ChartNTU";
import Loader from "../components/Loader";
import { formatJamChart } from "../utils/dateFormatter";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [latest, setLatest] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);

  const token = localStorage.getItem("token");

  // FIRST LOAD
  useEffect(() => {
    (async () => {
      try {
        await fetchLatest();
        await fetchStatus();
        await fetchChart();
      } finally {
        setLoading(false);
        setChartLoading(false);
      }
    })();
  }, []);

  // REALTIME: NTU & Status (1 detik)
  useEffect(() => {
    const int = setInterval(() => {
      fetchLatest();
      fetchStatus();
    }, 1000);
    return () => clearInterval(int);
  }, []);

  // REALTIME: Grafik tiap 1 menit
  useEffect(() => {
    const int = setInterval(() => refreshChart(), 60000);
    return () => clearInterval(int);
  }, []);

  const refreshChart = async () => {
    setChartLoading(true);
    try {
      await fetchChart();
    } finally {
      setChartLoading(false);
    }
  };

  //Fetch NTU Latest
  const fetchLatest = async () => {
    try {
      const res = await fetch(`${API}/ntu/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setLatest(json.data || null);
    } catch {
      console.warn("Latest gagal");
    }
  };

  //Fetch Cleaning Status
  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API}/cleaning/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setStatus(json.data || null);
    } catch {
      console.warn("Status gagal");
    }
  };

  //Fetch Chart Data
  const fetchChart = async () => {
    try {
      const res = await fetch(`${API}/ntu/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();

      if (!json.data) return;

      setChartData(
        json.data.map((d: any) => ({
          waktu: formatJamChart(d.waktu),
          ntu: d.ntu,
        }))
      );
    } catch {
      console.warn("Chart gagal");
    }
  };

  //FULL PAGE LOADING
  if (loading) return <Loader />;

  return (
    <MainLayout title="Dashboard">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CardStat title="Kekeruhan (NTU)" value={latest?.ntu ?? 0} />
        <CardStat title="Kondisi Air" value={latest?.kondisi_air ?? "-"} />
        <CleaningStatus isCleaning={status?.status_text} />
      </div>

      {/* Chart */}
      {chartLoading ? (
        <div className="py-10">
          <Loader />
        </div>
      ) : (
        <ChartNTU data={chartData} />
      )}
    </MainLayout>
  );
}
