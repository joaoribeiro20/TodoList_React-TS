import { DeleteTask } from "../services/tasks/DeleteTask";
import { IDataDefaultTask } from "./IDataDefaultTask";


export const Delete = (taskId: string, allTasks:IDataDefaultTask[]) => {
    console.log(taskId)
    const updatedTasks = allTasks && allTasks.filter((task) => task.id !== taskId);
    DeleteTask(taskId);
    return updatedTasks
  };