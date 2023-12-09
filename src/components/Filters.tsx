import { ChangeEvent, FC, useState } from "react"
import { IoAddCircle } from "react-icons/io5";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import FormsNewToDo from "./FormsNewToDo";

import "../styles/tasks/StyleFormsDinamic.scss"
import "../styles/tasks/Filters.scss"
import { BsSearch } from "react-icons/bs";
import { useAppContext } from "../hooks/InfoUser";

import { GetAllTasksOneUser } from "../services/tasks/GetAllTaskOneUser";


interface FiltersProps {
  idUserCreateTask:string
   /* setUpadatePage: () => void */
  /* statusModalVisivel: () => void */
}

const Filters: FC<FiltersProps> = ({  idUserCreateTask }) => {
  /* const [filteredTasks, setUpdateP] = useState<IDataDefaultTask[] | null>(null); */
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { setUpdateP } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [testeBackp, setTesteBackp]= useState<IDataDefaultTask[]>([])



  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const valorArmazenado = localStorage.getItem('dadosUser');
    const userData = await GetAllTasksOneUser(valorArmazenado!);
    setUpdateP(userData);
    setTesteBackp(userData)
    console.log(testeBackp)
    const filtered = testeBackp && testeBackp.filter((task) => task.title.includes(value));
    console.log(filtered)
    setUpdateP(filtered || []);
  };

  const handleCategoryChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    
    const valorArmazenado = localStorage.getItem('dadosUser');
    const userData = await GetAllTasksOneUser(valorArmazenado!);
    setUpdateP(userData);
    setTesteBackp(userData)
    console.log(testeBackp)
    const filtered =  testeBackp && testeBackp.filter((task) => {
      const descriptionMatch = task.description.includes(inputValue);
      const categoryMatch = category === '' || task.categories.includes(category);
      return descriptionMatch && categoryMatch;
    });
  
    setUpdateP(filtered || []);

   
  };

 /*  const updatePage = () => {
    setUpadatePage() 
  } */

  const handleStatusChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;
    setSelectedStatus(status);
  
    const valorArmazenado = localStorage.getItem('dadosUser');
    const userData = await GetAllTasksOneUser(valorArmazenado!);
    setUpdateP(userData);
    setTesteBackp(userData);
  
    const filtered = testeBackp && testeBackp.filter((task) => {
      const statusMatch = status === 'a' || task.statu === (status === 'true');
      return statusMatch;
    });
  
    setUpdateP(filtered || []);
  };

  const [modalCreateToDo, setModalCreateToDo] = useState(false)

  function vizualizacao() {
    setModalCreateToDo(!modalCreateToDo)
    
  }

  return (
    <>
      {
        modalCreateToDo && (
          <div>
            <FormsNewToDo 
            id={''} 
            options="createNew" 
            statu={true} 
            title={''}
            description={''} 
            categories={''} 
            authorId={idUserCreateTask}
            statusModalVisivel={vizualizacao}
            /* updatePage={()=>{updatePage()}} */ />
          </div>
        )
      }
      <div className="areaPesquisaBtn">
        <div className="inputPesquisaG">
          <BsSearch className="bbIncon" />
          <input 
          className="inputPesquisa" 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Pesquise suas tarefas aqui" />
        </div>

        <div>
          <button className="btnNewTask" 
          onClick={vizualizacao} ><IoAddCircle className="btt"/>New Task</button>
        </div>

      </div>


      <div className="areaSelect">
        <div>
          <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Category</option>
            <option value="study">Study</option>
            <option value="work">Work</option>
            <option value="person">Person</option>
          </select>
        </div>
        <div>
          <select name="status" id="status" value={selectedStatus} onChange={handleStatusChange}>
            <option value="a">ALL</option>
            <option value="false">Incomplete</option>
            <option value="true">Complete</option>
          </select>
        </div>
      </div>



    </>

  )

}

export default Filters