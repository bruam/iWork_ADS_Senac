import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ProjectDataService from "../services/ProjectService";
import EditProject from "./EditProject";
import TaskDataService from "../services/TaskService";
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";

function ProjectCard({ project }) {
  useEffect((id) => {
    getTasks(id);
  });

  const [tasks, setTasks] = useState();

  const navigate = useNavigate();

  const openProject = (id) => {
    console.log(id);
    navigate(`/task/${id}`);
  };

  const handleDateFormat = (deadline) => {
    const date = deadline.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  const handleDeleteProject = (id) => {
    console.log(tasks);
    getTasks(id);
    console.log(!tasks);
    if (!tasks) {
      deleteProject(id);
    } else {
      <Alert variant="primary">Projeto contém tarefas não finalizadas!</Alert>;
    }
  };

  const getTasks = (id) => {
    console.log(id);
    console.log(tasks);
    TaskDataService.getAllFromProject(id)
      .then((response) => {
        setTasks(response.data.tasks);
        console.log(tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (id) => {
    ProjectDataService.delete(id)
      .then((response) => {
        console.log(response.data.project);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>Prazo: {handleDateFormat(project.deadline)}</Card.Text>
        <Button
          variant="outline-success me-2 mb-1"
          onClick={() => openProject(project.id)}
        >
          Continuar
        </Button>
        <EditProject project={project} />
        <Button
          variant="outline-danger"
          onClick={() => handleDeleteProject(project.id)}
        >
          Deletar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
