import { FC } from "react"
import { BsFunnelFill } from "react-icons/bs"


const Filters: FC = () => {



    return (
        <>
            
            <div className="componentToDoListFilter">
                <select name="categoria" id="categoria">
                    <option value="">Categoria</option>
                    <option value="study">Study</option>
                    <option value="work">work</option>
                    <option value="person">person</option>
                </select>
                <select name="status" id="status">
                    <option value="incompletas">Incompletas</option>
                    <option value="complestas">Complestas</option>
                </select>

            </div>

        </>

    )

}

export default Filters