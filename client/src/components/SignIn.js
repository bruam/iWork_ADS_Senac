import React, { useState } from "react";
import AuthDataService from "../services/AuthService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function SignIn({ callback }) {
  const initialUserState = {
    id: null,
    email: "",
    password: "",
  };

  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const [validated, setValidated] = useState(false);
  const [auth, setAuth] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setLoading(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      signIn();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signIn = () => {
    var data = {
      email: user.email,
      password: user.password,
    };

    AuthDataService.login(data)
      .then((response) => {
        setAuth({
          auth: response.data.auth,
          token: response.data.token,
        });
        callback(auth);
        console.log(auth);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const login = () => {
    handleShow();
    setUser(initialUserState);
  };

  return (
    <Container className="text-center mt-4 mb-5">
      <Button className="primary-button-bg-color" onClick={login}>
        Entrar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Informe Email e Senha:</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detail-bg-color">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="email"
                type="email"
                placeholder="Seu email"
                required
                onChange={handleInputChange}
                value={user.email}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
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
                onChange={handleInputChange}
                value={user.password}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Senha inválida!
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="primary-button-bg-color">
              Entrar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
