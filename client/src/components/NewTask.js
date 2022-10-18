import React, { useState } from "react";
import TaskDataService from "../services/TaskService";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";

export default function NewTask() {
  const { id } = useParams();

  const initialTaskState = {
    id: null,
    title: "",
    time: 0,
    project_id: id,
  };

  const [show, setShow] = useState(false);
  const [task, setTask] = useState(initialTaskState);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = () => {
    var data = {
      title: task.title,
      time: task.time,
      project_id: id,
    };

    TaskDataService.create(data)
      .then((response) => {
        setTask({
          id: response.data.id,
          title: response.data.title,
          time: response.data.time,
          project_id: id,
        });
        setSubmitted(true);
        handleClose();
        // console.log(response.data.task);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTask = () => {
    handleShow();
    setTask(initialTaskState);
    setSubmitted(false);
  };

  // console.log(id);
  return (
    <Container className="ms-1 mt-3">
      <Button variant="secondary" onClick={() => newTask()}>
        Adicionar tarefa
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nova tarefa</Modal.Title>
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
          <Button variant="primary" onClick={() => saveTask()}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
