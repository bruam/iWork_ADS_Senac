import React from "react";
import ProjectCard from "./ProjectCard";

export default function ListProject({ projects, deleteProject }) {
  console.log(projects);
  return (
    <div className="mt-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          deleteProject={deleteProject}
          project={project}
        />
      ))}
    </div>
  );
}
