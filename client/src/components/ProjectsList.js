import React, { useState, useEffect } from "react";
import ProjectDataService from "../services/ProjectService";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveProject = (Project, index) => {
    setCurrentProject(Project);
    setCurrentIndex(index);
  };
  console.log(projects);
  return (
    <div className="list col">
      <div className="col-md-6 mt-5">
        <h4>Projetos</h4>

        <ul className="list-group">
          {projects.projects &&
            projects.projects.map((project, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProject(project, index)}
                key={index}
              >
                {project.title}
              </li>
            ))}
        </ul>
      </div>

      <div className="col-md-6 mt-5">
        {currentProject ? (
          <div>
            <h4>Projeto</h4>
            <div>
              <label>
                <strong>Título:</strong>
              </label>{" "}
              {currentProject.title}
            </div>
            <div>
              <label>
                <strong>Prazo:</strong>
              </label>{" "}
              {currentProject.deadline}
            </div>

            <Link
              to={"/Projects/" + currentProject.id}
              className="badge badge-warning"
            >
              Atualizar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Escolha um projeto...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
