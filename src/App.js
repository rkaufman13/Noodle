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
          <Row>
            <Col>
              <p className="h1 py-3">Noodle</p>
              <p>Scheduling events should be easy. That's using your Noodle.</p>
            </Col>
          </Row>
        </Container>
      </header>
      {errorMessage && (
        <Container>
          <Alert variant="info">
            <p className="m-0">It may seem impastable, but something's gone wrong.</p>
            <p className="m-0">{errorMessage}</p>
          </Alert>
        </Container>
      )}
      {successMessage && (
        <Container>
          <Alert variant={"success"}>{successMessage}</Alert>
        </Container>
      )}
      <main>
        <Container className="py-3">
          <Row>
            <Col>
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
        <Container className="py-3">
          <Footer />
        </Container>
      </footer>
    </div>
  );
}

export default App;
