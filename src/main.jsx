import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { LogInContextProvider } from "./Context/LogInContext/Login.jsx";
import ErrorBoundary from "./components/constants/Error.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";



ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Auth0Provider
      domain={"dev-07t3vwgbaswbxedj.us.auth0.com"}
        clientId={"jUoGda0pteKfpZZ9rcTjdVBxZ6FIpgDA"}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <LogInContextProvider>
          <ErrorBoundary>
            <Toaster />
            <App />
          </ErrorBoundary>
        </LogInContextProvider>
      </Auth0Provider>
    </BrowserRouter>
);


