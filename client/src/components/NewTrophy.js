import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import TrophyDataService from "../services/TrophyService";

export default function NewTrophy({ callback }) {
  const initialTrophyState = {
    id: null,
    title: "",
    description: "",
    goal: 0,
    trophy_type: "T",
  };

  const [show, setShow] = useState(false);
  const [trophy, setTrophy] = useState(initialTrophyState);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveTrophy();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTrophy({ ...trophy, [name]: value });
  };

  const saveTrophy = () => {
    var data = {
      title: trophy.title,
      description: trophy.description,
      goal: trophy.goal,
      trophy_type: trophy.trophy_type,
    };

    TrophyDataService.create(data)
      .then((response) => {
        setTrophy({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          goal: response.data.goal,
          trophy_type: response.data.trophy_type,
        });
        callback(trophy);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTrophy = () => {
    handleShow();
    setTrophy(initialTrophyState);
  };

  return (
    <Container className="text-center mt-4 mb-5">
      <Button className="primary-button-bg-color" onClick={newTrophy}>
        Novo troféu
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Novo Troféu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detail-bg-color">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="title"
                type="text"
                placeholder="Título do seu troféu"
                required
                onChange={handleInputChange}
                value={trophy.title}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Título inválido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="description"
                type="textarea"
                placeholder="Descrição do seu troféu"
                onChange={handleInputChange}
                value={trophy.description}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Descrição inválido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Meta</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="goal"
                type="number"
                placeholder="Valor da meta"
                required
                min={1}
                onChange={handleInputChange}
                value={trophy.goal}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Meta inválida!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                className="secondary-bg-color mb-3"
                name="trophy_type"
                onChange={handleInputChange}
              >
                <option value="T">Pontuação alcançada</option>
                <option value="P">Projetos concluídos</option>
              </Form.Select>
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
