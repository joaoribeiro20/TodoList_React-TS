import axios from "axios";



export const DeleteTask = (id:string) => {
    try {
      const response = axios.delete(`https://apitask-ydt8.onrender.com/tasks/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };
