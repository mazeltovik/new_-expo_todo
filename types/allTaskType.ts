import { TaskType } from './activeTackType';

export type AllTask = {
  activeTask: TaskType[];
  doneTask: TaskType[];
};