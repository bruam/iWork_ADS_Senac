import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectDataService from "../services/ProjectService";

const Project = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialProjectState = {
    id: null,
    title: "",
    deadline: "",
  };
  const [currentProject, setCurrentProject] = useState(initialProjectState);
  const [message, setMessage] = useState("");

  const getProject = (id) => {
    ProjectDataService.get(id)
      .then((response) => {
        setCurrentProject(response.data.project);
        console.log(response.data.project);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getProject(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const updateProject = () => {
    ProjectDataService.update(currentProject.id, currentProject)
      .then((response) => {
        console.log(response.data.project);
        setMessage("The Project was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = () => {
    ProjectDataService.delete(currentProject.id)
      .then((response) => {
        console.log(response.data.project);
        navigate("/projects");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProject ? (
        <div className="edit-form">
          <h4>Projeto</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentProject.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Prazo</label>
              <input
                type="date"
                className="form-control"
                id="deadline"
                name="deadline"
                value={currentProject.deadline}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger me-2" onClick={deleteProject}>
            Deletar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProject}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Project...</p>
        </div>
      )}
    </div>
  );
};

export default Project;
