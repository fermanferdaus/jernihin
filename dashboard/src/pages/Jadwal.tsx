import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../components/MainLayout";
import Loader from "../components/Loader";
import ManualToggle from "../components/ManualToggle";

const API = import.meta.env.VITE_API_URL;

export default function Jadwal() {
  const [schedule, setSchedule] = useState<any>(null);
  const [manual, setManual] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //TOAST DARI QUERY PARAM
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("toast");

    if (msg === "sukses") {
      toast.success("Jadwal berhasil diperbarui!", {
        duration: 4000,
        className: "custom-toast",
        icon: null,
      });
    } else if (msg === "gagal") {
      toast.error("Gagal memperbarui jadwal!", {
        duration: 4000,
        className: "custom-toast",
        icon: null,
      });
    }

    if (msg) {
      window.history.replaceState({}, "", "/jadwal");
    }
  }, []);

  //FETCH DATA AWAL
  useEffect(() => {
    (async () => {
      await Promise.all([fetchSchedule(), fetchManual()]);
      setLoading(false);
    })();
  }, []);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${API}/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setSchedule(data.data || null);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  const fetchManual = async () => {
    try {
      const res = await fetch(`${API}/manual`);
      const data = await res.json();
      setManual(data.data.status_manual);
    } catch (err) {
      console.error("Error fetching manual:", err);
    }
  };

  //UPDATE MODE MANUAL
  const updateManual = async () => {
    try {
      await fetch(`${API}/manual`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status_manual: manual === 1 ? 0 : 1,
        }),
      });

      await fetchManual();

      toast.success("Mode manual berhasil diubah!", {
        duration: 4000,
        className: "custom-toast",
        icon: null,
      });
    } catch (err) {
      console.error("Error updating manual:", err);

      toast.error("Gagal mengubah mode manual!", {
        duration: 4000,
        className: "custom-toast",
        icon: null,
      });
    }
  };

  // LOADING SCREEN
  if (loading) return <Loader />;

  // RENDER UI
  return (
    <MainLayout title="Pengaturan Jadwal">
      <div className="space-y-6">
        {/* JADWAL SAAT INI */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Jadwal Saat Ini
            </h3>

            <button
              onClick={() => navigate("/jadwal/edit")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white text-sm"
            >
              Edit Jadwal
            </button>
          </div>

          <div className="mt-4 text-gray-300 space-y-1">
            <p>
              <span className="text-gray-400">Jam:</span>{" "}
              <span className="font-medium">{schedule?.jam}</span>
            </p>

            <p>
              <span className="text-gray-400">Pengulangan:</span>{" "}
              <span className="font-medium">{schedule?.tipe_pengulangan}</span>
            </p>

            {/* TAMPILKAN HARI JIKA MINGGUAN */}
            {schedule?.tipe_pengulangan === "Mingguan" && (
              <p>
                <span className="text-gray-400">Hari:</span>{" "}
                <span className="font-medium">{schedule?.hari || "-"}</span>
              </p>
            )}
          </div>
        </div>

        {/*MODE MANUAL */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-5 shadow-md space-y-4">
          <h3 className="text-lg md:text-lg text-white font-semibold mb-2 md:mb-3">
            Kontrol Pembersihan Manual
          </h3>

          {/* TOGGLE — diperbesar di mobile */}
          <div className="scale-110 md:scale-100 origin-left">
            <ManualToggle active={manual === 1} onToggle={updateManual} />
          </div>

          <p className="text-gray-400 text-sm mt-2 md:mt-3 leading-relaxed">
            Mode manual memungkinkan sistem membersihkan filter kapan saja.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
