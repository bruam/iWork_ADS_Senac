import React, { useState } from "react";
import TaskDataService from "../services/TaskService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function EditTask({ currentTask, callback }) {
  const initialTaskState = {
    title: currentTask.title,
    time: currentTask.time,
    project_id: currentTask.project_id,
  };

  const [show, setShow] = useState(false);
  const [task, setTask] = useState(initialTaskState);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateTask();
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const updateTask = () => {
    TaskDataService.update(currentTask.id, task)
      .then((response) => {
        console.log(response.data);
        callback(task);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editTask = () => {
    handleShow();
    setTask(initialTaskState);
  };

  // console.log(id);
  return (
    <>
      <Button variant="warning me-2 mb-1" onClick={() => editTask()}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="detail-bg-color">
          <Modal.Title>Editar tarefa</Modal.Title>
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
                value={task.title}
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Título inválido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tempo estimado (min)</Form.Label>
              <Form.Control
                className="secondary-bg-color"
                name="time"
                type="number"
                placeholder="Tempo estimado da tarefa"
                required
                min={1}
                onChange={handleInputChange}
                value={task.time}
                disabled
              />
              <Form.Control.Feedback
                className="warning-text-color"
                type="invalid"
              >
                Tempo inválido!
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
