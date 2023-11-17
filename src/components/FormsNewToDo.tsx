// FormsNewToDo.tsx
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PostCreateTask } from '../services/PostCreateTask';

import { IDataDefaultTask } from '../interfaces/IDataDefaultTask';
import { editiPatch } from '../services/PatchTask';

interface res{
    options: string
    id:string
}




const FormsNewToDo: React.FC <{sai: () => void;} & IDataDefaultTask & res>= (props) => {

    const [formData, setFormData] = useState<IDataDefaultTask>({
        description: props.description,
        categories: props.categories,
        statu: true
    });

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            categories: event.target.value,
        });
    };

    const handleLargeTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            description: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if(props.options == "createNew"){

              try {
            // Envia a solicitação apenas se os campos estiverem preenchidos
            if (formData.categories && formData.description) {
                PostCreateTask({
                    description: formData.description,
                    categories: formData.categories,
                    statu: true,
                });
                props.sai();
            } else {
                console.error('Preencha todos os campos antes de enviar.');
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);

        }

        }else if(props.options == "editTask"){
            try {
                // Envia a solicitação apenas se os campos estiverem preenchidos
                if (formData.categories && formData.description) {
                    editiPatch({
                        description: formData.description,
                        categories: formData.categories,
                        statu: true,
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
                            id="largeTextInput"
                            value={formData.description}
                            onChange={handleLargeTextChange}
                        />
                    </div>
                    <label htmlFor="selectOption">Selecione uma opção:</label>
                    <div>

                        <select
                            id="selectOption"
                            value={formData.categories}
                            onChange={handleSelectChange}
                        >
                            <option value="">Categorias</option>
                            <option value="work">Work</option>
                            <option value="person">Person</option>
                            <option value="study">Study</option>
                        </select>
                    </div>
                    {
                        props.options == "editTask" ? (<button type="submit">edit</button>): <button type="submit">create</button>
                    }
                    
                    <button onClick={props.sai}>sair</button>
                </form>
            </div>
        </div>
    );
};

export default FormsNewToDo;

