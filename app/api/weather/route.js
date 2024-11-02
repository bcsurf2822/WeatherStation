import { NextResponse } from 'next/server';

export async function GET(request) {
  // Get the OpenWeather API key from environment variables
  const openWeatherAPI = process.env.OPENWEATHER_API_KEY;

  // Check if the key is accessible
  if (!openWeatherAPI) {
    return NextResponse.json({ error: "API key is not accessible" }, { status: 500 });
  }

  // Return the API key just for testing purposes
  return NextResponse.json({ message: "API key is accessible", apiKey: openWeatherAPI }, { status: 200 });
}