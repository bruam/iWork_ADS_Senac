import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import ProjectService from "../services/ProjectService";
import TaskDataService from "../services/TaskService";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import MaxScoreDataService from "../services/MaxScoreService";
import ProjectDataService from "../services/ProjectService";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ListTasks({
  maxScore,
  concludedCallback,
  concludedProjectCallback,
}) {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [editedTask, setEditedTask] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);
  const [concluded, setConcluded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleProjectName(id);
    retrieveTasks(id);
    concludedCallback(concluded);
  }, [id, newTask, editedTask, deletedTask, concluded]);

  const retrieveTasks = (id) => {
    TaskDataService.getAllFromProject(id)
      .then((response) => {
        setTasks(response.data.tasks);
        // console.log(response.data.tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const verifyTasks = (tasks) => {
    let data = [];
    tasks.map((task) => {
      data.push(task.concluded);
    });
    return data.includes(false);
  };

  const handleProjectName = (id) => {
    ProjectService.get(id)
      .then((response) => {
        setProjectName(response.data.project.title);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNewCallback = (newTaskProp) => {
    setNewTask(newTaskProp);
  };

  const handleEditedCallback = (editedTaskProp) => {
    setEditedTask(editedTaskProp);
  };

  const handleDeletedCallback = (deletedTaskProp) => {
    setDeletedTask(deletedTaskProp);
  };

  const handleConcludedCallback = (concludedTaskProp) => {
    setConcluded(concludedTaskProp);
  };

  const addScoreProject = (newScore) => {
    console.log(newScore);
    MaxScoreDataService.update(1, newScore)
      .then((response) => {
        console.log(response.data);
        concludedProjectCallback(true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const concludeCurrentProject = (project) => {
    ProjectDataService.update(id, project)
      .then((response) => {
        console.log(response.data);
        concludedProjectCallback(true);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const concludeProject = (id) => {
    let newScore = {
      score: maxScore.score,
      projects_done: maxScore.projects_done + 1,
    };

    let project = {
      concluded: true,
    };

    addScoreProject(newScore);
    concludeCurrentProject(project);
  };

  return (
    <Container>
      <Container className="d-flex justify-content-start ps-0">
        <IoMdArrowRoundBack
          style={{ cursor: "pointer" }}
          size="2em"
          onClick={() => navigate("/")}
        />
        <h2 className="mb-5 ms-3">{projectName}</h2>
      </Container>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          maxScore={maxScore}
          editedCallback={handleEditedCallback}
          deletedCallback={handleDeletedCallback}
          concludedCallback={handleConcludedCallback}
        />
      ))}
      <NewTask newCallback={handleNewCallback} />
      <Container className="ms-1 mt-3">
        {!verifyTasks(tasks) ? (
          <Button variant="success" onClick={() => concludeProject(id)}>
            Finalizar Projeto
          </Button>
        ) : (
          <Button variant="success" disabled>
            Finalizar Projeto
          </Button>
        )}
      </Container>
    </Container>
  );
}
