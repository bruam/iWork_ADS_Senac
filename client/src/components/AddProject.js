import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AddProject = () => {
  const initialProjectState = {
    id: null,
    title: "",
    deadline: null
  };
  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline
    };

    ProjectDataService.create(data)
      .then(response => {
        setProject({
          id: response.data.id,
          title: response.data.title,
          deadline: response.data.deadline
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProject = () => {
    setProject(initialProjectState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Projeto criado com sucesso!</h4>
          <button className="btn btn-success" onClick={newProject}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={project.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Prazo</label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              required
              value={project.deadline}
              onChange={handleInputChange}
              name="deadline"
            />
          </div>

          <button onClick={saveProject} className="btn btn-success">
            Criar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProject;