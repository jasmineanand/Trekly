import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const configPlace = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyDjpRd3KwngJDa_MQy6cgdJti0Lu3mGaKI",
    "X-Goog-FieldMask": [
      "places.id",
      "places.name",
      "places.displayName",
      "places.formattedAddress",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
      "places.priceLevel",
      "places.rating",
    ],
  },
};
const configCity = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key":"AIzaSyDjpRd3KwngJDa_MQy6cgdJti0Lu3mGaKI",
    "X-Goog-FieldMask": [
      "places.name",
      "places.displayName",
      "places.photos",
      "places.googleMapsUri",
      "places.location",
    ],
  },
};

export const PHOTO_URL =
  "https://places.googleapis.com/v1/{replace}/media?maxHeightPx=1000&key=" +
  "AIzaSyDjpRd3KwngJDa_MQy6cgdJti0Lu3mGaKI";

export const getPlaceDetails = (data) =>
  axios.post(BASE_URL, data, configPlace);
export const getCityDetails = (data) => axios.post(BASE_URL, data, configCity);
