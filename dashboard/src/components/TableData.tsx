import { useState, useEffect } from "react";

interface Column {
  label: string;
  key: string;
}

interface Props {
  columns: Column[];
  data: any[];
  searchTerm?: string;
  itemsPerPageOptions?: number[];
}

export default function TableData({
  columns = [],
  data = [],
  searchTerm = "",
  itemsPerPageOptions = [5, 10, 50, 100, 200, 500],
}: Props) {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 🔍 Filter
  useEffect(() => {
    if (!searchTerm) setFilteredData(data);
    else {
      const lower = searchTerm.toLowerCase();
      const filtered = data.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes(lower)
        )
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginated = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="w-full">
      {/* === Header Controls === */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-300 order-2 sm:order-1">
          <label>Tampilkan</label>
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            className="border border-gray-600 rounded-md px-2 py-1 bg-gray-800 text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
          >
            {itemsPerPageOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>Entri</span>
        </div>
      </div>

      {/* === Table === */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 border-collapse">
          <thead className="bg-gray-800 text-gray-200 border-b border-gray-700">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-3 text-left select-none">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, i) => (
                <tr
                  key={i}
                  className={`${
                    i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition-colors`}
                >
                  {columns.map((col, j) => (
                    <td key={j} className="px-4 py-3 border-t border-gray-700">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400 italic"
                >
                  Tidak ada data untuk ditampilkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Pagination === */}
      {filteredData.length > perPage && (
        <div className="flex justify-end items-center gap-2 mt-4 text-sm text-gray-300">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? "text-gray-500 border-gray-700 cursor-not-allowed"
                : "text-blue-400 border-gray-600 hover:bg-gray-700"
            }`}
          >
            First
          </button>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1
                ? "text-gray-500 border-gray-700 cursor-not-allowed"
                : "text-blue-400 border-gray-600 hover:bg-gray-700"
            }`}
          >
            Prev
          </button>

          <span className="px-3 py-1 bg-blue-600 text-white rounded-md">
            {currentPage}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-500 border-gray-700 cursor-not-allowed"
                : "text-blue-400 border-gray-600 hover:bg-gray-700"
            }`}
          >
            Next
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-500 border-gray-700 cursor-not-allowed"
                : "text-blue-400 border-gray-600 hover:bg-gray-700"
            }`}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
