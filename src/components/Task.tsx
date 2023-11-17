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
                    <p>{description}</p>
                </div>
{/* -------------------------------------------------------- */}
                <div className="divMainTask">
                    <div className="btns">
                        <input type="checkbox" />
                        <button onClick={edit}><BsFillPencilFill /></button>
                        <button onClick={excluir}><BsFillTrash3Fill /></button>
                    </div>
                    <div className="areaCategoriasData">
                        <p>{categories.toLocaleUpperCase()}</p>
                        <p>Data: 00/00/0000 á 00/00/0000</p>
                    </div>
{/* -------------------------------------------------------- */}
                </div>



            </div>
        </>
    )
}
export default Task