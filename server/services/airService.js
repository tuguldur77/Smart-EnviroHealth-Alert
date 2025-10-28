import axios from "axios";
import xml2js from "xml2js";

const parser = new xml2js.Parser({ explicitArray: false });

export async function getAirData() {
  try {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, ""); // e.g., 20251028
    const url = `http://openapi.seoul.go.kr:8088/sample/xml/TimeAverageAirQuality/1/5/${dateStr}/%20/`;

    const response = await axios.get(url);
    const result = await parser.parseStringPromise(response.data);

    const rows = result?.TimeAverageAirQuality?.row;

    if (!rows) {
      console.error("⚠️ No 'row' data found in API response:", result);
      return { city: "서울시", airData: [] };
    }

    const data = Array.isArray(rows)
      ? rows.map((item) => ({
          district: item.MSRSTE_NM,
          pm10: Number(item.PM10),
          pm25: Number(item.PM25),
          ozone: Number(item.O3),
          co: Number(item.CO),
          no2: Number(item.NO2),
          so2: Number(item.SO2),
          time: item.MSRDT,
        }))
      : [
          {
            district: rows.MSRSTE_NM,
            pm10: Number(rows.PM10),
            pm25: Number(rows.PM25),
            ozone: Number(rows.O3),
            co: Number(rows.CO),
            no2: Number(rows.NO2),
            so2: Number(rows.SO2),
            time: rows.MSRDT,
          },
        ];

    const avgPm10 = data.reduce((sum, d) => sum + d.pm10, 0) / data.length;
    const avgPm25 = data.reduce((sum, d) => sum + d.pm25, 0) / data.length;

    let grade = "좋음";
    if (avgPm10 > 80 || avgPm25 > 35) grade = "나쁨";
    else if (avgPm10 > 30 || avgPm25 > 15) grade = "보통";

    return {
      city: "서울시",
      count: data.length,
      updated: data[0]?.time || "",
      pm10: Math.round(avgPm10),
      pm25: Math.round(avgPm25),
      grade,
      airData: data,
    };
  } catch (err) {
    console.error("❌ Seoul API Error:", err.message);
    return { city: "서울시", error: "API fetch failed" };
  }
}
