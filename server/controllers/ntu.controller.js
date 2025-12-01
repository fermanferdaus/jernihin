import db from "../config/db.js";

// Ambil nilai NTU terbaru
export const getLatestNTU = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM tb_nilai_ntu ORDER BY waktu DESC LIMIT 1"
    );
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// Ambil history NTU (24 jam terakhir)
export const getNTUHistory = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        * 
      FROM tb_nilai_ntu
      WHERE DATE(waktu) = CURDATE()
      GROUP BY HOUR(waktu)
      ORDER BY waktu ASC
      `
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
};

// ESP32 mengirim data NTU
export const postNTU = async (req, res, next) => {
  try {
    const { ntu, kondisi_air } = req.body;

    if (!ntu)
      return res.status(400).json({ message: "nilai NTU wajib dikirim" });

    await db.query(
      "INSERT INTO tb_nilai_ntu (ntu, kondisi_air) VALUES (?, ?)",
      [ntu, kondisi_air || null]
    );

    res.json({ success: true, message: "Data NTU berhasil disimpan" });
  } catch (err) {
    next(err);
  }
};
