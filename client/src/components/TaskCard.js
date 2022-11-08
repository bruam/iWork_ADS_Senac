import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TaskDataService from "../services/TaskService";
import EditTask from "./EditTask";
import Clock from "./Clock";
import MaxScoreDataService from "../services/MaxScoreService";

function TaskCard({ task, maxScore, editedCallback, deletedCallback }) {
  const initialTask = {
    title: task.title,
    time: task.time,
    project_id: task.project_id,
    minutes_left: 0,
    seconds_left: 0,
    concluded: false,
  };

  const [editedTask, setEditedTask] = useState([]);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [newTask, setNewTask] = useState(task);
  const [newScore, setNewScore] = useState(maxScore);

  useEffect(() => {
    updateTaskClock();
    addScore();
    console.log(newTask);
  }, [newTask, newScore]);

  const countdown = new Date();
  if (
    newTask.minutes_left === 0 &&
    newTask.seconds_left === 0 &&
    newTask.concluded === false
  ) {
    countdown.setSeconds(countdown.getSeconds() + 60 * task.time);
  } else {
    countdown.setSeconds(
      countdown.getSeconds() + 60 * newTask.minutes_left + newTask.seconds_left
    );
  }

  const startTask = () => {
    if (started === false && paused === true) {
      setStarted(true);
      setPaused(false);
    } else {
      setStarted(false);
      setPaused(true);
    }
  };

  const updateTaskClock = () => {
    TaskDataService.update(task.id, newTask)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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

  const addScore = () => {
    MaxScoreDataService.update(1, newScore)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditedTask = (editedTaskProp) => {
    setEditedTask(editedTaskProp);
    editedCallback(editedTask);
  };

  const handleClockCallback = (minutes, seconds) => {
    setNewTask({ ...newTask, minutes_left: minutes, seconds_left: seconds });
    console.log(newTask);
  };

  const handleConcludeTask = () => {
    setNewTask({ ...newTask, concluded: true });
    let sum = maxScore.score + task.time * 10;
    setNewScore({ ...newScore, score: sum });
    setNewTask({
      ...newTask,
      minutes_left: 0,
      seconds_left: 0,
      concluded: true,
    });
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>Tempo: {task.time} minutos</Card.Text>
        {newTask.concluded ? (
          <Button variant="success me-2 mb-1" disabled>
            Concluído
          </Button>
        ) : (
          <Button
            variant="outline-success me-2 mb-1"
            onClick={() => startTask()}
            // disabled={newTask.concluded}
          >
            {started && !task.concluded ? "Pausar" : "Continuar"}
          </Button>
        )}
        <EditTask currentTask={task} callback={handleEditedTask} />
        <Button variant="outline-danger" onClick={() => deleteTask(task.id)}>
          Deletar
        </Button>
        <Clock
          expiryTimestamp={countdown}
          started={started}
          paused={paused}
          clockCallback={handleClockCallback}
          concludeTask={handleConcludeTask}
        />
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
