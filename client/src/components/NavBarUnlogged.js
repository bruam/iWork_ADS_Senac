import React from "react";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar className="mb-3 secondary-bg-color">
      <Container fluid>
        <Navbar.Brand className="ms-3" style={{ color: "#7f26fb" }}>
          iWork
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
