import TaskInterface from "../Interface/TaskInterface";
export default class Data {
  static url:string = "http://localhost:3001/tasks";

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
      .catch(error => {
        console.error(`Erreur attrapée dans le updateTask : `, error);
      })
  }
  
  
}