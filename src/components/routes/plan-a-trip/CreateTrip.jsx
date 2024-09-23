import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  PROMPT,
  SelectBudgetOptions,
  SelectNoOfPersons,
} from "../../constants/Options";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { chatSession } from "@/Service/AiModel";

import { LogInContext } from "@/Context/LogInContext/Login";

import { db } from "@/Service/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { user, loginWithPopup, isAuthenticated } = useContext(LogInContext);

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const SignIn = async () => {
    loginWithPopup();
  };

  const SaveUser = async () => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = User?.email;
    await setDoc(doc(db, "Users", id), {
      userName: User?.name,
      userEmail: User?.email,
      userPicture: User?.picture,
      userNickname: User?.nickname,
    });
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("User", JSON.stringify(user));
      SaveUser();
    }
  }, [user]);

  const SaveTrip = async (TripData) => {
    const User = JSON.parse(localStorage.getItem("User"));
    const id = Date.now().toString();
    setIsLoading(true);
    await setDoc(doc(db, "Trips", id), {
      tripId: id,
      userSelection: formData,
      tripData: TripData,

      userName: User?.name,
      userEmail: User?.email,
    });
    setIsLoading(false);
    localStorage.setItem('Trip', JSON.stringify(TripData));
    navigate('/my-trips/'+id);
  };

  const generateTrip = async () => {
    if (!isAuthenticated) {
      toast("Sign In to continue", {
        icon: "⚠️",
      });
      return setIsDialogOpen(true);
    }
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.People ||
      !formData?.Budget
    ) {
      return toast.error("Please fill out every field or select every option.");
    }
    if (formData?.noOfDays > 5) {
      return toast.error("Please enter Trip Days less then 5");
    }
    if (formData?.noOfDays < 1) {
      return toast.error("Invalid number of Days");
    }
    const FINAL_PROMPT = PROMPT.replace(/{location}/g, formData?.location)
      .replace(/{noOfDays}/g, formData?.noOfDays)
      .replace(/{People}/g, formData?.People)
      .replace(/{Budget}/g, formData?.Budget);


    try {
      const toastId = toast.loading("Generating Trip", {
        icon: "✈️",
      });

      setIsLoading(true);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const trip = JSON.parse(result.response.text());
      setIsLoading(false);
      SaveTrip(trip);

      toast.dismiss(toastId);
      toast.success("Trip Generated Successfully");
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
      toast.error("Failed to generate trip. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="mt-10 px-4 md:px-0">
      <div className="text text-center md:text-left">
        <h2 className="text-2xl md:text-4xl font-bold text-blue-700">
          Let's Plan Your Dream Getaway! 🌴✈️
        </h2>
        <p className="text-sm text-gray-600 font-medium mt-3">
          Help us design your ideal escapade by sharing a few key details. Trekly will whip up a custom-made itinerary that's perfect for you! 🎨🗺️
        </p>
      </div>
  
      <div className="form mt-10 flex flex-col gap-10 md:gap-20 ">
        <div className="place bg-white p-5 rounded-lg shadow">
          <h2 className="font-semibold text-md md:text-lg mb-3">
            Where are you headed? 🏙️🏝️
          </h2>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyDjpRd3KwngJDa_MQy6cgdJti0Lu3mGaKI"
            selectProps={{
              value: place,
              onChange: (place) => {
                setPlace(place);
                handleInputChange("location", place.label);
              },
              styles: {
                input: (base) => ({
                  ...base,
                  padding: '10px',
                  fontSize: '16px',
                }),
                control: (base, state) => ({
                  ...base,
                  borderColor: 'gray',
                  boxShadow: state.isFocused ? '0 0 0 1px #007bff' : 0,
                  '&:hover': {
                    borderColor: 'gray',
                  },
                }),
              }
            }}
          />
        </div>

        <div className="budget bg-white p-5 rounded-lg shadow">
        <h2 className="font-semibold text-md md:text-lg mb-3">
          What's your budget looking like? 💰💳
        </h2>
        <div className="options grid grid-cols-1 md:grid-cols-3 gap-5">
          {SelectBudgetOptions.map((item) => (
            <div
              onClick={(e) => handleInputChange("Budget", item.title)}
              key={item.id}
              className={`option transition-all hover:scale-110 p-4 h-32 flex items-center justify-center flex-col border rounded-lg hover:shadow-lg
                ${formData?.Budget === item.title ? "bg-blue-100 border-blue-500" : "bg-white"}`}
            >
              <h3 className="font-bold text-[15px] md:text-[18px]">{item.icon} {item.title} :</h3>
              <p className="text-gray-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="people bg-white p-5 rounded-lg shadow">
        <h2 className="font-semibold text-md md:text-lg mb-3">
          Who are you traveling with? 🚗
        </h2>
        <div className="options grid grid-cols-4 gap-2 md:gap-4">
          {SelectNoOfPersons.map((item) => (
            <div
            onClick={(e) => handleInputChange("People", item.no)}
            key={item.id}
            className={`option transition-all hover:scale-105 p-5 md:p-6 flex items-center justify-center flex-col border rounded-lg hover:shadow-lg cursor-pointer
              ${formData?.People === item.no ? "bg-blue-100 border-blue-500" : "bg-white"}`}
          >
            <h3 className="font-bold text-base md:text-lg mb-1">{item.icon} {item.title}</h3>
<p className="text-gray-600 font-medium text-sm md:text-base">{item.desc}</p>
<p className="text-gray-500 text-sm md:text-base font-normal mt-1">{item.no}</p>
            </div>
          ))}
        </div>
      </div>

        <div className="day bg-white p-5 rounded-lg shadow">
          <h2 className="font-semibold text-md md:text-lg mb-3 text-center md:text-left">
            How many days will you be exploring? 🗓️
          </h2>
          <Input
            placeholder="Ex: 2"
            type="number"
            onChange={(day) => handleInputChange("noOfDays", day.target.value)}
          />
        </div>
      </div>

      <div className="create-trip-btn w-full flex items-center justify-center h-32">
        <Button disabled={isLoading} onClick={generateTrip} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Plan A Trip"
          )}
        </Button>
      </div>

      <Dialog
        className="m-4"
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {user ? "Thank you for LogIn" : "Sign In to Continue"}
            </DialogTitle>
            <DialogDescription>
              <span className="flex gap-2">
                <span>
                  {user
                    ? "Logged In Securely to Trekly with Google Authentication"
                    : "Sign In to Trekly with Google Authentication Securely"}
                </span>
              </span>
              {user ? (
                ""
              ) : (
                <Button
                  onClick={SignIn}
                  className="w-full mt-5 flex gap-2 items-center justify-center"
                >
                  Sign In with <FcGoogle className="h-5 w-5" />
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="w-full">
              <DialogClose>Close</DialogClose>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default CreateTrip;
