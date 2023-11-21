import { FC } from "react";
import ContainerTask from "../../containers/ContainerTask";
import {useAppContext} from "../../hooks/teste"

const MainToDo: FC = () => {
    const {count, setCount} = useAppContext()
    return (
        <>
        <h2>{count}</h2>
         <ContainerTask />          
        </>
    )
}
export default MainToDo