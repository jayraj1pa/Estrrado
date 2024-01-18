import React, { useState } from 'react';
import { useTaskContext } from './TaskContext';
import './TaskList.css'

const TaskList = () => {
  const taskContext = useTaskContext();
  const [taskFilter, setTaskFilter] = useState('all');

  const removeTask = (taskId) => {
    taskContext.dispatch({ type: 'REMOVE_TASK', payload: taskId });
  };

  const toggleTaskCompletion = (taskId) => {
    taskContext.dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const changeTaskPriority = (taskId, event) => {
    taskContext.dispatch({ type: 'CHANGE_PRIORITY', payload: { id: taskId, priority: event.target.value } });
  };

  const tasksToShow = taskContext.state.tasks.filter((task) => {
    return taskFilter === 'all' || (taskFilter === 'completed' ? task.completed : !task.completed);
  });

  return (
    <div className="task-list">
      <div className="filter-buttons">
        <button onClick={() => setTaskFilter('all')}>All</button>
        <button onClick={() => setTaskFilter('completed')}>Completed</button>
        <button onClick={() => setTaskFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {tasksToShow.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.title}</span>
            <span>Priority: {task.priority}</span>
            <div className="task-buttons">
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button className='me-3' onClick={() => removeTask(task.id)}>Remove</button>
              {!task.completed && (
                <select className="priority-dropdown" value={task.priority} onChange={(event) => changeTaskPriority(task.id, event)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
