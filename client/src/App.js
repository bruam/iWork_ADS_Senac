import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";
import ListTasks from "./components/ListTasks";
import { useState } from "react";

function App() {
  const [newProject, setNewProject] = useState([]);

  const handleCallback = (newProjectProp) => {
    setNewProject(newProjectProp);
  };

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewProject callback={handleCallback} />
              <ListProjects newProject={newProject} />
            </>
          }
        />
        <Route
          path="/task/:id"
          element={
            <>
              <ListTasks />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
