import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

export default function NewProject({ id }) {
  const initialProjectState = {
    id: null,
    title: "",
    deadline: "",
  };

  const [show, setShow] = useState(false);
  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        setSubmitted(true);
        console.log(response.data.project);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline,
    };

    ProjectDataService.update(id, data)
      .then((response) => {
        console.log(response.data);
        setMessage("The Project was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newProject = () => {
    handleShow();
    setProject(initialProjectState);
    setSubmitted(false);
  };

  console.log(id);
  return (
    <Container className={id !== undefined ? "text-center pt-3" : ""}>
      {id !== undefined ? (
        <Button variant="outline-warning" onClick={updateProject(id)}>
          Editar
        </Button>
      ) : (
        <Button variant="primary" onClick={newProject}>
          Iniciar novo projeto
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Título do seu projeto"
                required
                onChange={handleInputChange}
                value={project.title}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prazo estimado</Form.Label>
              <Form.Control
                name="deadline"
                type="date"
                placeholder="Prazo do seu projeto"
                required
                onChange={handleInputChange}
                value={project.deadline}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveProject}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
