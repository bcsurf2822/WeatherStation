import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (search) => {
    try {
      const response = await axios.get(`/api/weather`, {
        params: { search },
      });

      const weatherData = response.data;

      return {
        state: weatherData.state,
        city: weatherData.city,
        weather: weatherData.weather,
      };
    } catch (error) {
      console.error("Error in fetchWeatherData thunk:", error);
      throw new Error('Failed to fetch weather data');
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather.push(action.payload.weather);
        state.city.push(action.payload.city);
        state.state.push(action.payload.state);
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
