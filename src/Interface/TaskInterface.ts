export default interface TaskInterface {
  id: number;
  description: string;
  done: boolean;
  order?: number;
}
