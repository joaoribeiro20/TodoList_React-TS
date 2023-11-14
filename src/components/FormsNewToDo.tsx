// FormsNewToDo.tsx
import React, { ChangeEvent, useState } from 'react';
import { PostCreateTask } from '../services/PostCreateTask';
import "./StyleFormsDinamic.scss"
import { IDataDefaultTask } from '../interfaces/IDataDefaultTask';



const FormsNewToDo: React.FC <{sai: () => void;}>= ({ sai }) => {
    const [formData, setFormData] = useState<IDataDefaultTask>({
        description: '',
        categories: '',
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

        try {
            // Envia a solicitação apenas se os campos estiverem preenchidos
            if (formData.categories && formData.description) {
                PostCreateTask({
                    description: formData.description,
                    categories: formData.categories,
                    statu: true,
                });
                sai();
            } else {
                console.error('Preencha todos os campos antes de enviar.');
            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);

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
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default FormsNewToDo;

