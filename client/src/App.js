import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import NavBarUnlogged from "./components/NavBarUnlogged";
import "./App.css";
import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";
import ListTasks from "./components/ListTasks";
import { useContext, useEffect, useState } from "react";
import MaxScoreDataService from "./services/MaxScoreService";
import NewUser from "./components/NewUser";
import SignIn from "./components/SignIn";
import LogOut from "./components/LogOut";
import { AuthProvider, AuthContext } from "./context/auth";
import { getScores } from "./http-common";

function App() {
  const [newProject, setNewProject] = useState([]);
  const [maxScore, setMaxScore] = useState(0);
  const [concluded, setConcluded] = useState(false);
  const [concludedProject, setConcludedProject] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getScores();
      setMaxScore(response.data.scores);
      console.log(response.data.scores);
      setLoading(false);
    })();
    // retrieveMaxScore();
  }, [concluded, concludedProject]);

  const Private = ({ children }) => {
    // children é o conteúdo do componente sendo protegido
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carrengando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

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

  // if (loading) {
  //   return <div className="loading">Carregando dados...</div>;
  // }

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
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <NavBarUnlogged />
                  <SignIn />
                  <NewUser />
                </>
              }
            />
            <Route
              path="/"
              element={
                <Private>
                  {/* Evita que componente seja renderizado sem conteúdo no state */}
                  {maxScore && (
                    <NavBar
                      maxScore={maxScore[0]}
                      concluded={concluded}
                      concludedProject={concludedProject}
                    />
                  )}
                  <LogOut />
                  <NewProject callback={handleCallback} />
                  <ListProjects newProject={newProject} />
                </Private>
              }
            />
            <Route
              path="/task/:id"
              element={
                <Private>
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
                </Private>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
