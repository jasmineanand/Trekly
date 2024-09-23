import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { LogInContext } from "@/Context/LogInContext/Login";

function Hero() {
  const { isAuthenticated } = useContext(LogInContext);
  return (
    <div className="flex items-center flex-col text-center justify-center min-h-screen w-full bg-[#FAF9F6] py-20">
      <div className="text px-4 md:px-8 lg:px-16 max-w-4xl mx-auto flex flex-col items-center justify-center gap-8">
        <div className="heading space-y-6">
          <h1 className="font-bold text-4xl md:text-6xl leading-tight text-indigo-700 font-sans">
            Discover Unforgettable Journeys with Trekly
          </h1>
          <h3 className="font-semibold text-2xl md:text-3xl leading-tight text-teal-600 font-sans mt-4">
            Customized Adventures for Every Wanderlust
          </h3>
        </div>
        <div className="desc mt-6">
          <h5 className="text-lg md:text-xl font-normal text-gray-600 font-sans">
            Your go-to travel companion for crafting unique experiences. We blend your interests 
            with expert recommendations to create journeys that resonate with your spirit of adventure.
          </h5>
        </div>
        <div className="button mt-8">
          <Link to="/plan-a-trip">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg py-3 px-6 rounded-full transition duration-300 shadow-md">
              {isAuthenticated
                ? "Create Your Next Adventure"
                : "Start Planning - It's on Us!"}
            </Button>
          </Link>
        </div>
      </div>
      <div className="img-container w-full max-w-4xl mx-auto mt-16">
        <img 
          src="/travel.png" 
          className="w-full h-auto object-contain rounded-lg" 
          alt="Travel illustration" 
        />
      </div>
    </div>
  );
}

export default Hero;