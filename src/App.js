import React, { useState } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="App">
      <header>
        <Container>
          <Row className="justify-content-center">
            <Col xl={8} className="border-bottom">
              <p className="h1 mt-3">
                <Link to="/">Noodle</Link>
              </p>
              <p>Scheduling events should be easy. That's using your Noodle.</p>
            </Col>
          </Row>
        </Container>
      </header>
      {errorMessage && (
        <Container>
          <Alert variant="danger" data-bs-theme="dark" className="my-3">
            <Alert.Heading>
              <svg
                width="24px"
                height="24px"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
                class="me-2"
              >
                <path
                  d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M12 17.01l.01-.011"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              It may seem impastable, but something's gone wrong.
            </Alert.Heading>
            <p>{errorMessage}</p>
          </Alert>
        </Container>
      )}

      {successMessage && (
        <Container>
          <Alert variant={"success"} className="my-3">
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
