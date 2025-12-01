import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface NTUPoint {
  waktu: string;
  ntu: number;
}

interface Props {
  data: NTUPoint[];
}

export default function ChartNTU({ data }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg w-full">
      <h3 className="text-white font-semibold mb-4">Grafik NTU (Hari Ini)</h3>

      {/* Container tinggi stabil */}
      <div className="w-full" style={{ height: "280px" }}>
        <Line
          data={{
            labels: data.map((d) => d.waktu),
            datasets: [
              {
                label: "NTU",
                data: data.map((d) => d.ntu),
                borderColor: "rgb(59,130,246)",
                backgroundColor: "rgba(59,130,246,0.3)",
                tension: 0.35,
                pointRadius: 2,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                labels: { color: "white" },
              },
            },
            scales: {
              x: {
                ticks: { color: "white" },
                grid: {
                  color: "rgba(255,255,255,0.15)", // ⭐ garis x lebih terang
                  lineWidth: 1,
                },
                border: {
                  color: "rgba(255,255,255,0.35)", // ⭐ border x jelas
                },
              },
              y: {
                ticks: { color: "white" },
                grid: {
                  color: "rgba(255,255,255,0.15)", // ⭐ garis y lebih terang
                  lineWidth: 1,
                },
                border: {
                  color: "rgba(255,255,255,0.35)", // ⭐ border y jelas
                },
                beginAtZero: true,
                suggestedMax:
                  Math.max(...data.map((d) => d.ntu)) < 5
                    ? 5
                    : Math.max(...data.map((d) => d.ntu)) + 2,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
