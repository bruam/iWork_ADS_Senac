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
    navigate(`/task/${id}`);
  };

  const handleDateFormat = (deadline) => {
    const date = deadline.split("-");
    return `${date[2]}/${date[1]}/${date[0]}`;
  };

  const verifyTasks = (tasks) => {
    let data = [];
    tasks.map((task) => {
      data.push(task.concluded);
    });
    return data.includes(false);
  };

  const handleDeleteProject = (tasks) => {
    if (tasks.length === 0 || !verifyTasks(tasks)) {
      deleteTasks(project.id);
      deleteProject(project.id);
    } else {
      console.log(verifyTasks(tasks));
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

  const deleteTasks = (id) => {
    TaskDataService.deleteAllFromProject(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (id) => {
    ProjectDataService.delete(id)
      .then((response) => {
        console.log(response.data.project);
        deletedCallback(response.data.project);
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
      <Card
        className={`mb-2 detail-bg-color ${
          project.concluded === true ? "border-success" : ""
        }`}
      >
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>Prazo: {handleDateFormat(project.deadline)}</Card.Text>
          {project.concluded ? (
            <Button variant="success me-2 mb-1" disabled>
              Concluído
            </Button>
          ) : (
            <Button
              className="button-bg-color me-2 mb-1"
              onClick={() => openProject(project.id)}
            >
              Continuar
            </Button>
          )}
          <EditProject currentProject={project} callback={handleEditProject} />
          <Button
            variant="danger mb-1"
            onClick={() => retrieveTasks(project.id)}
          >
            Deletar
          </Button>
        </Card.Body>
      </Card>
      {alert === true ? (
        <Alert variant="warning" onClose={() => setAlert(false)} dismissible>
          Projeto contém tarefas não finalizadas!
        </Alert>
      ) : (
        ""
      )}
    </>
  );
}

export default ProjectCard;
