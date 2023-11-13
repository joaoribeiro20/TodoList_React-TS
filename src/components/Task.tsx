
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "./styleTask.css"

const Task: React.FC<IDataDefaultTask  & { onDelete: () => void }> = (props) => {
    const { _id, description, categories, onDelete } = props;


    function excluir(){
        onDelete();
    }
    return (
        <>
            <div className="divMain" key={_id}>
                <div className="divMainTask">
                    <div>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div>
                        <button>Editar</button>
                        <button onClick={excluir}>excluir</button>
                    </div>
                </div>
                <div>
                    <p>{categories}</p>
                </div>
            </div>
        </>
    )
}
export default Task