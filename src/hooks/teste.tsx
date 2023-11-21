import { createContext, useContext, ReactNode, useState } from 'react';

/* ---- Criando o context, porem no typescript é necessario informa o tipo do context ---------- */
/* criando o tipo para o context*/
type MyContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; 
  name: {
    nome: string;
    idade: number;
};
  setName:React.Dispatch<React.SetStateAction<{
    nome: string;
    idade: number;
}>>
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
  const [count, setCount] = useState(0);
  const [name, setName] = useState({
    nome: "Joao nome incial",
    idade: 21
});
  return(
    <MyContext.Provider value={{ count, setCount, name, setName}}>
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