import { TaskType } from './activeTackType';
export type CreateTask = {
  activeTask: TaskType[];
  setActiveTask: React.Dispatch<React.SetStateAction<TaskType[]>>;
};