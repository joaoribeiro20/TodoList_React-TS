import axios from "axios";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

export const editiPatch = async (Iforms:IDataDefaultTask, id:string): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.patch<IDataDefaultTask[]>(`https://apitask-ydt8.onrender.com/tasks/${id}`,Iforms);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };