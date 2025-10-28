import express from "express";
import { getAirData } from "../services/airService.js";

const router = express.Router();

// District coordinates (approximate centers)
const districtCoords = {
  "강북구": { lat: 37.6396, lon: 127.0257 },
  "금천구": { lat: 37.4569, lon: 126.8957 },
  "은평구": { lat: 37.6176, lon: 126.9227 },
  "광진구": { lat: 37.5384, lon: 127.0822 },
  "중구": { lat: 37.5636, lon: 126.9978 },
  "강남구": { lat: 37.5173, lon: 127.0473 },
  "송파구": { lat: 37.5117, lon: 127.1065 },
  "서초구": { lat: 37.4836, lon: 127.0326 }
};

// Calculate nearest district
function getNearestDistrict(lat, lon) {
  let nearest = null;
  let minDist = Infinity;
  for (const [name, coord] of Object.entries(districtCoords)) {
    const d = Math.sqrt((lat - coord.lat) ** 2 + (lon - coord.lon) ** 2);
    if (d < minDist) {
      minDist = d;
      nearest = name;
    }
  }
  return nearest;
}

router.get("/", async (req, res) => {
  try {
    const airData = await getAirData();
    const { lat, lon } = req.query;

    if (lat && lon) {
      const nearest = getNearestDistrict(Number(lat), Number(lon));
      const districtData = airData.airData.find((d) => d.district === nearest);

      if (!districtData)
        return res.json({ city: "서울시", district: nearest, msg: "No data for district" });

      return res.json({
        city: "서울시",
        district: nearest,
        ...districtData
      });
    }

    // fallback (no GPS)
    res.json({
      city: airData.city,
      pm10: airData.pm10,
      pm25: airData.pm25,
      grade: airData.grade
    });
  } catch (err) {
    console.error("❌ Air route error:", err.message);
    res.status(500).json({ error: "Air data fetch failed" });
  }
});

export default router;
