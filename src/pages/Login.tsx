import  { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.scss";
import { useAppContext } from "../hooks/InfoUser";
import DynamicForm from '../components/DynamicForm';
import { getUser } from "../services/users/GetUser";
import { IDataUser } from "../interfaces/IDataUser";


const fields = [
  { name: 'email', label: 'Email', type: 'email', exemplo:"MeuEmail@gmail.com",length:30  },
  { name: 'password', label: 'Password', type: 'password',  exemplo:"Ta8933",length:20  },
];


const Login: FC = () => {
  const { setData } = useAppContext();
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
        cep: '',
        tasks:[] // Mantido como string
      };
      console.log(`dados que estao sendo enviado na request ${initialFormData}`)
      const user = await getUser(initialFormData);
      setData(user)
      user.id && localStorage.setItem("dadosUser", user.id);
      navigate('/task');
    } catch (error) {
      console.log('Erro ao processar o formulário:');
      // Adicione lógica aqui para lidar com erros de requisição.
    }
  };

  return (
    <>
      <section className="sectionMain">
        <article className="areaImgMain"></article>
        <article className="areaFormsMain">
          <div>
            <h1><br />Login</h1>
            <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
            <div className="areaComplementar">
              <div className="areaComplementar2">
                <div><input type="checkbox"/> </div> <div><p>Lembrar de mim</p></div>
                
              </div>
              <div>
                <Link to='/'>Esqueceu sua senha?</Link>
              </div>
              </div>
            <p className="cadastrese">Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
          </div>
        </article>
      </section>
    </>
  );
};

export default Login;
