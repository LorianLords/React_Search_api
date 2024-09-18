import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider } from "react-router-dom";
import "./index.css";
import { store } from "./state/store.ts";
import { Provider } from "react-redux";
import { router } from "./app/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
