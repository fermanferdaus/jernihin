import express from "express";
import {
  getCleaningStatus,
  startCleaning,
  stopCleaning,
} from "../controllers/cleaning.controller.js";

const router = express.Router();

// PUBLIC — digunakan ESP32
router.get("/status", getCleaningStatus);
router.post("/start", startCleaning);
router.post("/stop", stopCleaning);

export default router;
