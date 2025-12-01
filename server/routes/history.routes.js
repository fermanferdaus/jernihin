import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getCleaningHistory } from "../controllers/history.controller.js";

const router = express.Router();

router.get("/", auth, getCleaningHistory);

export default router;
