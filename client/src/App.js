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

  useEffect(() => {
    retrieveMaxScore();
  }, []);

  const retrieveMaxScore = () => {
    MaxScoreDataService.getAll()
      .then((response) => {
        setMaxScore(response.data.maxScores);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCallback = (newProjectProp) => {
    setNewProject(newProjectProp);
  };

  return (
    <div>
      {/* Evita que componente seja renderizado sem conteúdo no state */}
      {maxScore && <NavBar maxScore={maxScore[0]} />}
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
              <ListTasks maxScore={maxScore[0]} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
