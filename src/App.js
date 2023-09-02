import React, { useState, useRef } from "react";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Alerts } from "./Alert";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const alertRef = useRef();

  return (
    <div className="App">
      <Helmet>
        <title>Noodle Scheduling</title>
        <meta name="description" content="Get your noodles together" />
      </Helmet>
      <header>
        <Container>
          <Row>
            <Col className="pt-3">
              <Link className="h1 mb-3" to="/">Noodle</Link>
              <p className="border-bottom pb-3">Scheduling events should be easy. That's using your Noodle.</p>
            </Col>
          </Row>
        </Container>
      </header>
      <span  />
      {errorMessage && (
        <Container>
          <Alerts
            alertRef={alertRef}
            variant="danger"
            heading="It may seem impastable, but something's gone wrong."
            message={errorMessage}
          />
        </Container>
      )}
      {successMessage && (
        <Container>
          <Alerts
            alertRef={alertRef}
            variant="success"
            heading="Well done, you!"
            message={successMessage}
          />
        </Container>
      )}
      <main>
        <Container>
          <Row>
            <Col className="py-3">
              <Outlet
                context={[
                  errorMessage,
                  setErrorMessage,
                  successMessage,
                  setSuccessMessage,
                  alertRef
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
