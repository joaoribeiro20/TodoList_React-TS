import { ChangeEvent, FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import Task from "../components/Task";
import { getAllTasks } from "../services/Get";
import "./StyleContainerTask.scss";
import { DeleteTask } from "../services/DeleteTask";

import FormsNewToDo from "../components/FormsNewToDo";

const ContainerTask: FC = () => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

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
  }, []);

  const handleDelete = (taskId: string) => {
    const updatedTasks = allTasks && allTasks.filter((task) => task._id !== taskId);
    setAllTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    DeleteTask(taskId);
  };

  const [modalCreateToDo, setModalCreateToDo] = useState(false)
  const [teste, setTeste] = useState({
    id:'',
    description: '',
    categories: '',
    statu: false
  });

  const handleEdit = (taskId: string) => {
    setModalCreateToDo(true)
    const updatedTasks =  allTasks && allTasks.find((task) => task._id === taskId);
    console.log(updatedTasks?.description)
    
      setTeste({
        id:taskId,
        description: updatedTasks?.description || '',
        categories: updatedTasks?.categories || '',
        statu: updatedTasks?.statu || false
      })   
  };


  function vizualização() {
    setModalCreateToDo(!modalCreateToDo)
}




  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = allTasks && allTasks.filter((task) => task.description.includes(value));
    setFilteredTasks(filtered);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    const filtered = allTasks && allTasks.filter((task) => {
      const descriptionMatch = task.description.includes(inputValue);
      const categoryMatch = category === '' || task.categories === category;
      return descriptionMatch && categoryMatch;
    });

    setFilteredTasks(filtered);
  };




  return (
    <>
      {
        modalCreateToDo && (
          <div>
            <FormsNewToDo id={teste.id} options="editTask" statu={teste.statu} description={teste.description} categories={teste.categories} sai={vizualização} />
          </div>
        )
      }


      <div className="componentToDoListSesrch">
        <input className="inputPesquisa" type="text" value={inputValue} onChange={handleInputChange} placeholder="Pesquise suas tarefas aqui" />
      </div>
      <div className="componentToDoListFilter">
        <select name="categoria" id="categoria" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categoria</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="person">Person</option>
        </select>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : filteredTasks && filteredTasks.length ? (
        filteredTasks.map(task => (
          <Task key={task._id} _id={task._id} onedit={() => handleEdit(task._id || '')} onDelete={() => handleDelete(task._id)} description={task.description} categories={task.categories} statu={task.statu} />
        ))
      ) : (
        <h1>Nenhuma Tarefa Encontrada</h1>
      )}
    </>
  );
};

export default ContainerTask;