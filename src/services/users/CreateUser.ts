import axios from "axios";
import { IDataUser } from "../../interfaces/IDataUser";

export const CreateUser = async (Iforms:IDataUser): Promise<IDataUser> => {
    try {
      const updateInfoUser = {
        name:Iforms.name,
        email:Iforms.email,
        password:Iforms.password,
        telefone:parseInt(Iforms.telefone),
        apelido:Iforms.apelido,
        cep:parseInt(Iforms.cep)
    }
      const response = await axios.post<IDataUser>('https://apiservicetask.onrender.com/criarNovoUsuario',updateInfoUser);
      alert("usuario criado com sucesso")
      return response.data;
    } catch (error) {
      alert("Usuario Ja encontrado em nosso sistema")
      return {  
        id: '',
        name: '',
        email:'',
        password:'',
        telefone:'',
        apelido:'',
        cep:'',
        tasks:[]}
     
    }
  };