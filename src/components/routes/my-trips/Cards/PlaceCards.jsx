import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";

function PlaceCards({ place }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const itinerary = trip?.tripData?.itinerary;
  const city = trip?.tripData?.location;

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const getPlaceInfo = async () => {
    const data = {
      textQuery: place.name + city,
    };
    const result = await getPlaceDetails(data)
      .then((res) => {
        setPlaceDets(res.data.places[0]);
        setPhotos(res.data.places[0].photos[0].name);
        setAddress(res.data.places[0].formattedAddress);
        setLocation(res.data.places[0].googleMapsUri);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    trip && getPlaceInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace("{replace}", photos);
    setUrl(url);
  }, [photos]);



  return(
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <Link to={location} className="block overflow-hidden">
        <img
          src={Url}
          alt={`View of ${place.name}`}
          className="object-cover w-full max-h-300 transition duration-300 ease-in-out hover:scale-110"
        />
      </Link>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{place.name}</h2>
        <p className="text-md text-gray-600 mt-2 mb-6">{place.details}</p> 
        <div className="flex flex-wrap gap-4 mb-8 justify-start"> 
          <div className="info flex items-center gap-2 bg-gray-100 p-3 rounded-lg">
            <span className="text-blue-500">🕒</span>
            <span className="font-medium text-gray-800">{place.timings}</span>
          </div>
          <div className="info flex items-center gap-2 bg-gray-100 p-3 rounded-lg">            <span className="text-green-500">💵</span>
            <span className="font-medium text-gray-800">{place.pricing}</span>
          </div>
        </div>
        <Link to={location} target="_blank" className="mt-8"> 
          <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
            See in Map
          </button>
        </Link>
      </div>
    </div>
  );

}

export default PlaceCards;
