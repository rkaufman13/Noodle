import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { ErrorIcon } from "./resources/ErrorIcon";

export const Alerts = (props) => {
  useEffect(() => {
    // Focus on the alert the first time it's rendered--maybe there's a better way to do this and you can teach me
    props.alertRef.current.focus();
  });

  return (
    <>
      <Alert ref={props.alertRef} variant={props.variant} data-bs-theme="dark" className="my-3" tabIndex={-1}>
        <Alert.Heading>
          {/* <ErrorIcon /> Need to fix this */}
          <p className="m-0">{props.heading}</p>
        </Alert.Heading>
        {props.message ?? <p className="m-0">{props.message}</p>}
      </Alert>
    </>
  );
};
