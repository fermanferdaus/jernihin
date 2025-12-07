import db from "../config/db.js";

export const getSchedule = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT jam, tipe_pengulangan, hari FROM tb_jadwal_pembersihan WHERE id = 1"
    );
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

export const updateSchedule = async (req, res, next) => {
  try {
    const { jam, tipe_pengulangan, hari } = req.body;

    // Tentukan nilai hari berdasarkan tipe
    const hariValue = tipe_pengulangan === "Mingguan" ? hari : null;

    await db.query(
      `
      UPDATE tb_jadwal_pembersihan 
      SET jam = ?, tipe_pengulangan = ?, hari = ?
      WHERE id = 1
      `,
      [jam, tipe_pengulangan, hariValue]
    );

    res.json({ success: true, message: "Jadwal berhasil diperbarui" });
  } catch (err) {
    console.error("Error update schedule:", err);
    next(err);
  }
};
