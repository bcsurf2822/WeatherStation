


const geocodingURL = process.env.NEXT_PUBLIC_GEOCODING_URL;

const weatherURL = process.env.NEXT_PUBLIC_WEATHER_URL;

const openWeatherAPI = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export const getCityCoordinates = async (search) => {
  try {
    const response = await fetch(`${geocodingURL}`, {
      params: {
        q: `${search},US`,
        limit: 5,
        appid: openWeatherAPI,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    throw error;
  }
};

export const getWeather = async (city) => {
  try {
    const response = await weatherURL.get("/forecast", {
      params: {
        q: `${city}`,

        appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
      },
    });
    if (response.data.length === 0) throw new Error("Location not found");
    return response.data[0];
  } catch (error) {
    console.error("Location Not Found:", error);
    throw error;
  }
};
