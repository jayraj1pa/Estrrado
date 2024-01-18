import React from 'react';

var savedTasks = localStorage.getItem("tasks");
if (savedTasks === null) {
  savedTasks = [];
} else {
  savedTasks = JSON.parse(savedTasks);
}

const initialState = {
  tasks: savedTasks,
};

export const TaskContext = React.createContext();

function taskReducer(state, action) {
  var updatedTasks;
  switch (action.type) {
    case "ADD_TASK":
      updatedTasks = state.tasks.concat([{...action.payload, priority: 'low'}]);
      break;
    case "REMOVE_TASK":
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      break;
    case "TOGGLE_TASK":
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      break;
    case "CHANGE_PRIORITY":
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, priority: action.payload.priority }
          : task
      );
      break;
    default:
      throw new Error("Unknown action type: " + action.type);
  }
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  return { tasks: updatedTasks };
}

export function TaskProvider({ children }) {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return React.useContext(TaskContext);
}
