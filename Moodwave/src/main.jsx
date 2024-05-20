import React from "react";
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
  },
  {
    path: "/blog",
    element: <Blog />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/for-you",
    element: <ForYou />,
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
