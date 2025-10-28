import express from "express";
import { getWeatherData } from "../services/weatherService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getWeatherData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Weather API fetch failed" });
  }
});

export default router;
