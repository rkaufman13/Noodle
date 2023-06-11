import { useRouteError } from "react-router-dom";
import sadNoodle from "./images/sad_noodle.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <img src={sadNoodle} alt="A sad macaroni" />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
