import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ProjectCard from "./ProjectCard";
import ProjectDataService from "../services/ProjectService";

export default function ListProject() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response) => {
        setProjects(response.data.projects);
        // console.log(response.data.projects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container className="mt-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Container>
  );
}
