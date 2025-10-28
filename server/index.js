import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import weatherRoutes from "./routes/weather.js";
import airRoutes from "./routes/air.js";
import alertRoutes from "./routes/alert.js";

dotenv.config();
const app = express();
app.use(cors());

// use routers
app.use("/api/weather", weatherRoutes);
app.use("/api/air", airRoutes);
app.use("/api/alert", alertRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
