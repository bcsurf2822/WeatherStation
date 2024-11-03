import { NextResponse } from "next/server";
import axios from "axios";

const weatherURL = "https://api.openweathermap.org/data/2.5/forecast";
const openWeatherAPI = process.env.OPENWEATHER_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude required" },
      { status: 400 }
    );
  }

  try {
    const weatherResponse = await axios.get(weatherURL, {
      params: {
        lat,
        lon,
        units: "imperial",
        appid: openWeatherAPI,
      },
    });

    const weatherData = weatherResponse.data;

    const localForecast = [];
    for (let i = 4; i < weatherData.list.length; i += 8) {
      const forecastData = weatherData.list[i].main;

      const roundedForecast = {
        temp: Math.round(forecastData.temp),
        pressure: Math.round(forecastData.pressure),
        humidity: Math.round(forecastData.humidity),
      };

      localForecast.push(roundedForecast);
    }

    return NextResponse.json({ weather: localForecast }, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
