import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const geocodingURL = process.env.NEXT_PUBLIC_GEOCODING_URL;
const weatherURL = process.env.NEXT_PUBLIC_WEATHER_URL;
const openWeatherAPI = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (search) => {
    try {
      // Log to check if the API key and URLs are correctly retrieved
      console.log("Geocoding URL:", geocodingURL);
      console.log("Weather URL:", weatherURL);
      console.log("OpenWeather API Key:", openWeatherAPI);
      console.log("Search Query:", search);

      // Geocoding request
      const geocodeResponse = await axios.get(geocodingURL, {
        params: {
          q: `${search},US`,
          appid: openWeatherAPI,
        },
      });

      // Log the geocoding response
      console.log("Geocode Response:", geocodeResponse.data);

      const geocodeData = geocodeResponse.data;
      if (geocodeData.length === 0) {
        console.log("CITY NOT FOUND")
        throw new Error("City not found");

      }
      console.log("GEO DATA", geocodeData)

      const { lat, lon } = geocodeData[0];
      console.log(lat)
      console.log(lon)
      // Weather request
      const weatherResponse = await axios.get(weatherURL, {
        params: {
          lat: lat,
          lon: lon,
          units: "imperial",
          appid: openWeatherAPI,
        },
      });

      // Log the weather response
      console.log("Weather Response:", weatherResponse.data);

      const weatherData = weatherResponse.data;

      // Create a local forecast based on the returned data
      const localForecast = [];
      for (let i = 4; i < weatherData.list.length; i += 8) {
        localForecast.push(weatherData.list[i].main);
      }

      // Log the final local forecast data
      console.log("Local Forecast Data:", localForecast);

      return {
        weather: localForecast,
      };
    } catch (error) {
      console.error("Error in fetchWeatherData:", error);
      throw error;
    }
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
