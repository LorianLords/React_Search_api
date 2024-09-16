import { store } from "../state/store.ts";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import ErrorPage from "../views/ErrorPage.tsx";
import Home from "../views/Home.tsx";
import { useAppSelector } from "../hooks/hooks.ts";
import { apiSlice } from "../state/Api/ApiSlice.ts";
import CardDetails from "../components/CardDetails/CardDetails.tsx";
import { detailsApi } from "../state/DetailsCard/DetailsApi.ts";
import About from "../views/About.tsx";
import React from "react";

const loadStore = () =>
  // эмулирует асинхронную инициализацию хранилища чтобы работать с ним до рендеринга

  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0);
  });

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
       /* loader: ({ request }) => {
          loadStore().then(async () => {
            const url = new URL(request.url); // Парсим URL
            const currentPage = parseInt(url.searchParams.get("page") ?? "1");
            const searchText = url.searchParams.get("search");
            console.log("loader parse", currentPage, searchText);
            store.dispatch(
              apiSlice.util.prefetch(
                "getCardList",
                { searchText, currentPage },
                {},
              ),
            );
          });
          return null;
        },*/
        children: [
          {
            path: "card/:id",
            element: <CardDetails />,
         /*     loader: ({ params }) => {
                  loadStore().then(async () => {
                      console.log("params: ", params.id);
                      store.dispatch(
                          detailsApi.util.prefetch(
                              "getCardDetails",
                              { cardId: params.id ?? "" },
                              {},
                          ),
                      );
                  });
                  return null;
              },*/
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
