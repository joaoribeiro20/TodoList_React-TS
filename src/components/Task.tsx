
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";
import "../styles/styleTask.css"

const Task: React.FC<IDataDefaultTask> = (props) => {
    const { id, text, categories } = props;
    return (
        <>
            <div className="divMain" key={id}>
                <div className="divMainTask">
                    <div>
                        <input type="checkbox" />
                    </div>
                    <div>
                        <p>{text}</p>
                    </div>
                    <div>
                        <button>Editar</button>
                        <button>excluir</button>
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