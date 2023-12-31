import axios from "axios";
import { IDataUser } from "../../interfaces/IDataUser";

export const GetUserId = async (id:string): Promise<IDataUser | null> => {
    try {
      const response = await axios.get<IDataUser>(`https://apiservicetask.onrender.com/getUser/${id}`);
    
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };