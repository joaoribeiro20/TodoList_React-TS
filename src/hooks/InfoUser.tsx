import { createContext, useContext, ReactNode, useState } from 'react';


import { IDataUser } from "../interfaces/IDataUser";
import { IDataDefaultTask } from '../interfaces/IDataDefaultTask';
/* ---- Criando o context, porem no typescript é necessario informa o tipo do context ---------- */
/* criando o tipo para o context*/

type MyContextType = {
  data: IDataUser;
  setData: React.Dispatch<React.SetStateAction<IDataUser>>;
  updateP: IDataDefaultTask[];
  setUpdateP: React.Dispatch<React.SetStateAction<IDataDefaultTask[]>>;
};
/* criando o context e dando o tipo criado a cima a ele*/
const MyContext = createContext<MyContextType | undefined>(undefined);
/* -------------------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------------------- */
type MyContextProviderProps = {
  children: ReactNode;
};
/* -------------------------------------------------------------------------------------- */



const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<IDataUser>({
    name: "",
    email:"",
    password:"",
    telefone:'0',
    apelido:"",
    cep:'0',
    tasks:[]
  });
  const [updateP, setUpdateP] = useState<IDataDefaultTask[]>([]);
  return(
    <MyContext.Provider value={{updateP, setUpdateP, data, setData}}>
      {children}
    </MyContext.Provider>
  ) 
}


 function useAppContext(){
    const context = useContext(MyContext)
    

    if(context === undefined){
        throw new Error ('Não Esta dentro do contexto')
    }
    return context
}

export { MyContextProvider, useAppContext };