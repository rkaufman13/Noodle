import "./App.css";
import React, { useState } from "react";
import { Create } from "./Create";
import { Alert } from "react-bootstrap";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="App">
      <div className="header">
        <h1>Noodle</h1>
        Scheduling events should be easy. That's using your Noodle.
      </div>
      {errorMessage && (
        <Alert variant={"info"}>
          It may seem impastable, but something's gone wrong.
          <p>{errorMessage}</p>
        </Alert>
      )}
      {successMessage && <Alert variant={"success"}>{successMessage}</Alert>}
      <Create
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
    </div>
  );
}

export default App;
