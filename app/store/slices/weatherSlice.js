import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const geocodingURL = process.env.NEXT_PUBLIC_GEOCODING_URL;
const weatherURL = process.env.NEXT_PUBLIC_WEATHER_URL;
const openWeatherAPI = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (search) => {
    const geocodeResponse = await axios.get(geocodingURL, {
      params: {
        q: `${search},US`,
        appid: openWeatherAPI,
      },
    });

    const geocodeData = geocodeResponse.data;
    if (geocodeData.length === 0) throw new Error("City not found");

    const { lat, lon } = geocodeData[0];
    const weatherResponse = await axios.get(weatherURL, {
      params: {
        lat: lat,
        lon: lon,
        appid: openWeatherAPI,
      },
    });

    const localWeather = weatherResponse.data;
    console.log("WeatherSliceData", localWeather);

    return {
      weather: localWeather
    };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
