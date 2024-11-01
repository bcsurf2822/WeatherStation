import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useDispatch } from "react-redux";
import { setLocation, fetchWeatherData } from "../store/slices/weatherSlice";
import { useJsApiLoader } from "@react-google-maps/api";

export default function AutoComplete() {
  const googleMapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAP;
  const dispatch = useDispatch();

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: googleMapAPI,
  //   libraries: ["places"],
  // });

  const { ref } = usePlacesWidget({
    apiKey: googleMapAPI,
    onPlaceSelected: (place) => {
      if (!place || !place.address_components) {
        console.error("No data for that location");
        return;
      }

      const city = place?.address_components?.[0]?.short_name?.replace(
        /\s+/g,
        "-"
      );
      const state = place?.address_components?.[2]?.short_name;
      const data = city.toLowerCase() + "," + state.toLowerCase();

      const locationInfo = place?.formatted_address
        .replace(/,\s*|\s*USA\b|\b\d{5}(?:-\d{4})?\b/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
      dispatch(setLocation(locationInfo));
      dispatch(fetchWeatherData(data));
      if (ref.current) {
        ref.current.value = "";
      }
    },
  });

  return <input ref={ref} type="text" placeholder="Search for a city" />;
}
