import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getManualControl,
  setManualControl,
} from "../controllers/manual.controller.js";

const router = express.Router();

// PUBLIC — ESP32 membaca status manual
router.get("/", getManualControl);

// PRIVATE — dashboard mengubah nilai manual_state
router.post("/", auth, setManualControl);

export default router;
