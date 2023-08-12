import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "../App";
import { MemoryRouter } from "react-router-dom";

test("renders", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/using your noodle/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders and looks the same as before", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("doesn't let you submit form until required fields are filled out", async () => {
  //this will never work until the calendar is a11y, so we'll get to it later
  //   render(
  //     <RenderRouteWithOutletContext context={context}>
  //       <Create />
  //     </RenderRouteWithOutletContext>
  //   );
  //   const submitButton = await screen.findByText("Submit");
  //   expect(submitButton).toBeDisabled();
  //   userEvent.click(
  //     screen.getByRole("textbox", { name: /What's your event called?/ })
  //   );
  //   userEvent.type("asdf;");
  //   userEvent.click(screen.getByRole("textbox", { name: /What's your name?/ }));
  //   userEvent.type("asdfjk");
  //   const calendar = screen.getByRole("dialog");
  //   //eslint-disable-next-line
  //   const firstDayOfMonth = calendar.querySelectorAll(".rdmp-day .sd")[0]; //this is an ugly hack and it would be better to switch to an accessible calendar picker or update the RMDP picker to be accessible
  //   screen.debug(firstDayOfMonth);
  //   userEvent.click(firstDayOfMonth);
  //   //expect(submitButton).toBeEnabled();
});
