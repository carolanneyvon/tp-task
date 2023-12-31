import './App.css';
import Task from './Task';
import { useState, useEffect } from 'react';
import TaskInterface from '../Interface/TaskInterface';
import Data from '../services/Data';

function App() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    (async () => {
      const loadedTasks: TaskInterface[] = await Data.loadTasks();
      // Modification du state
      setTasks(loadedTasks);
    })();
  }, [])

  // Mettre à jour une tâche
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

// Supprimer une tâches
const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>, task_id: number): void => {
  console.log(`Dans handleClickDelete`, task_id);

  Data.deleteTask(task_id); // Supprimer sur le serveur
  const updatedTasks = tasks.filter(task => task.id !== task_id);
  setTasks(updatedTasks);
};

// Ajouter une tâche
const handleAddTask = (event: React.FormEvent): void=> {
  event.preventDefault();
  // Vérifie si la description de la nouvelle tâche est vide ou contient uniquement des espaces
  if (newTaskDescription.trim() === "") return;

  Data.addTask(newTaskDescription)
    .then(newTask => {
      setTasks([...tasks, newTask]);
      setNewTaskDescription("");
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout de la tâche", error);
    });
};

// WIP pas terminé
const handleOrderIncrease = (event: React.MouseEvent<HTMLButtonElement>, task_id: number): void => {
  console.log(`Dans handleOrderIncrease`, task_id);

  const updatedTasks = [...tasks];
  const currentIndex = updatedTasks.findIndex(task => task.id === task_id);

  if (currentIndex > 0) {
    updatedTasks[currentIndex].order--; // Décrémente l'ordre de la tâche actuelle
    updatedTasks[currentIndex - 1].order++; // Incrémente l'ordre de la tâche précédente
    
    Data.updateTaskOrder(task_id, updatedTasks[currentIndex - 1].order);

    setTasks(updatedTasks);
  }
}

// WIP pas terminé
const handleOrderDecrease = (event: React.MouseEvent<HTMLButtonElement>, task_id: number): void => {
  console.log(`Dans handleOrderDecrease`, task_id);

  const updatedTasks = [...tasks];
  const currentIndex = updatedTasks.findIndex(task => task.id === task_id);

  if (currentIndex < updatedTasks.length - 1) {
    updatedTasks[currentIndex].order++; // Incrémente l'ordre de la tâche actuelle
    updatedTasks[currentIndex + 1].order--; // Décrémente l'ordre de la tâche suivante

    Data.updateTaskOrder(task_id, updatedTasks[currentIndex + 1].order);

  setTasks(updatedTasks);
  }
}

  // Tri des tâches pour afficher les tâches par oredre puis les non terminées en premier
  // sort compare chaque chaque élément du tableau les uns avec les autres
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.done === b.done) {
      return 0; // L'ordre reste inchangé
    }
    return a.done ? 1 : -1; // si =1 la tâche a sera après la b
  });

  // const sortedTasks = [...tasks].sort((a, b) => {
  //   // Triez d'abord par ordre (plus petit en haut)
  //   const orderByComparison = a.order - b.order;
  
  //   if (orderByComparison === 0) {
  //     // Si les ordres sont identiques, triez par done (true en bas)
  //     return a.done ? 1 : -1;
  //   }
  
  //   return orderByComparison;
  // });
  
  return (
    <div className="App container">
      <h1 className='text-center'>Liste des tâches</h1>

      {/* Formulaire d'ajout de tâche */}
      <form onSubmit={handleAddTask} className='text-center'>
        <input
          type="text"
          value={newTaskDescription}
          onChange={(event) => setNewTaskDescription(event.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit" className="btn btn-info ms-3">Ajouter</button>
      </form>

      {sortedTasks.map((task, index) => 
        <Task 
          key={task.id} 
          {...task} 
          onClickValidate={ handleClickValidate} 
          onClickDelete={handleClickDelete}
          onOrderIncrease={handleOrderIncrease}
          onOrderDecrease={handleOrderDecrease}
          />)}
      {/* avant le sort */}
      {/* {tasks.map((task) => <Task key={task.id} {...task} onClickValidate={ handleClickValidate } />)} */}
    </div>
  );
}

export default App;