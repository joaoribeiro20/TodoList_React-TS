import { FC, FormEvent, useState } from "react";

import {useAppContext} from "../hooks/teste" 
import { Link } from "react-router-dom";


interface FormData {
    email: string;
    password: string;
}

const FormsLogin: FC = () => {
    /* const {count, setCount} = useAppContext() */
    const { Login, setLogin } = useAppContext()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        // Aqui você pode adicionar lógica para enviar os dados para o servidor ou fazer o que for necessário.
        console.log('Formulário enviado:', formData);
        setLogin({
            email:formData.email,
            name:formData.password,
            password:formData.password
            })
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Senha:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Enviar</button>
        </form>

        </>
        
    );
};

export default FormsLogin