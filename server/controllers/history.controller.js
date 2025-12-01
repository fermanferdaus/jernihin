// controllers/cleaning.controller.js

import db from "../config/db.js";

export const getCleaningHistory = async (req, res, next) => {
  try {
    const filter = req.query.filter || "harian";
    const today = new Date().toISOString().slice(0, 10);

    let query = "";
    let params = [];

    if (filter === "harian") {
      const tanggal = req.query.tanggal || today;
      query = `
        SELECT 
          jam, 
          tanggal, 
          CASE 
            WHEN status = 1 THEN 'Aktif'
            ELSE 'Nonaktif'
          END AS status,
          waktu
        FROM tb_riwayat_pembersihan
        WHERE tanggal = ?
        ORDER BY waktu DESC
      `;
      params = [tanggal];
    } else if (filter === "bulanan") {
      const bulan = req.query.bulan || today.slice(0, 7);

      query = `
        SELECT 
          jam, 
          tanggal, 
          CASE 
            WHEN status = 1 THEN 'Aktif'
            ELSE 'Nonaktif'
          END AS status,
          waktu
        FROM tb_riwayat_pembersihan
        WHERE tanggal LIKE ?
        ORDER BY waktu DESC
      `;
      params = [`${bulan}%`];
    } else if (filter === "periode") {
      const mulai = req.query.mulai;
      const akhir = req.query.akhir;

      query = `
        SELECT 
          jam, 
          tanggal, 
          CASE 
            WHEN status = 1 THEN 'Aktif'
            ELSE 'Nonaktif'
          END AS status,
          waktu
        FROM tb_riwayat_pembersihan
        WHERE tanggal BETWEEN ? AND ?
        ORDER BY waktu DESC
      `;
      params = [mulai, akhir];
    }

    const [rows] = await db.query(query, params);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};
