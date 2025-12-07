import db from "../config/db.js";

// ESP32 atau dashboard membaca status kontrol manual
export const getManualControl = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT status_manual FROM tb_kontrol_manual WHERE id = 1"
    );
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// Dashboard mengubah nilai manual_state
export const setManualControl = async (req, res, next) => {
  try {
    const { status_manual } = req.body;

    await db.query(
      `
      UPDATE tb_kontrol_manual 
      SET status_manual = ?
      WHERE id = 1
      `,
      [status_manual]
    );

    res.json({
      success: true,
      message: `Kontrol manual diubah menjadi ${status_manual}`,
    });
  } catch (err) {
    next(err);
  }
};
