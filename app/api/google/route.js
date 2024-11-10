import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input");

  const googleAPI = process.env.GOOGLE_API;

  if (!googleAPI) {
    return NextResponse.json({ error: "Key Not Found" }, { status: 500 });
  }

  try {
    const autocompleteURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const autocompleteResponse = await axios.get(autocompleteURL, {
      params: {
        input,
        types: "(cities)",
        key: googleAPI,
      },
    });

    if (autocompleteResponse.data.status !== "OK") {
      return NextResponse.json(
        { error: "Failed to get suggestions" },
        { status: 500 }
      );
    }

    const predictions = autocompleteResponse.data.predictions.slice(0, 5);

    const placeDetailsURL = `https://maps.googleapis.com/maps/api/place/details/json`;
    const placeDetailsPromises = predictions.map(async (prediction) => {
      const placeId = prediction.place_id;

      const placeDetailsResponse = await axios.get(placeDetailsURL, {
        params: {
          place_id: placeId,
          fields: "name,geometry,address_component",
          key: googleAPI,
        },
      });

      if (placeDetailsResponse.data.status !== "OK") {
        return null;
      }

      const placeDetails = placeDetailsResponse.data.result;

      const addressComponents = placeDetails.address_components;
      const stateComponent = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      return {
        city: placeDetails.name,
        state: stateComponent ? stateComponent.long_name : "N/A",
        lat: placeDetails.geometry.location.lat,
        lon: placeDetails.geometry.location.lng,
      };
    });

    const placeDetailsArray = await Promise.all(placeDetailsPromises);

    const validPlaceDetails = placeDetailsArray.filter(
      (place) => place !== null
    );

    return NextResponse.json(validPlaceDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching place details:", error.message);
    return NextResponse.json(
      { error: "Error fetching suggestions" },
      { status: 500 }
    );
  }
}
