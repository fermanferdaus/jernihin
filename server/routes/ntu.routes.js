import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getLatestNTU,
  getNTUHistory,
  postNTU,
} from "../controllers/ntu.controller.js";

const router = express.Router();

// PUBLIC — ESP32 kirim data
router.post("/", postNTU);

// PUBLIC — Jika dashboard ingin melihat realtime tanpa login (opsional)
// Kalau ingin wajib login, tinggal tambah auth di sini
router.get("/latest", auth, getLatestNTU);

// PRIVATE — dashboard melihat riwayat
router.get("/history", auth, getNTUHistory);

export default router;
