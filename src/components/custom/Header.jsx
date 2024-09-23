import React, { useContext } from "react";
import { Button } from "../ui/button.jsx";
import { LogInContext } from "@/Context/LogInContext/Login.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from 'lucide-react';
import { Link } from "react-router-dom";

function Header() {
  const {user, isAuthenticated, logout, loginWithPopup } = useContext(LogInContext);

  const LogOut = () => {
    logout();
  }
  const LogIn = () => {
    loginWithPopup();
  }

  return (
    <div className="w-full flex flex-col items-center justify-between shadow-sm">
      <div className="w-full flex items-center justify-between p-3 md:px-5">
        <div className="logo flex gap-2 items-center justify-between">
          <div className="img inline-block h-5 w-5 md:h-10 md:w-10">
            <img src="/logo.png" alt="" />
          </div>
          <h1 className="text-lg md:text-3xl font-bold">
            Trekly
          </h1>
        </div>
        {isAuthenticated ? 
        (<DropdownMenu>
          <DropdownMenuTrigger className="">
            <div className="user flex items-center gap-2 mr-3">
              <h2 className="hidden sm:block font-medium">Hy {user.nickname}</h2>
              <div className="userimg overflow-hidden h-10 w-10 rounded-full">
                <img src={user.picture}  alt="" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='text-center sm:text-left'>
            <DropdownMenuLabel className='font-semibold text-xl'>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=' text-lg'>
              <Link to='/all-trips'>
                My Trips
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className=' text-lg'>
              <Link to="/plan-a-trip">
                Create Trip
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className=' text-lg'><Button onClick={LogOut}>Log Out <DropdownMenuShortcut>{" "}< LogOutIcon className="h-4" /></DropdownMenuShortcut></Button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        ) 
        : 
        (
          <button 
            onClick={LogIn} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <LogInIcon className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
    </div>
  );
}

export default Header;