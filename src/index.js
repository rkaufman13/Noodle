import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorPage from "./error-page";
import { Create } from "./Create";
import { About } from "./About";
import { KoFiPage } from "./KoFiPage";
import { EventPage, loader as eventLoader } from "./EventPage";
import { AdminPage, adminLoader } from "./AdminPage";
import reportWebVitals from "./reportWebVitals";
import "./App.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Create /> },
      { path: "/about", element: <About /> },
      { path: "/kofi", element: <KoFiPage /> },
      {
        path: "/event/:eventUUID",
        element: <EventPage />,
        loader: eventLoader,
      },
      {
        path: "/admin/:secretUUID",
        element: <AdminPage />,
        loader: adminLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
