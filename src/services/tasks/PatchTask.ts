import axios from "axios";
import { IDataDefaultTask } from "../../interfaces/IDataDefaultTask";

export const editiPatch = async (Iforms:IDataDefaultTask): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.patch<IDataDefaultTask[]>(`http://localhost:8088/UpdateTask`,Iforms);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };