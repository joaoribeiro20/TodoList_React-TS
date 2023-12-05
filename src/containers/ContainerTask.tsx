import React, { FC, useEffect } from "react";
import { useAppContext } from "../hooks/InfoUser";
import { GetUserId } from "../services/GetUserId";

const ContainerTask: FC = () => {
  const { data, setData } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data) {
          const valorArmazenado = localStorage.getItem('dadosUser');

          if (valorArmazenado) {
            const userData = await GetUserId(valorArmazenado);
            setData(userData);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        // Adicione tratamento de erro conforme necessário
      }
    };

    fetchData();
  }, [data, setData]);

  console.log(data);

  return (
    <>
      <p>{data ? data.id : 'Carregando...'}</p>
    </>
  );
};

export default ContainerTask;





















































































































/* import { FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import Task from "../components/Task";
import { getAllTasks } from "../services/Get";


import { DeleteTask } from "../services/DeleteTask";

import FormsNewToDo from "../components/FormsNewToDo";
import Filters from "../components/Filters";
import "../styles/tasks/StyleContainerTask.scss"
import { editiPatch } from "../services/PatchTask";

const ContainerTask: FC = () => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null);

  const [atulizarTasks, setAtulizarTasks] = useState(true);
  const [modalCreateToDo, setModalCreateToDo] = useState(false)
  const [dateUpdate, setDateUpdate] = useState<IDataDefaultTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusTasks, setStatusTasks] = useState(true);
  const [teste2, setTeste2] = useState(true);
 

  const onstatus = async (taskId: string) => {
    const updatedTasks = allTasks && allTasks.find((task) => task._id === taskId);

    if (updatedTasks?.categories && updatedTasks.description) {
      await editiPatch({
        description: updatedTasks?.description || "",
        categories: updatedTasks?.categories || "",
        statu: !updatedTasks?.statu,
      }, updatedTasks?._id || '');


      setStatusTasks(prevStatus => !prevStatus);


    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setFilteredTasks(tasks);
        setAtulizarTasks(true)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setInterval
        setLoading(false);
      }
    };
    fetchData();
  }, [atulizarTasks]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setFilteredTasks(tasks);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setInterval
        setLoading(false);
      }
    };
    fetchData();
  }, [statusTasks]);


  const handleDelete = (taskId: string) => {
    const updatedTasks = allTasks && allTasks.filter((task) => task._id !== taskId);
    setAllTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    DeleteTask(taskId);
  };


  const handleEdit = (taskId: string) => {
    setModalCreateToDo(true);
    const updatedTasks = allTasks && allTasks.find((task) => task._id === taskId);
    setDateUpdate({
      _id: taskId,
      description: updatedTasks?.description || '',
      categories: updatedTasks?.categories || '',
      date: updatedTasks?.date || '',
      statu: updatedTasks?.statu || true
    });
    
  };


  function vizualizacao() {
    setModalCreateToDo(false);
    setAtulizarTasks(false)
  }
 */

/*    <div className="DivMain">
            <h2>{count}</h2>
            <p>{name.nome}</p>
            <button onClick={()=>{
              setCount(count + 1)
            }}>incemento</button> */

/*  const { count, setCount, name, setName } = useAppContext() */
/* return (
  <>

    {
      modalCreateToDo && (
        <div>
          {dateUpdate && (
            <FormsNewToDo
              id={dateUpdate._id || ''}
              options="editTask"
              statu={dateUpdate.statu}
              description={dateUpdate.description}
              categories={dateUpdate.categories}
              date={dateUpdate.date}
              statusModalVisivel={vizualizacao}
            />
          )}
        </div>
      )
    }
    
    
        <div className="DivMain">
          <Filters statusModalVisivel={vizualizacao} allTasks={allTasks} setFilteredTasks={setFilteredTasks} />
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : filteredTasks && filteredTasks.length ? (
            filteredTasks.map(task => (
              <Task
                onstatus={() => onstatus(task._id || '')}
                key={task._id} _id={task._id}
                onedit={() => handleEdit(task._id || '')}
                onDelete={() => handleDelete(task._id || '')}
                description={task.description}
                categories={task.categories}
                date={task.date}
                statu={task.statu} />
            ))
          ) : (
            <h1>Nenhuma Tarefa Encontrada</h1>
          )}
        </div>
      
    

  </>
);
};

export default ContainerTask; */