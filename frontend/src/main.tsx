import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/style.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { GlobalProvider } from "./contexts/GlobalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router}></RouterProvider>
    </GlobalProvider>
  </React.StrictMode>
);
