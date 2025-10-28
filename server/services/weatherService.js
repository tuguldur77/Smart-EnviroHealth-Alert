import axios from "axios";

export async function getWeatherData() {
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    latitude: 37.5665,      // Seoul
    longitude: 126.9780,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code"
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data.current;

    const weather = {
      city: "Seoul",
      temperature: data.temperature_2m,
      humidity: data.relative_humidity_2m,
      feelsLike: data.apparent_temperature,
      weatherCode: data.weather_code,
    };

    console.log("✅ Open-Meteo Weather Data:", weather);
    return weather;
  } catch (error) {
    console.error("❌ Open-Meteo API Error:", error.message);
    return { error: "Weather API fetch failed" };
  }
}
