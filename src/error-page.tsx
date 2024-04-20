import React from 'react';
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
const sadNoodle = require("./images/sad_noodle.png");

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <img src={sadNoodle} alt="A sad macaroni" />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data.message}</i>
        </p>
      </div>
    );
  }
}
