import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { LogInContext } from "@/Context/LogInContext/Login";
import { getPlaceDetails, PHOTO_URL } from "@/Service/GlobalApi";

function HotelCards({ hotel }) {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const [placeDets, setPlaceDets] = useState([]);
  const [photos, setPhotos] = useState("");
  const [Url, setUrl] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const { trip } = useContext(LogInContext);
  const city = trip?.tripData?.location;
  const hotels = trip?.tripData?.hotels;

  const getPlaceInfo = async () => {
    const data = {
      textQuery: hotel.name + city,
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


  return (
    <>
      <div className="main relative flex flex-col md:flex-row rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 bg-beige-200 border border-beige-400 m-4 overflow-hidden">
        <div className="img w-full md:w-1/3">
          <img
            src={Url || "/default-hotel.jpg"} 
            alt={`View of ${hotel.name}`} 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="content p-6 text-center md:text-left flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{hotel.name}</h2>
            <p className="text-md text-gray-700 mt-2">{hotel.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">⭐ Rating: {hotel.rating}</p>
            <p className="text-sm font-medium text-gray-800">💵 Price: {hotel.price}</p>
            <p className="text-sm font-medium text-gray-800">📍 Location: {address}</p>
          </div>
          <Link to={location} target="_blank" className="mt-4 self-center md:self-start">
            <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-900 transition-colors duration-300">
              See in Map
            </button>
          </Link>
        </div>
      </div>
    </>
  );
  
  
}  

export default HotelCards;
