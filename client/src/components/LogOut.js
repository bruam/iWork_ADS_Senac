import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { AuthContext } from "../context/auth";
import AuthService from "../services/AuthService";

export default function LogOut({ callback }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Container className="text-center mt-4 mb-5">
        <Button className="primary-button-bg-color" onClick={handleLogout}>
          Sair
        </Button>
      </Container>
    </div>
  );
}
