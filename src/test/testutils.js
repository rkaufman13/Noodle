import {
  MemoryRouter,
  createMemoryRouter,
  Routes,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../error-page";
import { Create } from "../Create";
import { About } from "../About";
import { EventPage } from "../EventPage";
import { AdminPage } from "../AdminPage";

export const defaultContext = ["", () => {}, "", () => {}];

const adminLoader = () => {
  return {
    singleEvent: { eventname: "my test event", hostName: "farts mcgee" },
  };
};

export const RenderRouteWithOutletContext = ({ context, children }) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <App></App>,
        errorElement: <ErrorPage />,
        children: [
          { path: "", element: <Create /> },
          { path: "/about", element: <About /> },
          {
            path: "/event/:eventUUID",
            element: <EventPage />,
            //loader: eventLoader,
          },
          {
            path: "/admin/:secretUUID",
            element: <AdminPage />,
            loader: adminLoader,
          },
        ],
      },
    ],
    { initialEntries: ["/admin/123"] }
  );

  return router;
};
