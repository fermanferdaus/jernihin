// ================================
// Format tanggal: 12 Oktober 2025
// ================================
export function formatTanggal(tanggalISO?: string): string {
  if (!tanggalISO) return "-";

  const date = new Date(tanggalISO);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("id-ID", options);
}

// ====================================
// Format jam: 02.02 WIB
// ====================================
export function formatJam(tanggalISO?: string): string {
  if (!tanggalISO) return "-";

  const date = new Date(tanggalISO);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Ubah 02:02 → 02.02
  const jam = date.toLocaleTimeString("id-ID", options).replace(":", ".");
  return `${jam} WIB`;
}

// ====================================
// Format periode: Oktober 2025
// Input: "2025-10"
// ====================================
export function formatPeriode(periode?: string): string {
  if (!periode) return "-";

  const [year, month] = periode.split("-");

  const bulanNama = new Date(`${year}-${month}-01`).toLocaleString("id-ID", {
    month: "long",
  });

  return `${bulanNama} ${year}`;
}

// ====================================
// Format tanggal + jam
// Output: 12 Oktober 2025, 02.02 WIB
// ====================================
export function formatTanggalJam(tanggalISO?: string): string {
  if (!tanggalISO) return "-";

  return `${formatTanggal(tanggalISO)}, ${formatJam(tanggalISO)}`;
}

export function formatJamChart(dateISO: string) {
  const date = new Date(dateISO);

  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  });
}
