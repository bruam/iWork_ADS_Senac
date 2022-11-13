import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { format } from "date-fns";

export default function NewProject({ callback }) {
  const initialProjectState = {
    id: null,
    title: "",
    deadline: "",
  };

  const today = new Date();

  const [show, setShow] = useState(false);
  const [project, setProject] = useState(initialProjectState);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      saveProject();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline,
    };

    ProjectDataService.create(data)
      .then((response) => {
        setProject({
          id: response.data.id,
          title: response.data.title,
          deadline: response.data.deadline,
        });
        callback(project);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProject = () => {
    handleShow();
    setProject(initialProjectState);
  };

  return (
    <Container className="text-center mt-4 mb-5">
      <Button className="primary-button-bg-color" onClick={newProject}>
        Novo projeto
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Novo Projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detail-bg-color">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="title"
                type="text"
                placeholder="Título do seu projeto"
                required
                onChange={handleInputChange}
                value={project.title}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Título inválido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prazo estimado</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="deadline"
                type="date"
                placeholder="Prazo do seu projeto"
                min={format(today, "yyyy-MM-dd")}
                required
                onChange={handleInputChange}
                value={project.deadline}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Prazo inválido!
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
