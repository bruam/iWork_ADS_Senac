import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TaskDataService from "../services/TaskService";
import EditTask from "./EditTask";
import Clock from "./Clock";

function TaskCard({ task, editedCallback, deletedCallback }) {
  const [currentTask, setCurrentTask] = useState([]);
  const [editedTask, setEditedTask] = useState([]);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (task.id) getTask(task.id);
  }, [task]);

  const getTask = (id) => {
    TaskDataService.get(id)
      .then((response) => {
        setCurrentTask(response.data.task);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const countdown = new Date();
  countdown.setSeconds(countdown.getSeconds() + 60 * task.time);

  const startTask = () => {
    if (started === false && paused === true) {
      setStarted(true);
      setPaused(false);
    } else {
      setStarted(false);
      setPaused(true);
    }
  };

  const deleteTask = (id) => {
    TaskDataService.delete(id)
      .then((response) => {
        console.log(response.data.tasks);
        deletedCallback(task);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditedTask = (editedTaskProp) => {
    setEditedTask(editedTaskProp);
    editedCallback(editedTask);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>Tempo: {task.time} minutos</Card.Text>
        <Button variant="outline-success me-2 mb-1" onClick={() => startTask()}>
          {started === true ? "Pausar" : "Continuar"}
        </Button>
        <EditTask currentTask={task} callback={handleEditedTask} />
        <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
          Deletar
        </Button>
        <Clock expiryTimestamp={countdown} started={started} paused={paused} />
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
