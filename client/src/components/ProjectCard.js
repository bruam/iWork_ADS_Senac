import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import ProjectDataService from "../services/ProjectService";
import EditProject from "./EditProject";
import TaskDataService from "../services/TaskService";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

function ProjectCard({ project, deletedCallback, editedCallback }) {
  const [alert, setAlert] = useState(false);
  const [editedProject, setEditedProject] = useState([]);

  const navigate = useNavigate();

  const openProject = (id) => {
    console.log(id);
    navigate(`/task/${id}`);
  };

  const handleDateFormat = (deadline) => {
    const date = deadline.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  const handleDeleteProject = (tasks) => {
    if (tasks.length === 0) {
      deleteProject(project.id);
    } else {
      setAlert(true);
    }
  };

  const retrieveTasks = (id) => {
    TaskDataService.getAllFromProject(id)
      .then((response) => {
        // console.log(response.data.tasks);
        handleDeleteProject(response.data.tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (id) => {
    ProjectDataService.delete(id)
      .then((response) => {
        // console.log(response.data.project);
        deletedCallback(response.project);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEditProject = (editedProjectProp) => {
    setEditedProject(editedProjectProp);
    editedCallback(editedProject);
  };

  return (
    <>
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
          <EditProject currentProject={project} callback={handleEditProject} />
          <Button
            variant="outline-danger"
            onClick={() => retrieveTasks(project.id)}
          >
            Deletar
          </Button>
        </Card.Body>
      </Card>
      {alert === true ? (
        <Alert variant="primary" onClose={() => setAlert(false)} dismissible>
          Projeto contém tarefas não finalizadas!
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectCard;
