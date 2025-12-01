import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "username dan password wajib diisi" });

    // cek user
    const [rows] = await db.query(
      "SELECT * FROM tb_pengguna WHERE BINARY username = ?",
      [username]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const user = rows[0];

    // cek password
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Password salah" });

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
