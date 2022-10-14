import { Routes, Route, Link, useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectDataService from "./services/ProjectService";
import "./App.css";

import AddProject from "./components/AddProject";
import Project from "./components/Project";
import ProjectsList from "./components/ProjectsList";
import NewProject from "./components/NewProject";
import ListProject from "./components/ListProject";
import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    ProjectDataService.getAll()
      .then((response) => {
        setProjects(response.data.projects);
        console.log(response.data.projects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (id) => {
    ProjectDataService.delete(id)
      .then((response) => {
        console.log(response.data.projects);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(projects);

  return (
    <div>
      <NavBar />
      {/* <NewProject />
      <ListProject projects={projects} deleteProject={deleteProject} /> */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProjectsList />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/add" element={<AddProject />} />
          <Route path="/projects/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
