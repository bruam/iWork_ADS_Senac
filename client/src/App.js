import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";
import ListTasks from "./components/ListTasks";
import { useEffect, useState } from "react";
import MaxScoreDataService from "./services/MaxScoreService";

function App() {
  const [newProject, setNewProject] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [concluded, setConcluded] = useState(false);
  const [concludedProject, setConcludedProject] = useState(false);
  useEffect(() => {
    retrieveMaxScore();
  }, [concluded, concludedProject]);

  const retrieveMaxScore = () => {
    MaxScoreDataService.getAll()
      .then((response) => {
        setMaxScore(response.data.maxScores);
        console.log(response.data.maxScores);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCallback = (newProjectProp) => {
    setNewProject(newProjectProp);
  };

  const handleConcludedCallback = (concludedTaskProp) => {
    setConcluded(concludedTaskProp);
  };

  const handleConcludedProjectCallback = (concludedProjectProp) => {
    setConcludedProject(concludedProjectProp);
  };

  return (
    <div className="primary-bg-color" style={{ height: "1000px" }}>
      {/* Evita que componente seja renderizado sem conteúdo no state */}
      {maxScore && (
        <NavBar
          maxScore={maxScore[0]}
          concluded={concluded}
          concludedProject={concludedProject}
        />
      )}
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
              <ListTasks
                maxScore={maxScore[0]}
                concludedCallback={handleConcludedCallback}
                concludedProjectCallback={handleConcludedProjectCallback}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
