import { FC, useEffect, useState } from "react";
import ContainerTask from "../../containers/ContainerTask";

import "./StyleMainToDo.scss"
import FormsNewToDo from "../../components/FormsNewToDo";


const MainToDo: FC = () => {
    const [modalCreateToDo, setModalCreateToDo] = useState(false)

    function vizualização() {
        setModalCreateToDo(!modalCreateToDo)
    }

    useEffect(() => {
        // Lógica para ser executada quando modalCreateToDo mudar
        console.log("modalCreateToDo mudou:", modalCreateToDo);
    }, [modalCreateToDo]);



    return (
        <>
            {
                modalCreateToDo && (
                    <div>
                    <FormsNewToDo options="createNew" statu={true} description="" categories="" sai={vizualização} />
                    </div>
                )
            }
            <div className="componentMainToDoList">
                <div className="componentToDoList">
                   
                    <div className="componentToDoListTask">
                        <div className="componentToDoListNewTask">
                        <button onClick={vizualização}>Create New Task</button>
                    </div>
                        {
                            !modalCreateToDo && (
                                <ContainerTask />
                            )
                        }
                        {
                            modalCreateToDo && (
                                <ContainerTask />
                            )
                        } 
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainToDo