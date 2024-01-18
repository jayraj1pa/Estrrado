import React from 'react';
import { useTaskContext } from './TaskContext';

const AddTaskForm = () => {
  const taskContext = useTaskContext();
  const [taskTitle, setTaskTitle] = React.useState('');

  const addTaskToTaskList = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };
      taskContext.dispatch({ type: 'ADD_TASK', payload: newTask });
      setTaskTitle('');
    }
  };

  const updateTaskTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={updateTaskTitle}
      />
      <button onClick={addTaskToTaskList}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
