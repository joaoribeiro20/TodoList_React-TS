import { FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import {ApiTask} from "../../Api"
import Task from "../components/Task";

const ContainerTask: FC = () => {
    const [dataTask, setDataTask] = useState<IDataDefaultTask[] | null>(null)

    useEffect(() => {
        const fetchTasks = () => {
            // Poderia ser uma chamada assíncrona para a API aqui
            setDataTask(ApiTask);
          };
      
          fetchTasks();
      }, []);
    return (
        <>
        <div className="componentToDoListTask">
       {/* - {task.statu ? 'true' : 'false'} */}
       
        {dataTask? dataTask.map(task => (
        <Task id={task.id} text={task.text} categories={task.categories} statu={task.statu}/>
           )) : <h1>teste</h1>}
         
        </div>
        </>
    )
}
export default ContainerTask