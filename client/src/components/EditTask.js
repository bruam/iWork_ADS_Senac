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
      <Button variant="outline-warning me-2 mb-1" onClick={() => editTask()}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Título da sua tarefa"
                required
                onChange={handleInputChange}
                value={task.title}
              />
              <Form.Control.Feedback type="invalid">
                Título inválido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tempo estimado (min)</Form.Label>
              <Form.Control
                name="time"
                type="number"
                placeholder="Tempo estimado da tarefa"
                required
                min={1}
                onChange={handleInputChange}
                value={task.time}
              />
              <Form.Control.Feedback type="invalid">
                Tempo inválido!
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary">
              Atualizar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
