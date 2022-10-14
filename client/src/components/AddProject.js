import React, { useState } from "react";
import ProjectDataService from "../services/ProjectService";

const AddProject = () => {
  const initialProjectState = {
    id: null,
    title: "",
    deadline: "",
  };
  const [project, setProject] = useState(initialProjectState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const saveProject = () => {
    var data = {
      title: project.title,
      deadline: project.deadline,
    };

    ProjectDataService.create(data)
      .then((response) => {
        setProject({
          id: response.data.id,
          title: response.data.title,
          deadline: response.data.deadline,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
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
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newProject}>
            Add
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
            <label htmlFor="deadline">Prazo estimado</label>
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
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProject;
