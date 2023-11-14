import { ChangeEvent, FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import Task from "../components/Task";
import { getAllTasks } from "../services/Get";
import "./StyleContainerTask.scss"
import { DeleteTask } from "../services/DeleteTask";

import { BsFunnelFill } from "react-icons/bs";

const ContainerTask: FC = () => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getAllTasks();
        setAllTasks(tasks);
        setFilteredTasks(tasks); // Inicialmente, mostra todas as tarefas
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (taskId: string) => {
    const updatedTasks = allTasks && allTasks.filter((task) => task._id !== taskId);
    setAllTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Atualiza as tarefas filtradas após a exclusão
    DeleteTask(taskId);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filtra as tarefas com base no valor digitado
    const filtered = allTasks && allTasks.filter((task) => task.description.includes(value));
    setFilteredTasks(filtered);
  };

  
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Filtra as tarefas com base na descrição e categoria
    const filtered = allTasks && allTasks.filter((task) => {
      const descriptionMatch = task.description.includes(inputValue);
      const categoryMatch = category === '' || task.categories === category;
      return descriptionMatch && categoryMatch;
    });

    setFilteredTasks(filtered);
  };

  return (
    <>
      <div className="componentToDoListSesrch">
        <input className="inputPesquisa" type="text" value={inputValue} onChange={handleInputChange} placeholder="Pesquise suas tarefas aqui"/>
      </div>
      <div className="componentToDoListFilter">
        <select name="categoria" id="categoria" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Categoria</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="person">Person</option>
        </select>
      </div>
      {filteredTasks ? (
        filteredTasks.map(task => (
          <Task key={task._id} _id={task._id} onDelete={() => handleDelete(task._id)} description={task.description} categories={task.categories} statu={task.statu} />
        ))
      ) : (
        <h1>Nehuma Tarefa Encontrada</h1>
      )}
    </>
  );
};

export default ContainerTask;