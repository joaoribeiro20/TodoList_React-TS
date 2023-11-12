import { FC } from "react";
import ContainerTask from "../../containers/ContainerTask";



const MainToDo: FC = () => {
    return (
        <>
            <div className="componentMainToDoList">
                <div className="componentToDoListSesrch">
                  {/*   //pesquisar por nome da taks */}
                </div>
                <div className="componentToDoListFilter">
                    {/* //filtrar por categoria 
                    //filtrar por Task incompletas 
                    //filtrar por taks complestas */}
                </div> 
                <div className="componentToDoListNewTask">
                    {/* //componete de vai permitir criar nova task */}
                </div>
                <div className="componentToDoListTask">
                   <ContainerTask />
                </div>
            </div>
        </>
    )
}
export default MainToDo