import axios from "axios";

const weatherClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})
const openWeatherUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"
//FREE ONE
//api.openweathermap.org/data/2.5/forecast?zip={zip code},{country code}&appid={API key}
//this is working
//https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={}

export const getWeather = async(city) => {
  try {
    const response = await weatherClient.get("/forecast", {
      params: {
        q:`${city}`,

        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      }
    })
    if (response.data.length === 0) throw new Error("Location not found");
    return response.data[0];
  } catch (error) {
    console.error("Location Not Found:", error);
    throw error
  }
}