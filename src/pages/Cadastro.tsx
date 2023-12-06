import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Cadastro.scss"

/* import {useAppContext} from "../hooks/teste" */
import DynamicForm from '../components/DynamicForm';
import { CreateUser } from "../services/users/CreateUser";
import { IDataUser } from "../interfaces/IDataUser";



const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'telefone', label: 'Telefone', type: 'text' },
    { name: 'apelido', label: 'Apelido', type: 'text' },
    { name: 'cep', label: 'CEP', type: 'text' },
    
];

    
const Cadastro: FC = () => {
    /* const {count, setCount} = useAppContext() */

    const handleFormSubmit = async (formData:IDataUser) => {
        try {
        console.log('Form submitted with data:', formData);
        // Aqui você pode lidar com os dados do formulário como quiser, por exemplo, enviá-los para um servidor.
  
        await CreateUser(formData);
        const initialFormData: IDataUser = {
            name: '',
            email: '',
            password: '',
            telefone: '', // Mantido como string
            apelido: '',
            cep: '', // Mantido como string
          };
          formData=initialFormData
      } catch (Error) {
        alert('Erro ao processar o formulário:');
        // Adicione lógica aqui para lidar com erros de requisição.
      }
    };
    return (
        <>
            <section className="sectionMain">
                <article className="areaFormsMain">
                    <div>
                         <h1>Seja bem vindo <br />Crie uma conta para logar</h1>
                    <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
                    <br />
                    <input type="checkbox" /><label className='labelPattern' >aceito os termos</label>
                    <Link  to="/">login</Link>
                    </div>
                  

                </article>
                <article className="areaImgMain">

                </article>

            </section>
        </>
    )
}
export default Cadastro