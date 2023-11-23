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
        value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); // Aplica a máscara XX.XXX.XXX/XXXX-XX

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

        if (props.options == "createNew") {

            try {
                // Envia a solicitação apenas se os campos estiverem preenchidos

                if (formData.categories && formData.description) {

                    PostCreateTask({
                        description: formData.description,
                        categories: formData.categories,
                        date: formData.date,
                        statu: true
                    });
                    props.sai();
                } else {
                    alert('Preencha todos os campos antes de enviar.');
                }
            } catch (error) {
                console.error('Erro ao criar tarefa:', error);

            }

        } else if (props.options == "editTask") {
            try {
                // Envia a solicitação apenas se os campos estiverem preenchidos
                if (formData.categories && formData.description) {
                    editiPatch({
                        description: formData.description,
                        categories: formData.categories,
                        statu: formData.statu
                    }, props.id);
                    props.sai();
                } else {
                    console.error('Preencha todos os campos antes de enviar.');
                }
            } catch (error) {
                console.error('Erro ao criar tarefa:', error);

            }

            editiPatch
        }

    };



    return (
        <div className='divMainForms'>
            <div className='modal-content '>
                <form onSubmit={handleSubmit}>
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

