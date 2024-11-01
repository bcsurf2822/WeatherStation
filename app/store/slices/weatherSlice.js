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
        units: "imperial",
        appid: openWeatherAPI,
      },
    });

    const weatherData = weatherResponse.data;

    const localForecast = [];
    for (let i = 4; i < weatherData.list.length; i += 8) {
      localForecast.push(weatherData.list[i].main);
    }

    return {
      weather: localForecast,
    };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    location: [],
    weather: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather.push(action.payload.weather);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
