import axios from "axios";
import { IDataUser } from "../../interfaces/IDataUser";

export const getUser = async (date:IDataUser): Promise<IDataUser> => {
    try {
      const dados = {
        email:date.email,
        password:date.password
      }
      const response = await axios.post<IDataUser>('http://localhost:8088/login',dados);
      console.log('usuario altenticado')
      return response.data
    } catch (error) {
      alert('usuario nao encontrado')
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };
