import TaskInterface from "../Interface/TaskInterface";
// sans le [...task]
/* import { MouseEvent } from "react"; */
/* interface TaskInterfaceProps {
  task: TaskInterface;
  onClickValidate: Function;
} */
const Task = (props: TaskInterface & { onClickValidate: Function, onClickDelete: Function, onOrderIncrease: Function, onOrderDecrease: Function}) => {
  return (
    <section className="d-flex justify-content-between my-4">
      <h2 className={props.done ? "task-done" : ""}>{props.description}</h2>
      <div>
        <button 
          onClick={(event) => {
            props.onClickValidate(event, props.id);
          }}
          className="btn btn-success me-3">{props.done ? "Annuler" : "Valider"}</button>
        <button 
          onClick={(event) => {
            props.onClickDelete(event, props.id);
          }}
        className="btn btn-danger me-3">Supprimer</button>
        <button 
          onClick={(event) => {
            props.onOrderIncrease(event, props.id);
          }}
          className="btn btn-primary me-3">
          ↑
        </button>
        <button 
          onClick={(event) => {
            props.onOrderDecrease(event, props.id);
          }}
          className="btn btn-primary">
          ↓
        </button>
      </div>
    </section>
  );
}

export default Task;