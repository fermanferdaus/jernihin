interface Props {
  isCleaning: string;
}

export default function CleaningStatus({ isCleaning }: Props) {
  const aktif = isCleaning === "Aktif";

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-lg">
      <p className="text-sm text-gray-400">Status Pembersihan</p>

      <h2
        className={`mt-1 text-xl font-bold ${
          aktif ? "text-green-400" : "text-red-400"
        }`}
      >
        {aktif ? "Aktif" : "Tidak Aktif"}
      </h2>
    </div>
  );
}
