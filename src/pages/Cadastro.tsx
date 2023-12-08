import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Cadastro.scss"

/* import {useAppContext} from "../hooks/teste" */
import DynamicForm from '../components/DynamicForm';
import { CreateUser } from "../services/users/CreateUser";
import { IDataUser } from "../interfaces/IDataUser";



const fields = [
    { name: 'name', label: 'Name', type: 'text', exemplo:"João Vitor"  },
    { name: 'email', label: 'Email', type: 'email', exemplo:"MeuEmail@gmail.com"  },
    { name: 'password', label: 'Password', type: 'password', exemplo:"Tx833"  },
    { name: 'telefone', label: 'Telefone', type: 'text', exemplo:"119300211091"  },
    { name: 'apelido', label: 'Apelido', type: 'text', exemplo:"JoaoMilGrau"  },
    { name: 'cep', label: 'CEP', type: 'text', exemplo:"05000590"  },
    
];

    
const Cadastro: FC = () => {
    /* const {count, setCount} = useAppContext() */
    const navigate = useNavigate();
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
            cep: '',
            tasks:[] // Mantido como string
          };
          navigate('/');
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