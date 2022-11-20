import React, { useState } from "react";
import UserDataService from "../services/UserService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

export default function NewUser({ callback }) {
  const initialUserState = {
    id: null,
    email: "",
    password: "",
  };

  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveUser();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      email: user.email,
      password: user.password,
    };

    UserDataService.create(data)
      .then((response) => {
        setUser({
          id: response.data.id,
          email: response.data.email,
          password: response.data.password,
        });
        callback(user);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newUser = () => {
    handleShow();
    setUser(initialUserState);
  };

  return (
    <Container className="text-center mt-4 mb-5">
      <Button className="primary-button-bg-color" onClick={newUser}>
        Criar usuário
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Novo Usuário</Modal.Title>
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
              Criar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
