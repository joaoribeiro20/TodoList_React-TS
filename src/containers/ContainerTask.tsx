import { FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import Task from "../components/Task";
import { getAllTasks } from "../services/Get";

import { useAppContext } from "../hooks/teste"

import { DeleteTask } from "../services/DeleteTask";

import FormsNewToDo from "../components/FormsNewToDo";
import Filters from "../components/Filters";
import "../styles/StyleContainerTask.scss"
import { editiPatch } from "../services/PatchTask";

const ContainerTask: FC = () => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null);
  const [modalCreateToDo, setModalCreateToDo] = useState(false)
  const [teste, setTeste] = useState<IDataDefaultTask | null>(null);;
  const [loading, setLoading] = useState(true);
  const [statusTasks, setStatusTasks] = useState(true);
  const [testea, setTestea] = useState(true)

  const onstatus = async (taskId: string) => {
    const updatedTasks = allTasks && allTasks.find((task) => task._id === taskId);
  
    if (updatedTasks?.categories && updatedTasks.description) {
      await editiPatch({
        description: updatedTasks?.description || "",
        categories: updatedTasks?.categories || "",
        statu: !updatedTasks?.statu,
      }, updatedTasks?._id || '');
  
      // Use the functional form to update statusTasks
      setStatusTasks(prevStatus => !prevStatus);
  
      vizualizacao();
    }
  };
  /* 

     Chamada para api, get 

  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setFilteredTasks(tasks);
        console.log(tasks)
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
      _id: taskId,
      description: updatedTasks?.description || '',
      categories: updatedTasks?.categories || '',
      statu: updatedTasks?.statu || true
    })
  };


  function vizualizacao() {
    console.log("modalCreateToDo")
    setModalCreateToDo(true)
    setModalCreateToDo(!modalCreateToDo)
    setTestea(!testea)
    testesla()
  }

  function testesla() {
    setTestea(true)
  }

  /*    <div className="DivMain">
              <h2>{count}</h2>
              <p>{name.nome}</p>
              <button onClick={()=>{
                setCount(count + 1)
              }}>incemento</button> */

  /*  const { count, setCount, name, setName } = useAppContext() */
  return (
    <>

      {
        modalCreateToDo && (
          <div>
            {teste ?
              <FormsNewToDo id={teste._id || ''} options="editTask" statu={teste.statu} description={teste.description} categories={teste.categories} sai={vizualizacao} />
              : <p></p>}</div>
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
        ) : <h2>errro</h2>
      }

    </>
  );
};

export default ContainerTask;