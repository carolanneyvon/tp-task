import TaskInterface from "../Interface/TaskInterface";
// sans le [...task]
/* import { MouseEvent } from "react"; */
/* interface TaskInterfaceProps {
  task: TaskInterface;
  onClickValidate: Function;
} */
const Task = (props: TaskInterface & { onClickValidate: Function}) => {
  return (
    <section className="d-flex justify-content-between my-4">
      <h2 className={props.done ? "task-done" : ""}>{props.description}</h2>
      <div>
        <button 
          onClick={(event) => {
            props.onClickValidate(event, props.id);
          }}
          className="btn btn-success me-3">{props.done ? "Annuler" : "Valider"}</button>
        <button className="btn btn-danger me-3">Supprimer</button>
      </div>
    </section>
  );
}

export default Task;