import { BsFillPencilFill, BsFillTrash3Fill, BsPatchCheck, BsPatchCheckFill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "../styles/tasks/styleTask.scss";
import { useState, useEffect } from "react";
import FormsNewToDo from "./FormsNewToDo";
import { useAppContext } from "../hooks/InfoUser";
import { editTask } from "../interfaces/EditTask";

interface FiltersProps{
    setUpadatePage: React.Dispatch<React.SetStateAction<number>>;
    onDelete: () => void, 
    onedit: () => void, 
    onstatus: () => void 
}

const Task: React.FC<IDataDefaultTask & FiltersProps> = (props,setUpadatePage,) => {
    const { statu, id, title, description, categories, onDelete, onedit, onstatus } = props;
    const [classDinamic, setClassDinamic] = useState(statu ? "divMainComplet1" : "divMain");
    const { data, setData } = useAppContext();
    const [updatedTasks, setUpdatedTasks] = useState<IDataDefaultTask>();

    useEffect(() => {
        // Update classDinamic whenever statu changes
        setClassDinamic(statu ? "divMainComplet1" : "divMain");
    }, [statu]);

    function handleStatusToggle() {
        onstatus();
        // Note: No need to update classDinamic here, useEffect will handle it when statu changes
    }

    function handleEdit(taskId: string) {
       
        setUpdatedTasks(data.tasks && data.tasks.find((task) => task.id === taskId)) 
        vizualizacao()
        console.log(taskId)
        onedit();
    }

    function handleDelete() {
        onDelete();
    }

    const [modalCreateToDo, setModalCreateToDo] = useState(false)

    function vizualizacao() {
      setModalCreateToDo(!modalCreateToDo)
      
    }

    function updatePage(){
        setUpadatePage(Math.random() * 10) 
      }

    return (
        <>
         {
        modalCreateToDo && (
          <div>
            <FormsNewToDo 
            id={updatedTasks?.id!} 
            options="editTask" 
            statu={true} 
            title={updatedTasks?.title!}
            description={updatedTasks?.description!} 
            categories={updatedTasks?.categories!} 
            authorId={updatedTasks?.authorId!}
            updatePage={updatePage}
            statusModalVisivel={vizualizacao} />
          </div>
        )
      }
        <div className={classDinamic} key={id}>
            <div className="description">
                <div>
                    <button className="check" onClick={handleStatusToggle}>
                        {statu ? <BsPatchCheck  className="bbIncon"/> : <BsPatchCheckFill  className="bbIncon"/>}
                    </button>
                </div>
                <div className="textDescription">
                    <p><strong>{title}</strong></p>
                    <br /><p className="textDescriptTitle">description</p>
                    <p>{description}</p>
                </div>
                <div className="btns">
                    <div>
                        <button className="edit" onClick={() => handleEdit(id || '')}><BsFillPencilFill  className="bbIncontask"/></button>
                    </div>
                    <div>
                        <button className="delete" onClick={handleDelete} ><BsFillTrash3Fill  className="bbIncontask"/></button>
                    </div>
                </div>
            </div>
            <div className="divMainTask">
                <div className="areaCategoriasData">
                    <p><span className="text">Categoria: </span>{categories.toUpperCase()}</p>
                    {/* <p><span className="text">Prazo de Conlusão: </span>{date}</p> */}
                </div>
            </div>
        </div>
        </>
        
    );
};

export default Task;