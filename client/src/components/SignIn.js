import React, { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Alert from "react-bootstrap/Alert";
import { AuthContext } from "../context/auth";

export default function SignIn({ callback }) {
  const { login } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { email, password });

    login(email, password); // integração com o meu contexto/api
    setValidated(true);
  };

  return (
    <Container className="text-center mt-4 mb-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="secondary-bg-color"
            name="email"
            type="email"
            placeholder="Seu email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Control.Feedback className="warning-text-color" type="invalid">
            Email inválido!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            className="secondary-bg-color"
            name="password"
            type="password"
            placeholder="Sua senha"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Form.Control.Feedback className="warning-text-color" type="invalid">
            Senha inválida!
          </Form.Control.Feedback>
        </Form.Group>
        {alert === true ? (
          <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
            Login inválido!
          </Alert>
        ) : (
          ""
        )}
        <Button type="submit" className="primary-button-bg-color">
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
