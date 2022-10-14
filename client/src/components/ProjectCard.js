import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import NewProject from "./NewProject";
import ProjectDataService from "../services/ProjectService";

function ProjectCard({ project, deleteProject, updateProject }) {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };

  const [currentProject, setCurrentProject] = useState(initialTutorialState);

  // useEffect(() => {
  //   if (project.id) getProject(project.id);
  // }, [project.id]);

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setCurrentProject(response.data.projects);
        console.log(response.data.projects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>Prazo: {project.deadline}</Card.Text>
        {/* <Button variant="outline-success" onClick={openProject()}>
          Continuar
        </Button> */}
        {/* <Button variant="outline-warning" onClick={updateProject(project.id)}>
          Editar
        </Button> */}
        <NewProject id={project.id} />
        <Button variant="outline-danger" onClick={deleteProject(project.id)}>
          Deletar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
