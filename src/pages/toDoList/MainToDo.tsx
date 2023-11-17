import { FC, useEffect, useState } from "react";
import ContainerTask from "../../containers/ContainerTask";


import FormsNewToDo from "../../components/FormsNewToDo";



const MainToDo: FC = () => {
    const [modalCreateToDo, setModalCreateToDo] = useState(false)

    function vizualização() {
        setModalCreateToDo(!modalCreateToDo)
    }
    useEffect(() => {
    }, [modalCreateToDo]);


    return (
        <>
            

               
                       
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

           
        </>
    )
}
export default MainToDo