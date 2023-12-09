import { BsFillPencilFill, BsFillTrash3Fill, BsPatchCheck, BsPatchCheckFill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "../styles/tasks/styleTask.scss";
import { useState } from "react";
import FormsNewToDo from "./FormsNewToDo";
import { useAppContext } from "../hooks/InfoUser";

import { editiPatch } from "../services/tasks/PatchTask";

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
    const {  updateP, setUpdateP } = useAppContext();
    const [updatedTasks, setUpdatedTasks] = useState<IDataDefaultTask>();
    
  
/* 
        useEffect(() => {
            // Update classDinamic whenever statu changes
            setClassDinamic(tasks?.statu ? "divMainComplet1" : "divMain");
            console.log("useEffect3")
            console.log(tasks?.statu)
        }, [tasks?.statu]);   */
        
        async function handleStatusToggle(taskId: string) {
            console.log('teste');
          
            // Commented out code for reference
            /*
            const valorArmazenado = localStorage.getItem('dadosUser');
            const userData = await GetAllTasksOneUser(valorArmazenado!);
            setUpdateP(userData);
            setTesteBackp(userData);
            */
          
            // Find the task with the specified taskId in the updateP array
            const itemAlterado = updateP && updateP.find((task) => task.id === taskId);
          
            // Check the statu property of the found task (if it exists) and assign it to teste2
            const teste2 = itemAlterado?.statu || '';
            console.log(teste2);
          
            // Make a PATCH request to update the task status using the editiPatch function
            if(itemAlterado != undefined){
                 const teste = await editiPatch({
              id: itemAlterado?.id,
              description: itemAlterado?.description,
              categories: itemAlterado?.categories,
              title: itemAlterado?.title,
              authorId: itemAlterado?.authorId,
              statu: !itemAlterado?.statu, // Corrected from !itemAlterado?.id
            });
          // Set a dynamic class based on the task status
            setClassDinamic(!teste2 ? 'divMainComplet1' : 'divMain');
          
            // Update the updateP state by removing the current task and adding the updated task
            const updatedTasks = updateP.filter((task) => task.id !== taskId);
            setUpdateP(updatedTasks.concat(teste));
            }
           
            
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
            {updatedTasks ?
                modalCreateToDo ? (
                    <div>
                        <FormsNewToDo
                            id={updatedTasks.id!}
                            options="editTask"
                            statu={true}
                            title={updatedTasks.title!}
                            description={updatedTasks.description!}
                            categories={updatedTasks.categories!}
                            authorId={updatedTasks.authorId!}
                            /* updatePage={()=>{updatePage()}} */
                            statusModalVisivel={vizualizacao} />
                    </div>
                ) : <span></span>
                : <span></span>
            }
            <div className={classDinamic}>
                <div className="description">
                    <div>
                        <button className="check" onClick={() => handleStatusToggle(tasks?.id || '')}>
                            {tasks?.statu ? 
                            /* icone claro */
                            <BsPatchCheckFill className="bbIncon" />
                            /* icone escuro */
                            : <BsPatchCheck className="bbIncon" /> }
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