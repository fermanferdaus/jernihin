import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getSchedule,
  updateSchedule,
} from "../controllers/schedule.controller.js";

const router = express.Router();

router.get("/", getSchedule);
router.put("/", auth, updateSchedule);

export default router;