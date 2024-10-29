import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const geocodingURL = process.env.NEXT_PUBLIC_GEOCODING_URL;
const weatherURL = process.env.NEXT_PUBLIC_WEATHER_URL;
const openWeatherAPI = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeather",
  async (search) => {
    console.log("FETCH CALLED")
    const response = await axios.get(geocodingURL, {
      params: {
        q: `${search},US`,
        appid: openWeatherAPI,
      },
    });
    const data = response.data;
    console.log("Slice Data", data);
    if (data.length === 0) throw new Error("City not found");
    const { lat, lon } = data[0];
    return { lat, lon };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    cities: [],
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
