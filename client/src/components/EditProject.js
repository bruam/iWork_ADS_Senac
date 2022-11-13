import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

export default function EditProject({ currentProject, callback }) {
  const initialProjectState = {
    title: currentProject.title,
    deadline: currentProject.deadline,
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
      updateProject();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const updateProject = () => {
    ProjectDataService.update(currentProject.id, project)
      .then((response) => {
        console.log(response.data);
        callback(project);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editProject = () => {
    handleShow();
    setProject(initialProjectState);
  };

  // console.log(id);
  return (
    <>
      <Button variant="warning me-2 mb-1" onClick={() => editProject()}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Editar projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body className="detail-bg-color">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="title"
                type="text"
                placeholder="Título da sua tarefa"
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
                placeholder="Tempo estimado da tarefa"
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
              Atualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
