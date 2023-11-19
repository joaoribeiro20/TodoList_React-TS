import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

import "../styles/styleTask.scss"


const Task: React.FC<IDataDefaultTask & { onDelete: () => void, onedit: () => void }> = (props) => {
    const { _id, description, categories, onDelete, onedit } = props;


    function excluir() {
        onDelete();
    }

    function edit() {
        onedit();
    }




    return (
        <>
            <div className="divMain" key={_id}>


                <div className="description">
                    <div>
                        <input type="checkbox" />
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