// FormsNewToDo.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PostCreateTask } from '../services/tasks/PostCreateTask';

import { IDataDefaultTask } from '../interfaces/IDataDefaultTask';
import { editiPatch } from '../services/tasks/PatchTask';
import ErrorCard from './ErrorCard';
import { useAppContext } from '../hooks/InfoUser';
import { GetUserId } from '../services/users/GetUserId';

interface res {
    options: string
    id: string
    statusModalVisivel: () => void;

}

const FormsNewToDo: React.FC<IDataDefaultTask & res> = (props) => {
    const { data, setData, updateP, setUpdateP } = useAppContext();
    const [formData, setFormData] = useState<IDataDefaultTask>({
        id: props.id,
        description: props.description,
        categories: props.categories,
        title: props.title,
        authorId: props.authorId,
        statu: props.statu
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
             
                const valorArmazenado = localStorage.getItem('dadosUser');
                console.log(`valor recuperado ${valorArmazenado}`)
                if (valorArmazenado) {
                  console.log("useEffect3")
                  /*  allTasks && setAllTasks(awaitGetUserId(valorArmazenado)) */
                  const userData = await GetUserId(valorArmazenado);
                }
            } catch (error) {
              console.error('Erro ao buscar dados do usuário:', error);
            }
          };
       
          fetchData();
    },[])

    const [errorVisible, setErrorVisible] = useState(false);



    const handleError = () => {
        setErrorVisible(true);
    };

    const handleCloseError = () => {
        setErrorVisible(false);
    };

    const dateMask = (value: string) => {
        if (!value) return "";
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Aplica a máscara 00/00/0000
        return value;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;


        if (name === "date") {
            const formattedDate = dateMask(value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: formattedDate,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        /* 
                const day = parseInt(formData.date?.replace(/\D/g, '').substring(0, 2) || '', 10);
                const month = parseInt(formData.date?.replace(/\D/g, '').substring(2, 4) || '', 10);
                const year = parseInt(formData.date?.replace(/\D/g, '').substring(4, 8) || '', 10); */

        /*  if (day <= 31 && month <= 12 && year >= 2023) {} */
        try {
            if (formData.categories && formData.description) {
                if (props.options === "createNew") {
                   /*  formData.id = `${Math.floor(Math.random() * 1000)}` */
                    const teste = await PostCreateTask({
                        title: formData.title,
                        description: formData.description,
                        categories: formData.categories,
                        statu: formData.statu,
                        authorId: formData.authorId,
                    })
                     
                const updateTask = [...updateP, teste];
                 setUpdateP(updateTask);
                    
                } else if (props.options === "editTask") {
                    editiPatch({
                        id: formData.id,
                        description: formData.description,
                        categories: formData.categories,
                        title: formData.title,
                        authorId: formData.authorId,
                        statu: true
                    })
                    const updateTask = [...updateP, formData];
                    setUpdateP(updateTask);
                }
                props.statusModalVisivel();

            } else {
                /* alert('Preencha todos os campos antes de enviar.'); */
                handleError()
            }
        } catch (error) {
            console.error('Erro ao criar/editar tarefa:', error);
            handleError()
        }
        /* } else {
            alert("Data Inválida!!"); 
            
        } */
    };

    

    return (
        <div className='divMainForms'>
            <div className='modal-content '>

                <form onSubmit={handleSubmit}>
                    {
                        props.options == "editTask" ? (<h3>Edite sua task</h3>) : <h3 >Crie sua nova task</h3>
                    }
                    <label htmlFor="largeTextInput">descriptio task</label>
                    <div>
                        <textarea
                            rows={6}
                            cols={30}
                            id="largeTextInput"
                            name='description' // Adicionando o atributo 'name'
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <label htmlFor="selectOption">Selecione uma opção:</label>
                    <div>

                        <select
                            id="selectOption"
                            name='categories' // Adicionando o atributo 'name'
                            value={formData.categories}
                            onChange={handleChange}
                        >
                            <option value="">Categorias</option>
                            <option value="work">Work</option>
                            <option value="person">Person</option>
                            <option value="study">Study</option>
                        </select>
                    </div>
                    <div>
                        <br />
                        <label>
                            Title
                        </label>
                    </div>
                    <div>
                        <input
                            type="text"
                            maxLength={15}
                            name='title' // Adicionando o atributo 'name'    
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {/* <input
                                type="text"
                                maxLength={8}
                                name='date' // Adicionando o atributo 'name'    
                                value={formData.date}
                                onChange={handleChange}
                            /> */}
                    </div>
                    {
                        props.options == "editTask" ? (<button type="submit" >edit</button>) : <button type="submit">create</button>
                    }

                    <button onClick={props.statusModalVisivel}>sair</button>
                </form>
            </div>
            {errorVisible && <ErrorCard errorMessage="Ocorreu um erro. Tente novamente." onClose={handleCloseError} />}
        </div>
    );
};

export default FormsNewToDo;

