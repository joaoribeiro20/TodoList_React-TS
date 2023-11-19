import { FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import Task from "../components/Task";
import { getAllTasks } from "../services/Get";

import { DeleteTask } from "../services/DeleteTask";

import FormsNewToDo from "../components/FormsNewToDo";
import Filters from "../components/Filters";
import "../styles/StyleContainerTask.scss"

const ContainerTask: FC = () => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null);
  const [modalCreateToDo, setModalCreateToDo] = useState(false)
  const [teste, setTeste] = useState({
    id: '',
    description: '',
    categories: '',
    statu: false
  });
  const [loading, setLoading] = useState(true);



  /* 
  
  
        Chamada para api, get 
  
  
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setFilteredTasks(tasks);
        console.log(modalCreateToDo)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setInterval
        setLoading(false);
      }
    };
    fetchData();
  }, [modalCreateToDo]);


  /* 
  
  
        Função de Deletar
  
  
  */

  const handleDelete = (taskId: string) => {
    const updatedTasks = allTasks && allTasks.filter((task) => task._id !== taskId);
    setAllTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    DeleteTask(taskId);
  };

  /* 
  
  
        Função de editar 
  
  
  */



  const handleEdit = (taskId: string) => {
    setModalCreateToDo(true)
    const updatedTasks = allTasks && allTasks.find((task) => task._id === taskId);
    console.log(updatedTasks?.description)
    setTeste({
      id: taskId,
      description: updatedTasks?.description || '',
      categories: updatedTasks?.categories || '',
      statu: updatedTasks?.statu || false
    })
  };
  
  const [testea, setTestea] = useState(true)
  function vizualizacao() {
    console.log("modalCreateToDo")
    setModalCreateToDo(!modalCreateToDo)
    setTestea(!testea)
    testesla()
  }

  function testesla(){
    setTestea(true)
  }

  


  return (
    <>
      {
        modalCreateToDo && (
          <div>
            <FormsNewToDo id={teste.id} options="editTask" statu={teste.statu} description={teste.description} categories={teste.categories} sai={vizualizacao} />
          </div>
        )
      }
      {
        testea ? (

          <div className="DivMain">
            <Filters vis={vizualizacao} allTasks={allTasks} setFilteredTasks={setFilteredTasks} />
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
              </div>
            ) : filteredTasks && filteredTasks.length ? (
              filteredTasks.map(task => (
                <Task key={task._id} _id={task._id} onedit={() => handleEdit(task._id || '')} onDelete={() => handleDelete(task._id || '')} description={task.description} categories={task.categories} statu={task.statu} />
              ))
            ) : (
              <h1>Nenhuma Tarefa Encontrada</h1>
            )}
          </div>
        ) : <h2>errro</h2>
      }

    </>
  );
};

export default ContainerTask;