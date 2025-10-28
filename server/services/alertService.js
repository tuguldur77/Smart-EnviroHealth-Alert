import axios from "axios";

export async function getAlertMessage(lat = null, lon = null) {
  try {
    // Build URL with or without location
    let airUrl = "http://localhost:5000/api/air";
    if (lat && lon) airUrl += `?lat=${lat}&lon=${lon}`;

    // Fetch air and weather data in parallel
    const [weatherRes, airRes] = await Promise.all([
      axios.get("http://localhost:5000/api/weather"),
      axios.get(airUrl),
    ]);

    const weather = weatherRes.data;
    const air = airRes.data;

    const temp = weather.temperature;
    const pm10 = air.pm10;
    const grade = air.grade;
    const district = air.district || "서울시";

    // Generate intelligent message
    let alert = `${district}의 오늘은 쾌적한 날씨입니다 😊`;

    if (grade === "나쁨" || pm10 > 50) {
      alert = `${district}의 미세먼지 ‘나쁨’ 단계입니다. 외출 시 마스크 착용을 권장합니다 😷`;
    } else if (temp > 30) {
      alert = `${district}은 폭염 주의! 충분한 수분 섭취를 하세요 ☀️`;
    } else if (temp < 0) {
      alert = `${district}은 한파 주의! 따뜻하게 입으세요 🧣`;
    }

    return {
      city: "서울시",
      district,
      temperature: temp,
      pm10,
      grade,
      alert,
    };
  } catch (error) {
    console.error("❌ Alert generation failed:", error.message);
    return { error: "AlertService Error" };
  }
}
