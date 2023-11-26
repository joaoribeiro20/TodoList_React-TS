import axios from "axios";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

export const PostCreateTask = async (Iforms:IDataDefaultTask): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.post<IDataDefaultTask[]>('https://apitask-ydt8.onrender.com/tasks',Iforms);
      console.log()
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };