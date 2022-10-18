import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="ms-5" href="/">
        iWork
      </Navbar.Brand>
    </Navbar>
  );
}
