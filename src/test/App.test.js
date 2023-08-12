import { render, screen } from "@testing-library/react";
import App from "../App";
import { Create } from "../Create";
import { MemoryRouter, Route, Routes, Outlet } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const RenderRouteWithOutletContext = ({ context, children }) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

test("renders", () => {
  render(<App />);
  const linkElement = screen.getByText(/using your noodle/i);
  expect(linkElement).toBeInTheDocument();
});

const context = ["", () => {}, "", () => {}];

test("doesn't let you submit form until required fields are filled out", async () => {
  render(
    <RenderRouteWithOutletContext context={context}>
      <Create />
    </RenderRouteWithOutletContext>
  );

  const submitButton = await screen.findByText("Submit");
  expect(submitButton).toBeDisabled();
  userEvent.click(
    screen.getByRole("textbox", { name: "What's your event called?" })
  );
  userEvent.type("asdf;");
  userEvent.click(screen.getByRole("textbox", { name: "What's your name?" }));
  userEvent.type("asdfjk");
  const calendar = screen.getByRole("dialog");
  //eslint-disable-next-line
  const firstDayOfMonth = calendar.querySelectorAll(".rdmp-day .sd")[0]; //this is an ugly hack and it would be better to switch to an accessible calendar picker or update the RMDP picker to be accessible
  screen.debug(firstDayOfMonth);
  userEvent.click(firstDayOfMonth);
  //expect(submitButton).toBeEnabled();
});
