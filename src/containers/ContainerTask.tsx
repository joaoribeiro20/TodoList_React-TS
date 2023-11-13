import { FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import {ApiTask} from "../../Api"
import Task from "../components/Task";
import { getAllTasks } from "../services/Get";
import "./StyleContainerTask.scss"

const ContainerTask: FC = () => {
    const [dataTask, setDataTask] = useState<IDataDefaultTask[] | null>(null)

    useEffect(() => {
        
        const fetchData = async () => {
            try {
              // Faz a requisição usando Axios
              const tasks = await getAllTasks();
              console.log(tasks)
              // Atualiza o estado com os dados recebidos
              setDataTask(tasks);
            } catch (error) {
              // Lide com erros aqui
              console.error('Erro ao buscar dados:', error);
            }
          };
      
          // Chama a função de busca de dados
          fetchData();
       /*  const fetchTasks = () => {
            // Poderia ser uma chamada assíncrona para a API aqui
            setDataTask(ApiTask);
          };
      
          fetchTasks(); */
      }, []);



      const handleDelete = (taskId: string) => {
        // Lógica para excluir a tarefa com o ID especificado
        const updatedTasks = dataTask && dataTask.filter((task) => task._id !== taskId);
         setDataTask(updatedTasks); 
        console.log(updatedTasks)
      };
      
    return (
        <>
        <div className="containerToDoListTask">
       {/* - {task.statu ? 'true' : 'false'} */}
       
        {dataTask? dataTask.map(task => (
        <Task _id={task._id} onDelete={() => handleDelete(task._id)} description={task.description} categories={task.categories} statu={task.statu}/>
           )) : <h1>teste</h1>}
         
        </div>
        </>
    )
}
export default ContainerTask