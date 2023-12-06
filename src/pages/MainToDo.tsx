import { FC, useEffect } from "react";
import ContainerTask from "../containers/ContainerTask";
import { useAppContext } from "../hooks/InfoUser"
import "../styles/MainToDo.scss"
import { Link } from "react-router-dom";


const MainToDo: FC = () => {
    const { data, setData } = useAppContext()

    useEffect(() => {
        setData(data)
    })

    return (
        <>
            <section className="areaMain">
                <article className="areaInfo">
                    <div className="divInfo">
                        <div><img src="../public/todoIcone2.png" alt="" /></div>
                        <div>
                            <h1>Bem Vindo de Volta - {data?.apelido}</h1>
                            <p>Voce tem {data?.tasks?.length || 0} tasks no momento</p>
                            <Link to="/">Sair</Link>
                        </div>
                    </div>
                </article>
                <article className="areaTask">
                    <ContainerTask />
                </article>
            </section>

        </>
    )
}
export default MainToDo