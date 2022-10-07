import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ProjectDataService from "../services/ProjectService";
import Moment from 'moment';

const Tutorial = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialProjectState = {
    id: null,
    title: "",
    deadline: null
  };
  const [currentProject, setCurrentProject] = useState(initialProjectState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    ProjectDataService.get(id)
      .then(response => {
        setCurrentProject(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  // const updatePublished = status => {
  //   var data = {
  //     id: currentProject.id,
  //     title: currentProject.title,
  //     description: currentProject.description,
  //     published: status
  //   };

  //   ProjectDataService.update(currentProject.id, data)
  //     .then(response => {
  //       setCurrentProject({ ...currentProject, published: status });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const updateProject = () => {
    ProjectDataService.update(currentProject.id, currentProject)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProject = () => {
    ProjectDataService.delete(currentProject.id)
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");
      })
      .catch(e => {
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
                value={Moment(currentProject.deadline).format('DD/MM/YYYY')}
                onChange={handleInputChange}
                
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteProject}>
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
          <p>Por favor selecione um projeto...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;