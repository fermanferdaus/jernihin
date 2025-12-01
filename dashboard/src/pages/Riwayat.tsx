import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import TableData from "../components/TableData";
import Loader from "../components/Loader";
import { formatJam, formatTanggal } from "../utils/dateFormatter";

const API = import.meta.env.VITE_API_URL;

export default function Riwayat() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("harian");

  const [tanggal, setTanggal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bulan, setBulan] = useState(new Date().toISOString().slice(0, 7));
  const [mulai, setMulai] = useState("");
  const [akhir, setAkhir] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, [filter, tanggal, bulan, mulai, akhir]);

  const fetchHistory = async () => {
    setLoading(true);

    let url = `${API}/history?filter=${filter}`;

    if (filter === "harian") url += `&tanggal=${tanggal}`;
    if (filter === "bulanan") url += `&bulan=${bulan}`;
    if (filter === "periode") url += `&mulai=${mulai}&akhir=${akhir}`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      const formatted = (json.data || []).map((row: any) => ({
        jam: formatJam(row.waktu),
        tanggal: formatTanggal(row.waktu),
        status: row.status,
      }));

      setRows(formatted);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <MainLayout title="Riwayat Pembersihan">
      {/* CARD BESAR */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
        {/* FILTER */}
        <div className="flex flex-wrap gap-4 items-end mb-6">
          <div className="flex flex-col text-gray-300">
            <label className="mb-1">Filter</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
            >
              <option value="harian">Harian</option>
              <option value="bulanan">Bulanan</option>
              <option value="periode">Per Periode</option>
            </select>
          </div>

          {filter === "harian" && (
            <div className="flex flex-col text-gray-300">
              <label className="mb-1">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
              />
            </div>
          )}

          {filter === "bulanan" && (
            <div className="flex flex-col text-gray-300">
              <label className="mb-1">Bulan</label>
              <input
                type="month"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
              />
            </div>
          )}

          {filter === "periode" && (
            <>
              <div className="flex flex-col text-gray-300">
                <label className="mb-1">Mulai</label>
                <input
                  type="date"
                  value={mulai}
                  onChange={(e) => setMulai(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col text-gray-300">
                <label className="mb-1">Akhir</label>
                <input
                  type="date"
                  value={akhir}
                  onChange={(e) => setAkhir(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-gray-200 p-2 rounded-md"
                />
              </div>
            </>
          )}
        </div>

        {/* TABEL DI DALAM CARD */}
        <TableData
          columns={[
            { label: "Jam", key: "jam" },
            { label: "Tanggal", key: "tanggal" },
            { label: "Status", key: "status" },
          ]}
          data={rows}
        />
      </div>
    </MainLayout>
  );
}
