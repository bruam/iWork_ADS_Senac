import React, { useState } from "react";
import TaskDataService from "../services/TaskService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function EditTask(props) {
  const initialTaskState = {
    title: props.task.title,
    time: props.task.time,
    project_id: props.task.project_id,
  };

  const [show, setShow] = useState(false);
  const [task, setTask] = useState(initialTaskState);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const updateTask = () => {
    TaskDataService.update(props.task.id, task)
      .then((response) => {
        console.log(response.data);
        setMessage("The Task was updated successfully!");
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
          <Form>
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
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tempo estimado (min)</Form.Label>
              <Form.Control
                name="time"
                type="number"
                placeholder="Tempo estimado da tarefa"
                required
                onChange={handleInputChange}
                value={task.time}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateTask()}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
