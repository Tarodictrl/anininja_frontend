import React from 'react';
import { createRoot } from "react-dom/client";
import { Navigate } from 'react-router-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import MainPage from './Pages/MainPage'
import AnimePage from './Pages/AnimePage';
import NotFoundPage from './Components/Error/NotFound';
import App from './App';
import AnimeCatalog from './Pages/AnimeCatalogPage';

import './index.css';
import SignInPage from './Pages/SignInPage';
import RegistrationPage from './Pages/RegistrationPage';
import ProfilePage from './Pages/ProfilePage';

const getRandom = async () => {
  const response = await fetch(
    `https://api.anininja.ru/api/anime/random`,
      {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
      }
    );

    if (response.ok) {
          let value = await response.json()
          console.log(value);
          return value.url;
    }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App component={<MainPage />}/>
    ),
  },
  {
    path: "/sign_in",
    element: (
      <App component={<SignInPage />}/>
    ),
  },
  {
    path: "/registration",
    element: (
      <App component={<RegistrationPage />}/>
    ),
  },
  {
    path: "/anime/catalog",
    element: (
      <App component={<AnimeCatalog />}/>
    ),
  },
  {
    path: "/anime/:id",
    element: (
      <App component={<AnimePage />}/>
    ),
  },
  {
    path: "/anime/random",
    element: <Navigate to={await getRandom()} replace />
  },
  {
    path: "/profile",
    element: (
      <App component={<ProfilePage />}/>
    ),
  },
  {
    path: "*",
    element: (
      <App component={<NotFoundPage />}/>
    )
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

reportWebVitals();
