import axios from "axios";
import { IDataDefaultTask } from "../../interfaces/IDataDefaultTask";


export const GetAllTasksOneUser = async (id:string): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.get<IDataDefaultTask[]>(`http://localhost:8088/getTasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };


