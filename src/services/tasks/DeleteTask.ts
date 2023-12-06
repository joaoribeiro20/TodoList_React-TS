import axios from "axios";

export const DeleteTask = async (id:string) => {
    try {
      const response = await axios.delete(`http://localhost:8088/deleteTask/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeita a Promise para que a função fetchData possa lidar com o erro
    }
  };
