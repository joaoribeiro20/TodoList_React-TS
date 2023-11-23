import { FC } from "react";
import ContainerTask from "../../containers/ContainerTask";
import {useAppContext} from "../../hooks/teste"

const MainToDo: FC = () => {
    /* const {count, setCount} = useAppContext() */
    return (
        <>
    
         <ContainerTask />          
        </>
    )
}
export default MainToDo