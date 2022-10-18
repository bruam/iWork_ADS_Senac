import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TaskDataService from "../services/TaskService";
import EditTask from "./EditTask";
import Clock from "./Clock";

function TaskCard({ task, deleteTask }) {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentTask, setCurrentTask] = useState(initialTutorialState);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 6000);
  let started = false;

  // console.log(Task);
  // console.log(Task.id);
  // console.log(currentTask);

  useEffect(() => {
    if (task.id) getTask(task.id);
  }, [task]);

  const getTask = (id) => {
    TaskDataService.get(id)
      .then((response) => {
        setCurrentTask(response.data.task);
        // console.log(response.data.task);
        // console.log(response.data.task.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const startTask = () => {
    started = true;
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>
          {task.id} - {task.title}
        </Card.Title>
        <Card.Text>Tempo: {task.time} minutos</Card.Text>
        <Button variant="outline-success me-2 mb-1" onClick={() => startTask()}>
          Continuar
        </Button>
        <EditTask task={task} />
        <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
          Deletar
        </Button>
        <Clock expiryTimestamp={time} started={started} />
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
