import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import ntuRoutes from "./routes/ntu.routes.js";
import cleaningRoutes from "./routes/cleaning.routes.js";
import scheduleRoutes from "./routes/schedule.routes.js";
import manualRoutes from "./routes/manual.routes.js";
import historyRoutes from "./routes/history.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // <=== penting untuk Form-Encoded

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/ntu", ntuRoutes);
app.use("/api/cleaning", cleaningRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/manual", manualRoutes);
app.use("/api/history", historyRoutes);

// ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
