import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarUnlogged from "./components/NavBarUnlogged";
import "./App.css";
import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";
import ListTasks from "./components/ListTasks";
import { useEffect, useState } from "react";
import MaxScoreDataService from "./services/MaxScoreService";
import NewUser from "./components/NewUser";
import SignIn from "./components/SignIn";
import Login from "./components/Login";

function App() {
  const [newProject, setNewProject] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [concluded, setConcluded] = useState(false);
  const [concludedProject, setConcludedProject] = useState(false);
  const [token, setToken] = useState([]);

  useEffect(() => {
    retrieveMaxScore();
    console.log(token);
  }, [concluded, concludedProject, token]);

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

  const handleToken = (tokenProps) => {
    console.log(tokenProps);
    setToken(tokenProps);
  };

  return (
    <div className="primary-bg-color" style={{ height: "1000px" }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBarUnlogged />
              <Login callback={handleToken} />
              <NewUser />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {/* Evita que componente seja renderizado sem conteúdo no state */}
              {maxScore && (
                <NavBar
                  maxScore={maxScore[0]}
                  concluded={concluded}
                  concludedProject={concludedProject}
                />
              )}
              <NewProject callback={handleCallback} />
              <ListProjects newProject={newProject} />
            </>
          }
        />
        <Route
          path="/task/:id"
          element={
            <>
              {/* Evita que componente seja renderizado sem conteúdo no state */}
              {maxScore && (
                <NavBar
                  maxScore={maxScore[0]}
                  concluded={concluded}
                  concludedProject={concludedProject}
                />
              )}
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
