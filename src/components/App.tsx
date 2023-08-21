import './App.css';
import Task from './Task';
import { useState, useEffect } from 'react';
import TaskInterface from '../Interface/TaskInterface';
import Data from '../services/Data';

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  useEffect(() => {
    (async () => {
      const loadedTasks: TaskInterface[] = await Data.loadTasks();
      // Modification du state
      setTasks(loadedTasks);
    })();
  }, [])

  const handleClickValidate = (event: React.MouseEvent<HTMLButtonElement>, task_id: number): void => {
    console.log(`Dans handleClickValidate`, task_id);

    const updatedTasks = tasks.map(task => {
      if (task.id === task_id) {
        task.done = !task.done;
      Data.updateTask(task_id, task.done); 
    }
    return task;
  });

  setTasks(updatedTasks);
}
  
  return (
    <div className="App container">
      <h1>Liste des tâches</h1>
      {tasks.map((task) => <Task key={task.id} {...task} onClickValidate={ handleClickValidate } />)}
    </div>
  );
}

export default App;