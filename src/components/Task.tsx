import { BsFillPencilFill, BsFillTrash3Fill, BsPatchCheck, BsPatchCheckFill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "../styles/tasks/styleTask.scss";
import { useState, useEffect } from "react";
import FormsNewToDo from "./FormsNewToDo";
import { useAppContext } from "../hooks/InfoUser";
import { editTask } from "../interfaces/EditTask";

interface FiltersProps {
    /* setUpadatePage:  () => void,  */
    onDelete: () => void,
    onedit: () => void,
    onstatus: () => void
    tasks: IDataDefaultTask | null;
}

const Task: React.FC<FiltersProps> = ({ tasks, onDelete }) => {
    /*  const { statu, id, title, description, categories, onDelete, onedit, onstatus } = props;*/
     const [classDinamic, setClassDinamic] = useState(tasks?.statu ? "divMainComplet1" : "divMain"); 
    const { data, setData, updateP, setUpdateP } = useAppContext();
    const [updatedTasks, setUpdatedTasks] = useState<IDataDefaultTask>();
  

        useEffect(() => {
            // Update classDinamic whenever statu changes
            setClassDinamic(tasks?.statu ? "divMainComplet1" : "divMain");
        }, [tasks?.statu]); 
        

    function handleStatusToggle(taskId: string) {
       
        /* const itemAlterado = updateP && updateP.find((task) => task.id === taskId)
        console.log(itemAlterado?.statu = !itemAlterado?.statu) */
        /* const updat = itemAlterado
        const indecItem = updateP.indexOf(itemAlterado!)
        updateP.splice(indecItem, 1)
        const updateTask = [...updateP, updat];
        setUpdateP(updateTask) */
        
        // Note: No need to update classDinamic here, useEffect will handle it when statu changes
    }

    function handleEdit(taskId: string) {
        const itemAlterado = updateP && updateP.find((task) => task.id === taskId)
        const indecItem = updateP.indexOf(itemAlterado!)
        updateP.splice(indecItem, 1)
        setUpdatedTasks(itemAlterado)  
        vizualizacao()
        console.log(taskId)
        /*  onedit(); */
    }

    function handleDelete() {
        onDelete();
    }

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
                            id={updatedTasks?.id!}
                            options="editTask"
                            statu={true}
                            title={updatedTasks?.title!}
                            description={updatedTasks?.description!}
                            categories={updatedTasks?.categories!}
                            authorId={updatedTasks?.authorId!}
                            /* updatePage={()=>{updatePage()}} */
                            statusModalVisivel={vizualizacao} />
                    </div>
                )
            }
            <div className={classDinamic}>
                <div className="description">
                    <div>
                        <button className="check" onClick={() => handleStatusToggle(tasks?.id || '')}>
                            {tasks?.statu ? 
                            <BsPatchCheck className="bbIncon" /> 
                            : <BsPatchCheckFill className="bbIncon" />}
                        </button>
                    </div>
                    <div className="textDescription">
                        <p><strong>{tasks?.title} {tasks?.id}</strong></p>
                        <br /><p className="textDescriptTitle">description</p>
                        <p>{tasks?.description}</p>
                    </div>
                    <div className="btns">
                        <div>
                            <button className="edit" onClick={() => handleEdit(tasks?.id || '')}><BsFillPencilFill className="bbIncontask" /></button>
                        </div>
                        <div>
                            <button className="delete" onClick={handleDelete} ><BsFillTrash3Fill className="bbIncontask" /></button>
                        </div>
                    </div>
                </div>
                <div className="divMainTask">
                    <div className="areaCategoriasData">
                        <p><span className="text">Categoria: </span>{tasks?.categories.toUpperCase()}</p>
                        {/* <p><span className="text">Prazo de Conlusão: </span>{date}</p> */}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Task;