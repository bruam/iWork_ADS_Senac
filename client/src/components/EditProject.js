import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function EditProject(props) {
  const initialProjectState = {
    title: props.project.title,
    deadline: props.project.deadline,
  };

  const [show, setShow] = useState(false);
  const [project, setProject] = useState(initialProjectState);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const updateProject = () => {
    ProjectDataService.update(props.project.id, project)
      .then((response) => {
        console.log(response.data);
        setMessage("The Project was updated successfully!");
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
      <Button variant="outline-warning me-2 mb-1" onClick={() => editProject()}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar projeto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Título da sua tarefa"
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
                placeholder="Tempo estimado da tarefa"
                required
                onChange={handleInputChange}
                value={project.deadline}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateProject()}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
