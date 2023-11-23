import { ChangeEvent, FC, useState } from "react"
import { IoAddCircle } from "react-icons/io5";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import FormsNewToDo from "./FormsNewToDo";
import { IoFilter } from "react-icons/io5";
import "../styles/StyleFormsDinamic.scss"
import "../styles/Filters.scss"
import { BsSearch } from "react-icons/bs";


interface FiltersProps {
  allTasks: IDataDefaultTask[] | null;
  setFilteredTasks: React.Dispatch<React.SetStateAction<IDataDefaultTask[] | null>>;
  vis: () => void
}

const Filters: FC<FiltersProps> = ({ allTasks, setFilteredTasks,vis }) => {
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

  function vizualizacao() {
    setModalCreateToDo(!modalCreateToDo)
    vis()
  }

  return (
    <>
      {
        modalCreateToDo && (
          <div>
            <FormsNewToDo id={''} options="createNew" statu={true} description={''} categories={''} sai={vizualizacao}/>
          </div>
        )
      }
      <div className="areaPesquisaBtn">
        <div className="inputPesquisa"> 
        <BsSearch size={20}/>
        <input className="inputPesquisa" type="text" value={inputValue} onChange={handleInputChange} placeholder="Pesquise suas tarefas aqui" />
        </div>
    
        <div className="btnNewTask">
           <button onClick={vizualizacao} ><IoAddCircle size={30}/></button>
           <p>New Task</p>
        </div>
       
      </div>

      
<div className="areaSelect">

  <div className="">
        <select name="categoria" id="categoria" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Category</option>
          
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="person">Person</option>
        </select>
      </div>
      <div>
         <select name="status" id="status">
         <option value="">Filter</option>
         <option value="">ALL</option>
        <option value="incompletas">Incompletas</option>
        <option value="complestas">Complestas</option>
      </select>
      </div>
</div>

     

    </>

  )

}

export default Filters