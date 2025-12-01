import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import Loader from "../components/Loader";
import TimePicker from "../components/TimePicker";

const API = import.meta.env.VITE_API_URL;

export default function EditJadwal() {
  const [jam, setJam] = useState("00:00");
  const [tipe, setTipe] = useState("harian");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${API}/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.data) {
        setJam(data.data.jam); // format "HH:MM"
        setTipe(data.data.tipe_pengulangan);
      }
    } catch (err) {
      console.error("Error fetching schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API}/schedule`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jam, tipe_pengulangan: tipe }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/jadwal?toast=sukses";
      } else {
        window.location.href = "/jadwal?toast=gagal";
      }
    } catch (err) {
      console.error("Error saving schedule:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <MainLayout title="Edit Jadwal Pembersihan">
      <div className="w-full bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-md">
        <form onSubmit={saveSchedule} className="space-y-6">
          {/* JAM */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Jam Pembersihan</label>
            <TimePicker value={jam} onChange={(v) => setJam(v)} />
          </div>

          {/* TIPE */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Tipe Pengulangan</label>

            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="
                bg-gray-800 text-gray-200 p-2 rounded-md 
                border border-gray-700 focus:border-blue-500
              "
            >
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Bulanan">Bulanan</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => (window.location.href = "/jadwal")}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`
                px-4 py-2 text-white rounded-md
                ${saving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-500"}
              `}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
