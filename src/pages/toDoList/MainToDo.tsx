import { FC } from "react";
import ContainerTask from "../../containers/ContainerTask";

import "./StyleMainToDo.scss"

const MainToDo: FC = () => {
    return (
        <>
        <div className="componentMainToDoList">
            <div className="componentToDoList">
                <div className="componentToDoListSesrch">
                    <input type="text" />
                    <button>Pesquisar</button>
                  {/*   //pesquisar por nome da taks */}
                </div>
                <div className="componentToDoListFilter">
                    <select name="" id="">
                        <option value="">Categoria</option>
                        <option value="">study</option>
                        <option value="">work</option>
                        <option value="">person</option>
                    </select>
                    <button>Incompletas</button>
                    <button>Complestas</button>
                    {/* //filtrar por categoria 
                    //filtrar por Task incompletas 
                    //filtrar por taks complestas */}
                </div> 
                <div className="componentToDoListNewTask">
                    <button>Create New Task</button>
                    {/* //componete de vai permitir criar nova task */}
                </div>
                <div className="componentToDoListTask">
                   <ContainerTask />
                </div>
            </div>
            </div>
        </>
    )
}
export default MainToDo