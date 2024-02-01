import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { ErrorIcon } from "./resources/ErrorIcon";

export const Alerts = ({ alertRef, variant, message, heading }: { alertRef: any, variant: string, message: string, heading: string }) => {
  useEffect(() => {
    // Focus on the alert the first time it's rendered--maybe there's a better way to do this and you can teach me
    alertRef.current.focus();
  });

  return (
    <>
      <Alert
        ref={alertRef}
        variant={variant}
        data-bs-theme="dark"
        className="my-3"
        tabIndex={-1}
      >
        <Alert.Heading>
          <p className="m-0">
            {variant === "danger" && <ErrorIcon />}
            {heading}
          </p>
        </Alert.Heading>
        {message ?? <p className="m-0">{message}</p>}
      </Alert>
    </>
  );
};
