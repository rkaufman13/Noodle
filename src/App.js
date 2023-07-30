import React, { useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";
import { Footer } from "./Footer";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="App">
      <header>
        <Container>
          <Row className="justify-content-center">
            <Col xl={8}>
              <p className="h1 mt-3">Noodle</p>
              <p>Scheduling events should be easy. That's using your Noodle.</p>
            </Col>
          </Row>
        </Container>
      </header>
      {errorMessage && (
        <Container>
          <Alert variant="info">
            <Alert.Heading>
              It may seem impastable, but something's gone wrong.
            </Alert.Heading>
            <p>{errorMessage}</p>
          </Alert>
        </Container>
      )}
      {successMessage && (
        <Container>
          <Alert variant={"success"}>
            <Alert.Heading>Well done, you!</Alert.Heading>
            {successMessage}
          </Alert>
        </Container>
      )}
      <main>
        <Container className="py-3">
          <Row className="justify-content-center">
            <Col xl={8}>
              <Outlet
                context={[
                  errorMessage,
                  setErrorMessage,
                  successMessage,
                  setSuccessMessage,
                ]}
              />
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <Container className="pt-5">
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

export default App;
