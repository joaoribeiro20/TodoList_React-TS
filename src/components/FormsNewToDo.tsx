// FormsNewToDo.tsx
import React, { ChangeEvent, useState } from 'react';
import { PostCreateTask } from '../services/PostCreateTask';

import { IDataDefaultTask } from '../interfaces/IDataDefaultTask';
import { editiPatch } from '../services/PatchTask';

interface res {
    options: string
    id: string
}




const FormsNewToDo: React.FC<{ sai: () => void; } & IDataDefaultTask & res> = (props) => {

    const [formData, setFormData] = useState<IDataDefaultTask>({
        description: props.description,
        categories: props.categories,
        date: props.date,
        statu: props.statu
    });


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
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const day = parseInt(formData.date?.replace(/\D/g, '').substring(0, 2) || '', 10);
        const month = parseInt(formData.date?.replace(/\D/g, '').substring(2, 4) || '', 10);
        const year = parseInt(formData.date?.replace(/\D/g, '').substring(4, 8) || '', 10);

        if (day <= 31 && month <= 12 && year >= 2023) {
            try {
                if (formData.categories && formData.description) {
                    if (props.options === "createNew") {
                        PostCreateTask({
                            description: formData.description,
                            categories: formData.categories,
                            date: formData.date?.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'),
                            statu: true
                        });
                    } else if (props.options === "editTask") {
                        editiPatch({
                            description: formData.description,
                            categories: formData.categories,
                            date: formData.date,
                            statu: formData.statu
                        }, props.id);
                    }
                    props.sai();
                } else {
                    alert('Preencha todos os campos antes de enviar.');
                }
            } catch (error) {
                console.error('Erro ao criar/editar tarefa:', error);
            }
        } else {
            alert("Data Inválida!!");
        }
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
                            cols={50}
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
                        <label>
                            Escolha uma data:
                            <input
                                type="text"
                                maxLength={8}
                                name='date' // Adicionando o atributo 'name'    
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    {
                        props.options == "editTask" ? (<button type="submit" >edit</button>) : <button type="submit">create</button>
                    }

                    <button onClick={props.sai}>sair</button>
                </form>
            </div>
        </div>
    );
};

export default FormsNewToDo;

