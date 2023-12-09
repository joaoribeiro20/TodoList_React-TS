import axios from "axios";
import { IDataDefaultTask } from "../../interfaces/IDataDefaultTask";



export const GetAllTasksOneUser = async (id:string): Promise<IDataDefaultTask[]> => {
    try {
      const response = await axios.get<IDataDefaultTask[]>(`https://apiservicetask.onrender.com/getTasks/${id}`);
      const valorArmazenado = localStorage.getItem('dadosUser');
     
      return response.data.filter((Task)=> Task.authorId == valorArmazenado)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };


