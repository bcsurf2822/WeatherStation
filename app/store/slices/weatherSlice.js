import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ lat, lon }) => {
    try {
      const response = await axios.get(`/api/weather`, {
        params: { lat, lon },
      });

      const weatherData = response.data;
      console.log(weatherData);

      return {
        weather: weatherData.weather,
      };
    } catch (error) {
      console.error("Error in fetchWeatherData:", error);
      throw new Error("Failed to fetch weather data");
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    state: [],
    city: [],
    weather: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city.push(action.payload);
    },
    setState: (state, action) => {
      state.state.push(action.payload);
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

export const { setState, setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
