import axios from "axios";

const weatherClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  params: {
    appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
  }
})
const openWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"

export const getWeather = async(city) => {
  try {
    const response = await weatherClient.get("/direct", {
      params: {
        q:`${city}`,
        limit: 1,
      }
    })
    if (response.data.length === 0) throw new Error("Location not found");
    return response.data[0];
  } catch (error) {
    console.error("Location Not Found:", error);
    throw error
  }
}