import { LogInContext } from "@/Context/LogInContext/Login";
import { getCityDetails, PHOTO_URL } from "@/Service/GlobalApi";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Locationinfo() {
  const { trip } = useContext(LogInContext);
  const [cityDets, setCityDets] = useState([]);
  const [photos, setPhotos] = useState('');
  const [Url, setUrl] = useState('');

  const city = trip?.tripData?.location;

  

  const getCityInfo = async () => {
    const data = {
      textQuery: city
    }
    const result = await getCityDetails(data).then((res) => {
      setCityDets(res.data.places[0]);
      setPhotos(res.data.places[0].photos[0].name);
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    trip && getCityInfo();
  }, [trip]);

  useEffect(() => {
    const url = PHOTO_URL.replace('{replace}', photos);
    setUrl(url);
  }, [photos]);

  
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105">
      <Link to={cityDets.googleMapsUri} className="block overflow-hidden">
        <img
          src={Url || '/images/main_img_placeholder.jpg'}
          className="object-cover w-full max-h-[300px] transition duration-300 ease-in-out hover:scale-110"
          alt="City view"
        />
      </Link>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Travel Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
            <span className="text-purple-600">📍</span>
            <span className="font-medium text-gray-800">{trip?.userSelection?.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
            <span className="text-green-500">💵</span>
            <span className="font-medium text-gray-800">{trip?.userSelection?.Budget}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
            <span className="text-yellow-500">🤝</span>
            <span className="font-medium text-gray-800">{trip?.userSelection?.People}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-full">
            <span className="text-blue-500">📆</span>
            <span className="font-medium text-gray-800">{trip?.userSelection?.noOfDays} Day</span>
          </div>
        </div>
      </div>
    </div>
  );
}  
export default Locationinfo;
