import React, { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateProfile from "./pages/CreateProfile";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import ForYou from "./pages/ForYou";
import Generate from "./pages/Generate";
import PlaylistPreview from "./pages/PlaylistPreview";
import { getProfileData } from "./pages/services/service";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
    loader: getProfileData,
  },
  {
    path: "/blog",
    element: <Blog />,
    loader: getProfileData,
  },

  {
    path: "/profile",
    element: <Profile />,
    loader: getProfileData,
  },

  {
    path: "/for-you",
    element: <ForYou />,
    loader: getProfileData,
  },
  {
    path: "/generate",
    element: <Generate />,
  },

  {
    path: "/playlist-preview",
    element: <PlaylistPreview />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
        <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
