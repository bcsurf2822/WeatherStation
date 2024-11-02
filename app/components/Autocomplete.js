import React from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { useDispatch } from "react-redux";
import {  fetchWeatherData } from "../store/slices/weatherSlice";
import { getServerSideProps } from "../api/serverAPI";



export default function AutoComplete() {
  const key = getServerSideProps();
  console.log("Key", key)
  const googleMapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAP;
  const dispatch = useDispatch();

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

      dispatch(fetchWeatherData(data));
      if (ref.current) {
        ref.current.value = "";
      }
    },
    options: {
      componentRestrictions: { country: "us" },
    },
  });

  return <input ref={ref} type="text" placeholder="City.." />;
}
