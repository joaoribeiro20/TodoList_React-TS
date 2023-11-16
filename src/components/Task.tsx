import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "./styleTask.css"

const Task: React.FC<IDataDefaultTask  & { onDelete: () => void, onedit: () => void}> = (props) => {
    const { _id, description, categories, onDelete, onedit } = props;


    function excluir(){
        onDelete();
    }

    function edit(){
        onedit();
    }

    return (
        <>
            <div className="divMain" key={_id}>
                <div className="areaCategoriasData">
                    <p>{categories.toLocaleUpperCase()}</p>
                    <p>Data: 00/00/0000 á 00/00/0000</p>
                   
                </div>
                <div className="divMainTask">
                    <div className="checkbox">
                        <input type="checkbox" />
                    </div>
                    <div className="description">
                        <p>{description}</p>
                        <hr />
                    </div>
                    <div className="btns">
                        <button onClick={edit}><BsFillPencilFill  /></button>
                        <button onClick={excluir}><BsFillTrash3Fill /></button>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default Task