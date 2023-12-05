import { BsFillPencilFill, BsFillTrash3Fill, BsPatchCheck, BsPatchCheckFill } from "react-icons/bs";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "../styles/tasks/styleTask.scss";
import { useState, useEffect } from "react";

const Task: React.FC<IDataDefaultTask & { onDelete: () => void, onedit: () => void, onstatus: () => void }> = (props) => {
    const { statu, _id, description, categories,date, onDelete, onedit, onstatus } = props;
    const [classDinamic, setClassDinamic] = useState(statu ? "divMain" : "divMainComplet1");

    useEffect(() => {
        // Update classDinamic whenever statu changes
        setClassDinamic(statu ? "divMain" : "divMainComplet1");
    }, [statu]);

    function handleStatusToggle() {
        onstatus();
        // Note: No need to update classDinamic here, useEffect will handle it when statu changes
    }

    function handleEdit() {
        onedit();
    }

    function handleDelete() {
        onDelete();
    }

    return (
        <div className={classDinamic} key={_id}>
            <div className="description">
                <div>
                    <button className="check" onClick={handleStatusToggle}>
                        {statu ? <BsPatchCheck  className="bbIncon"/> : <BsPatchCheckFill  className="bbIncon"/>}
                    </button>
                </div>
                <div className="textDescription">
                    <p>{description}</p>
                </div>
                <div className="btns">
                    <div>
                        <button className="edit" onClick={handleEdit}><BsFillPencilFill  className="bbIncontask"/></button>
                    </div>
                    <div>
                        <button className="delete" onClick={handleDelete}><BsFillTrash3Fill  className="bbIncontask"/></button>
                    </div>
                </div>
            </div>
            <div className="divMainTask">
                <div className="areaCategoriasData">
                    <p><span className="text">Categoria: </span>{categories.toUpperCase()}</p>
                    <p><span className="text">Prazo de Conlusão: </span>{date}</p>
                </div>
            </div>
        </div>
    );
};

export default Task;