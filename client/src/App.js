import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import NewProject from "./components/NewProject";
import ListProjects from "./components/ListProjects";
import ListTasks from "./components/ListTasks";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewProject />
              <ListProjects />
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
