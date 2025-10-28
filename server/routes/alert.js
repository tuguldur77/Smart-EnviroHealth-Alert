import express from "express";
import { getAlertMessage } from "../services/alertService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query; //  Get user's location from query params
    console.log("📍 Received coordinates:", lat, lon); // For debugging

    const data = await getAlertMessage(lat, lon); //  Pass to alert service
    res.json(data);
  } catch (err) {
    console.error("❌ Alert API Error:", err);
    res.status(500).json({ error: "Alert generation failed" });
  }
});

export default router;
