import { editiPatch } from "../services/tasks/PatchTask";
import { IDataDefaultTask } from "./IDataDefaultTask";

export const editTask = (taskId: string, allTasks:IDataDefaultTask[]) => {
    const updatedTasks = allTasks && allTasks.find((task) => task.id === taskId);
/*     editiPatch({
      id:updatedTasks?.id,
      title:updatedTasks?.title!,
      description:updatedTasks?.description!,
      categories:updatedTasks?.categories!,
      statu:updatedTasks?.statu!,
      authorId:updatedTasks?.authorId!
    }); */
    return updatedTasks
}