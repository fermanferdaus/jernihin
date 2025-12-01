import db from "../config/db.js";

// Ambil status pembersihan
export const getCleaningStatus = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tb_status_pembersihan WHERE id = 1"
    );

    const raw = rows[0];

    // 🔥 Convert status angka → teks
    const statusText = raw.sedang_membersihkan == 1 ? "Aktif" : "Nonaktif";

    res.json({
      success: true,
      data: {
        ...raw,
        status_text: statusText,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Untuk robot / ESP32 -> mulai membersihkan
export const startCleaning = async (req, res, next) => {
  try {
    await db.query(
      `UPDATE tb_status_pembersihan 
       SET sedang_membersihkan = 1, waktu_mulai = NOW() 
       WHERE id = 1`
    );

    // Simpan ke riwayat
    await db.query(
      `INSERT INTO tb_riwayat_pembersihan (jam, tanggal, status) 
       VALUES (DATE_FORMAT(NOW(), '%H:%i'), CURDATE(), 'aktif')`
    );

    res.json({ success: true, message: "Pembersihan dimulai" });
  } catch (err) {
    next(err);
  }
};

export const stopCleaning = async (req, res, next) => {
  try {
    await db.query(
      `UPDATE tb_status_pembersihan 
       SET sedang_membersihkan = 0 
       WHERE id = 1`
    );

    // Tambahkan riwayat selesai
    await db.query(
      `INSERT INTO tb_riwayat_pembersihan (jam, tanggal, status) 
       VALUES (DATE_FORMAT(NOW(), '%H:%i'), CURDATE(), 'selesai')`
    );

    res.json({ success: true, message: "Pembersihan dihentikan" });
  } catch (err) {
    next(err);
  }
};
