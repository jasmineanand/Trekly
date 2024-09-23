import React, { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { LogInContext } from "@/Context/LogInContext/Login";
import PlaceCards from "../Cards/PlaceCards";

function Placescard() {
  const isMobile = useMediaQuery({ query: "(max-width: 445px)" });
  const isSmall = useMediaQuery({ query: "(max-width: 640px)" });

  const { trip } = useContext(LogInContext);
  const itinerary = trip?.tripData?.itinerary;
  const city = trip?.tripData?.location;


  return (
    <>
      {itinerary?.map((day, idx) => (
        <div key={idx} className="main-container mt-5 sm:mt-10 bg-white rounded-lg shadow-md hover:shadow-lg p-6 transition-shadow duration-300">
          <div className="heading text-center sm:text-left mb-4"> {/* Increased bottom margin for heading */}
            <h3 className="font-medium text-lg sm:text-2xl sm:font-bold">
              Day {day.day}
            </h3>
            <h4 className="font-bold text-base sm:text-2xl text-blue-400 mt-2"> {/* Increased margin-top for day title */}
              {day.title}
            </h4>
          </div>
          <div className="cards sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {day.places.map((place, placeIdx) => (
              <div key={placeIdx} className="place-card-container mb-6"> {/* Added container with bottom margin for each place */}
                <PlaceCards place={place} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default Placescard;
