import { BsFillPencilFill, BsFillTrash3Fill, BsPatchCheck, BsPatchCheckFill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import "../styles/styleTask.scss"


const Task: React.FC<IDataDefaultTask & { onDelete: () => void, onedit: () => void, onstatus: () => void}> = (props) => {
    const { statu,_id, description, categories, onDelete, onedit,onstatus } = props;


    function excluir() {
        onDelete();
    }

    function edit() {
        onedit();
    }
    function status() {
        onstatus();
    }




    return (
        <>
            <div className="divMain" key={_id}>


                <div className="description">
                    <div>
                        {statu ?(
                        <button className="check" onClick={status}><BsPatchCheckFill BsPatchCheck size={30}/></button>
                        ): <button className="check" onClick={status}><BsPatchCheck size={30}/></button>}
                        
                        
                    </div>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div className="btns">
                        <div>
                            <button onClick={edit}><BsFillPencilFill size={20} /></button>
                        </div>
                        <div>
                            <button onClick={excluir}><BsFillTrash3Fill size={20} /></button>
                        </div>
                    </div>
                </div>
                {/* -------------------------------------------------------- */}
                <div className="divMainTask">

                    <div className="areaCategoriasData">
                        <p><span className="text">Categoria: </span>{categories.toLocaleUpperCase()}</p>
                        <p><span className="text">Data: </span>00/00/0000 á 00/00/0000</p>
                       
                    </div>
                    {/* -------------------------------------------------------- */}
                </div>



            </div>
        </>
    )
}
export default Task