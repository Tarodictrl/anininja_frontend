import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navigate } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";

import './index.css';
import App from './App';
import AnimePage from './Pages/AnimePage';
import SearchPage from './Pages/SearchPage';
import AnimeChartPage from './Pages/AnimeChartPage'
import AnimeCatalogPage from './Pages/AnimeCatalogPage'
import AnimeOngoingPage from './Pages/AnimeOngoingPage'
import AnimeAnnouncementPage from './Pages/AnimeAnnouncementPage'


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
          return value.url;
    }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "/anime/:id",
    element: (
      <AnimePage />
    ),
  },
  {
    path: "/anime/search",
    element: (
      <SearchPage />
    ),
  },
  {
    path: "/anime/chart",
    element: (
      <AnimeChartPage />
    ),
  },
  {
    path: "/anime/random",
    element: <Navigate to={await getRandom()} replace />
  },
  {
    path: "/anime/catalog",
    element: (
      <AnimeCatalogPage />
    )
  },
  {
    path: "/anime/ongoing",
    element: (
      <AnimeOngoingPage />
    )
  },
  {
    path: "/anime/announcement",
    element: (
      <AnimeAnnouncementPage />
    )
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
