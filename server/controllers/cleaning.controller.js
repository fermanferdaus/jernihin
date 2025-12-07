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
export const updateCleaning = async (req, res, next) => {
  try {
    const { sedang_membersihkan } = req.body;

    if (sedang_membersihkan === undefined) {
      return res.status(400).json({
        success: false,
        message: "Parameter 'sedang_membersihkan' wajib dikirim",
      });
    }

    // Update status database
    await db.query(
      `UPDATE tb_status_pembersihan 
       SET sedang_membersihkan = ?, waktu_mulai = IF(? = 1, NOW(), waktu_mulai)
       WHERE id = 1`,
      [sedang_membersihkan, sedang_membersihkan, sedang_membersihkan]
    );

    // Simpan ke riwayat
    if (sedang_membersihkan == 1) {
      await db.query(
        `INSERT INTO tb_riwayat_pembersihan (jam, tanggal, status) 
         VALUES (DATE_FORMAT(NOW(), '%H:%i'), CURDATE(), '1')`
      );
    }

    res.json({
      success: true,
      message:
        sedang_membersihkan == 1
          ? "Pembersihan dimulai"
          : "Pembersihan selesai",
    });
  } catch (err) {
    next(err);
  }
};
