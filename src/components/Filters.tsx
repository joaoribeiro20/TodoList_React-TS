import { ChangeEvent, FC, useState } from "react"
import { BsFunnelFill } from "react-icons/bs"
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import FormsNewToDo from "./FormsNewToDo";

import "../styles/StyleFormsDinamic.scss"
import "../styles/Filters.scss"


interface FiltersProps {
  allTasks: IDataDefaultTask[] | null;
  setFilteredTasks: React.Dispatch<React.SetStateAction<IDataDefaultTask[] | null>>;
}

const Filters: FC<FiltersProps> = ({ allTasks, setFilteredTasks }) => {
  /* const [filteredTasks, setFilteredTasks] = useState<IDataDefaultTask[] | null>(null); */
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');



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

  const [modalCreateToDo, setModalCreateToDo] = useState(false)

  function vizualização() {
    setModalCreateToDo(!modalCreateToDo)
  }

  return (
    <>
      {
        modalCreateToDo && (
          <div>
            <FormsNewToDo options="createNew" statu={true} description="" categories="" sai={vizualização} />
          </div>
        )
      }
      <div className="areaPesquisaBtn">
        <input className="inputPesquisa" type="text" value={inputValue} onChange={handleInputChange} placeholder="Pesquise suas tarefas aqui" />
        <button onClick={vizualização}>Create New Task</button>
      </div>

      
<div className="areaSelect">
 <p>Filter</p>
  <div className="">
        <select name="categoria" id="categoria" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">all</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="person">Person</option>
        </select>
      </div>
      <div>
         <select name="status" id="status">
        <option value="incompletas">Incompletas</option>
        <option value="complestas">Complestas</option>
      </select>
      </div>
</div>
      
     

    </>

  )

}

export default Filters