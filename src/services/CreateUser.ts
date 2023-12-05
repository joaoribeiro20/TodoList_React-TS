import axios from "axios";
import { IDataUser } from "../interfaces/IDataUser";

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
      const response = await axios.post<IDataUser>('http://localhost:8088/createUser',updateInfoUser);
      alert("usuario criado com sucesso")
      return response.data;
    } catch (error) {
      alert("Usuario Ja encontrado em nosso sistema")
      console.log(error.response.data)
      return error.response.data
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };