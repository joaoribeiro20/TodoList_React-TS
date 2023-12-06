import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { useAppContext } from "../hooks/InfoUser";
import DynamicForm from '../components/DynamicForm';
import { getUser } from "../services/users/GetUser";
import { IDataUser } from "../interfaces/IDataUser";


const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

interface teste{
    email:string
    password:string
}

const Login: FC = () => {
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: IDataUser) => {
    try {
        
      console.log('Form submitted with data:', formData);
      // Aqui você pode lidar com os dados do formulário como quiser, por exemplo, enviá-los para um servidor.
      const initialFormData: IDataUser = {
        name: '',
        email: formData.email,
        password: formData.password,
        telefone: '', // Mantido como string
        apelido: '',
        cep: '', // Mantido como string
      };
      console.log(`dados que estao sendo enviado na request ${initialFormData}`)
      const user = await getUser(initialFormData);
      setData(user)
      user.id && localStorage.setItem("dadosUser", user.id);
      navigate('/task');
    } catch (error) {
      alert('Erro ao processar o formulário:');
      // Adicione lógica aqui para lidar com erros de requisição.
    }
  };

  return (
    <>
      <section className="sectionMain">
        <article className="areaImgMain"></article>
        <article className="areaFormsMain">
          <div>
            <h1>Seja bem-vindo <br />Faça login para entrar</h1>
            <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
            <Link to="/cadastro">Cadastre-se</Link>
          </div>
        </article>
      </section>
    </>
  );
};

export default Login;
