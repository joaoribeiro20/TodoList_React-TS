import { createContext, useContext, ReactNode, useState } from 'react';



/* ---- Criando o context, porem no typescript é necessario informa o tipo do context ---------- */
/* criando o tipo para o context*/

type MyContextType = {
  update: number;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
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
  const [update, setUpdate] = useState(0);
  return(
    <MyContext.Provider value={{ update, setUpdate}}>
      {children}
    </MyContext.Provider>
  ) 
}


 function useUpdateContext(){
    const context = useContext(MyContext)
    

    if(context === undefined){
        throw new Error ('Não Esta dentro do contexto')
    }
    return context
}

export { MyContextProvider, useUpdateContext };