import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import ProjectCard from "./ProjectCard";
import ProjectDataService from "../services/ProjectService";

export default function ListProject({ newProject }) {
  const [projects, setProjects] = useState([]);
  const [deletedProject, setDeletedProject] = useState([]);
  const [editedProject, setEditedProject] = useState([]);

  useEffect(() => {
    retrieveProjects();
  }, []);

  useEffect(() => {
    retrieveProjects();
  }, [newProject, deletedProject, editedProject]);

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

  const handleDeletedCallback = (deletedProjectProp) => {
    setDeletedProject(deletedProjectProp);
  };

  const handleEditedCallback = (editedProjectProp) => {
    setEditedProject(editedProjectProp);
  };

  return (
    <Container className="mt-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          deletedCallback={handleDeletedCallback}
          editedCallback={handleEditedCallback}
        />
      ))}
    </Container>
  );
}
