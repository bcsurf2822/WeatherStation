import { NextResponse } from 'next/server';
import axios from 'axios';

const geocodingURL = "https://api.openweathermap.org/geo/1.0/direct";
const weatherURL = "https://api.openweathermap.org/data/2.5/forecast";
const openWeatherAPI = process.env.OPENWEATHER_API_KEY;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json({ error: "Search parameter is required" }, { status: 400 });
  }

  try {
    const geocodeResponse = await axios.get(geocodingURL, {
      params: {
        q: `${search},US`,
        appid: openWeatherAPI,
      },
    });

    const geocodeData = geocodeResponse.data;

    if (geocodeData.length === 0) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { lat, lon, state, name: city } = geocodeData[0];

    const weatherResponse = await axios.get(weatherURL, {
      params: {
        lat: lat,
        lon: lon,
        units: "imperial",
        appid: openWeatherAPI,
      },
    });

    const weatherData = weatherResponse.data;

    const localForecast = [];
    for (let i = 4; i < weatherData.list.length; i += 8) {
      localForecast.push(weatherData.list[i].main);
    }

    return NextResponse.json({
      state: state,
      city: city,
      weather: localForecast,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}