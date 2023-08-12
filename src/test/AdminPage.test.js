import { AdminPage } from "../AdminPage";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter, defer } from "react-router-dom";

import App from "../App";
import ErrorPage from "../error-page";
import { Create } from "../Create";
import { About } from "../About";
import { EventPage } from "../EventPage";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useAsyncValue: () => [fakeAdminEvent, 123],
  };
});

const fakeAdminEvent = {
  eventname: "my test event",
  hostName: "farts mcgee",
  deleteAt: 1234567901234567890,
  created: 1234567890,
  active: true,
  admin: "123a",
  eventDesc: "a test description",
  dates: {
    1234567890: { participants: ["Sam", "Samantha"] },
    987654321: { participants: ["Samantha"] },
  },
};

test("admin page renders", async () => {
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: "/",
            element: <App></App>,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "/admin/:secretUUID",
                element: <AdminPage />,
                loader: () => defer(fakeAdminEvent),
              },
            ],
          },
        ],
        { initialEntries: ["/admin/123"], initialIndex: 0 }
      )}
    />
  );
  await waitFor(() => {
    const eventTitle = screen.getByRole("heading", { level: 1 });
    expect(eventTitle).toHaveTextContent("my test event");
  });
});
