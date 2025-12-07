import express from "express";
import {
  getCleaningStatus,
  updateCleaning,
} from "../controllers/cleaning.controller.js";

const router = express.Router();

// PUBLIC — digunakan ESP32
router.post("/update", updateCleaning);
router.get("/status", getCleaningStatus);

export default router;
