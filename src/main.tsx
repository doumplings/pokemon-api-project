import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as SearchLoader } from "./routes/root.tsx";
import RandomPoke, { loader as RandLoader } from "./components/RandomPoke.tsx";
import ListPoke, { loader as ListLoader } from "./components/ListPoke.tsx";
import Home, { loader as PikaLoader } from "./routes/HomePage.tsx";
import PokeStats, { loader as StatLoader } from "./routes/PokeStats.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";
import Index from "./routes/Index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: SearchLoader,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/Home",
            element: <Home />,
            loader: PikaLoader,
          },
          {
            path: "/ListPokemon",
            element: <ListPoke />,
            loader: ListLoader,
            children: [
              {
                index: true,
                element: <Index />,
              },
              {
                path: "/ListPokemon/:PokemonName",
                element: <PokeStats />,
                errorElement: (
                  <div id="stats-error">We can't find your Pokemon! </div>
                ),
                loader: StatLoader,
              },
            ],
          },
          {
            path: "/Random",
            element: <RandomPoke />,
            loader: RandLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
