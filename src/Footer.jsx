import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Row>
      <Col>
        <p>&copy; 2023</p>
      </Col>
      <Col sm="auto">
        <Link to="/about">About</Link>
      </Col>
      <Col sm="auto">
        <Link to="/">Home</Link>
      </Col>
    </Row>
  );
};
