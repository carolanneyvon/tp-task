import TaskInterface from "../Interface/TaskInterface";
export default class Data {
  static url:string = "http://localhost:3001/tasks";

  /**
   * Récupère les tâches via l'appel de l'api de json-server en utilisant
   * le verbe "GET"
   * @returns Promise<TaskInterface[]>
   */
  static async loadTasks():Promise<TaskInterface[]> {
    // Pour rappel, fetch renvoie une promesse
    return fetch(this.url)
    .then(response => {
      return response.json();
    })
    .then(tasks => {
      return tasks;
    })
    .catch(error => {
      console.error("Erreur attrapée dans loadTasks", error)
    })
  }

  // Mettre à jour une tâche
  /**
   * Modifie la valeur de la propriété "done" via l'appel de l'api de json-server 
   * en utilisant  le verbe "PATCH"
   * @returns Promise<any>
   */
  static async updateTask(task_id: number, done:boolean): Promise<any> {
      return fetch(this.url + "/" + task_id, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({done}),
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .then((tasks) => {
        return tasks;
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le updateTask : `, error);
      })
  }

  // Supprimer une tâche
  /**
   * Supprime une tâche via l'appel de l'api de json-server 
   * en utilisant  le verbe "DELETE"
   * @returns Promise<any>
   */
  static async deleteTask(task_id: number): Promise<void> {
      return fetch(this.url + "/" + task_id, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "DELETE",
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .then((tasks) => {
        return tasks;
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le updateTask : `, error);
      })
  }

  // Ajouter une tâche
  static async addTask(description: string): Promise<TaskInterface> {
    // Pour avoir l'order de la nouvelle tâche
    // Charge les tâches existantes grâce à la méthode loadTasks
    const tasks: TaskInterface[] = await this.loadTasks(); 
    // La méthode reduc permet de déterminer la valeur maximale de la propriété order
    // A chaque tâche la valeure max est comparé à la valeur en cours ou à 0, le compteur est initialisé à 0
    const maxOrder = tasks.reduce((max, task) => Math.max(max, task.order || 0), 0);
    // Pour calculer le nouvel ordre
    const newTaskOrder = maxOrder + 1;

    return fetch(this.url, 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ description, done: false, order: newTaskOrder}), // Nouvelle tâche non validée
      })
      .then(response => {
        console.log(`Response status : `, response.status);
        return response.json();
      })
      .catch(error => {
        console.error(`Erreur attrapée dans le addTask : `, error);
      })
  }

  // Change l'ordre des tâches WIP
static async updateTaskOrder(task_id: number, new_order: number): Promise<any> {
  return fetch(this.url + "/" + task_id, 
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PATCH",
    body: JSON.stringify({ order: new_order }),
  })
  .then(response => {
    console.log(`Response status: `, response.status);
    return response.json();
  })
  .then((tasks) => {
    return tasks;
  })
  .catch(error => {
    console.error(`Erreur attrapée dans l'updateTaskOrder : `, error);
  });
}
  
}