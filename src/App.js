import React from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";
import { TaskProvider } from "./TaskContext";
import "./App.css";

const App = () => {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>Todo List App</h1>
        <AddTaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
