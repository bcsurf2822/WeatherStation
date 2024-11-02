import axios from "axios";

export async function fetchWeatherAPI(search) {
  const geocodingURL = "https://api.openweathermap.org/geo/1.0/direct";
  const weatherURL = "https://api.openweathermap.org/data/2.5/forecast";
  const openWeatherAPI = process.env.OPENWEATHER_API_KEY;
  console.log("API Key:", openWeatherAPI);
  try {
    const geocodeResponse = await axios.get(geocodingURL, {
      params: {
        q: `${search},us`,
        appid: openWeatherAPI,
      },
    });

    console.log("GEO RES", geocodeResponse);

    if (geocodeResponse.data.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = geocodeResponse.data[0];

    const weatherResponse = await axios.get(weatherURL, {
      params: {
        lat,
        lon,
        units: "imperial",
        appid: openWeatherAPI,
      },
    });

    return weatherResponse.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Failed to fetch weather data");
  }
}
