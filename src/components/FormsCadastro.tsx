import { FC, FormEvent, useState } from "react";

/* import {useAppContext} from "../hooks/teste" */

interface FormData {
    name: string;
    email: string;
    password: string;
  }

const FormsCadastro: FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
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
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
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
      );
    };

export default FormsCadastro