import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import ProjectService from "../services/ProjectService";
import TaskDataService from "../services/TaskService";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";

export default function ListTasks() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [newTask, setNewTask] = useState([]);
  const [editedTask, setEditedTask] = useState([]);
  const [deletedTask, setDeletedTask] = useState([]);

  useEffect(() => {
    handleProjectName(id);
    retrieveTasks(id);
  }, [id, newTask, editedTask, deletedTask]);

  const retrieveTasks = (id) => {
    TaskDataService.getAllFromProject(id)
      .then((response) => {
        setTasks(response.data.tasks);
        // console.log(response.data.tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleProjectName = (id) => {
    ProjectService.get(id)
      .then((response) => {
        console.log(response.data.project.title);
        setProjectName(response.data.project.title);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNewCallback = (newTaskProp) => {
    setNewTask(newTaskProp);
  };

  const handleEditedCallback = (editedTaskProp) => {
    setEditedTask(editedTaskProp);
  };

  const handleDeletedCallback = (deletedTaskProp) => {
    setDeletedTask(deletedTaskProp);
  };

  return (
    <Container className="mt-3">
      <h2 className="mb-5">{projectName}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          editedCallback={handleEditedCallback}
          deletedCallback={handleDeletedCallback}
        />
      ))}
      <NewTask newCallback={handleNewCallback} />
    </Container>
  );
}
