import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    builder.addCase(fetchWeather.pending, (state) => {
      state.status = "loading";
    });
  },
});
