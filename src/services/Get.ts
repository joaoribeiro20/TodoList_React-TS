import axios from "axios";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";


export const getAllTasks = async (): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.get<IDataDefaultTask[]>('http://localhost:3000/tasks');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };
