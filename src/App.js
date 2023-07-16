import "./App.css";
import React, { useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="App">
      <header>
        <Container>
          <Row className="justify-content-center">
            <Col xl={8}>
              <h1>Noodle</h1>
              <p>Scheduling events should be easy. That's using your Noodle.</p>
            </Col>
          </Row>
        </Container>
      </header>
      {errorMessage && (
        <Alert variant={"info"}>
          It may seem impastable, but something's gone wrong.
          <p>{errorMessage}</p>
        </Alert>
      )}
      {successMessage && <Alert variant={"success"}>{successMessage}</Alert>}
      <main>
        <Container>
          <Row className="justify-content-center">
            <Col xl={8}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
