import { FC, useEffect, useState } from "react";
import { useAppContext } from "../hooks/InfoUser";
import { GetUserId } from "../services/users/GetUserId";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import Task from "../components/Task";
import Filters from "../components/Filters";
import { Delete } from "../interfaces/DeleteTask";
import { editTask } from "../interfaces/EditTask";
import { IDataUser } from "../interfaces/IDataUser";
import { set } from "date-fns";

const ContainerTask: FC = () => {
  const { data, setData, updateP, setUpdateP } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.email == '') {
          const valorArmazenado = localStorage.getItem('dadosUser');
          console.log(`valor recuperado ${valorArmazenado}`)
          if (valorArmazenado) {
            console.log("useEffect1")
            /*  allTasks && setAllTasks(awaitGetUserId(valorArmazenado)) */
            setUpdateP([])
            const userData = await GetUserId(valorArmazenado);
            if(userData != null) {
               setData(userData!);
            setUpdateP(userData.tasks!)
            console.log(userData)
            }else{
              console.log('null')
            }
           
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    if (data.email != '') {
      setUpdateP(data.tasks)
    }
    fetchData();
  }, [data, setData]);

  const handleDelete = (taskId: string) => {
    updateP && setUpdateP(Delete(taskId, updateP))
  }
  const handleEdit = (taskId: string) => {}
  const onstatus = async (taskId: string) => {}


  return (
    <>
      <Filters
        idUserCreateTask={data.id ? data.id : ""} 
       
      />
      {updateP ?
        updateP.map(task =>
          <Task
            onstatus={() => onstatus(task.id || '')}
            key={task.id}
            tasks={task}
            onedit={() => handleEdit(task.id || '')}
            onDelete={() => handleDelete(task.id || '')}
          />)
        : 'Carregando...'}
    </>
  );
};

export default ContainerTask;