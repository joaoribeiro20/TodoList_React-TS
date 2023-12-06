import { FC, useEffect, useState } from "react";
import { useAppContext } from "../hooks/InfoUser";
import { GetUserId } from "../services/users/GetUserId";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import Task from "../components/Task";
import Filters from "../components/Filters";
import { Delete } from "../interfaces/DeleteTask";
import { editTask } from "../interfaces/EditTask";

const ContainerTask: FC = () => {
  const { data, setData } = useAppContext();
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>([]);
  const [updatePage, setUpadatePage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.email == '') {
          const valorArmazenado = localStorage.getItem('dadosUser');
          console.log(`valor recuperado ${valorArmazenado}`)
          if (valorArmazenado) {
            console.log("useEffect1")
            const userData = await GetUserId(valorArmazenado);
            setData(userData);
            setAllTasks(userData.tasks)

          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };
    if (data.email != '') {
      setAllTasks(data.tasks)
    }
    fetchData();

  }, [data, setData]);


  useEffect(() => {
    const fetchDate = async () => {
      try {
        console.log("useEffect2")
        const valorArmazenado = localStorage.getItem('dadosUser');
        if (valorArmazenado) {
          const userData = await GetUserId(valorArmazenado);
          setData(userData);
          setAllTasks(userData.tasks)
        }
      }
      catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    fetchDate();
  }, [updatePage, setUpadatePage])

  const onstatus = async (taskId: string) => {

  }
  const handleDelete = (taskId: string) => {
    allTasks && setAllTasks(Delete(taskId, allTasks))
    const myTimeout = setTimeout(() => { setUpadatePage(2) }, 5000);
  }
  const handleEdit = (taskId: string) => {

  }

  return (
    <>
      <Filters idUserCreateTask={data.id ? data.id : ""} setUpadatePage={setUpadatePage} allTasks={data.tasks} setFilteredTasks={setAllTasks!} />
      {allTasks ?
        allTasks.map(task =>
          <Task
            setUpadatePage={setUpadatePage}
            onstatus={() => onstatus(task.id || '')}
            key={task.id} id={task.id}
            onedit={() => handleEdit(task.id || '')}
            onDelete={() => handleDelete(task.id || '')}
            title={task.title}
            description={task.description}
            categories={task.categories}
            authorId={task.authorId}
            statu={task.statu} />)
        : 'Carregando...'}
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
    const updatedTasks = allTasks && allTasks.find((task) => task.id === taskId);

    if (updatedTasks?.categories && updatedTasks.description) {
      await editiPatch({
        description: updatedTasks?.description || "",
        categories: updatedTasks?.categories || "",
        statu: !updatedTasks?.statu,
      }, updatedTasks?.id || '');


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
    const updatedTasks = allTasks && allTasks.filter((task) => task.id !== taskId);
    setAllTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    DeleteTask(taskId);
  };

    setModalCreateToDo(true);
    const updatedTasks = allTasks && allTasks.find((task) => task.id === taskId);
    setDateUpdate({
      id: taskId,
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
              id={dateUpdate.id || ''}
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
                onstatus={() => onstatus(task.id || '')}
                key={task.id} id={task.id}
                onedit={() => handleEdit(task.id || '')}
                onDelete={() => handleDelete(task.id || '')}
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