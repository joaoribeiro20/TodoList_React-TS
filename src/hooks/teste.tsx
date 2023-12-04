import { createContext, useContext, ReactNode, useState } from 'react';
import { BsEmojiGrimaceFill } from 'react-icons/bs';


/* ---- Criando o context, porem no typescript é necessario informa o tipo do context ---------- */
/* criando o tipo para o context*/
type MyContextType = {
  Login: {
    name:string
    email:string
    password:string
};
  setLogin:React.Dispatch<React.SetStateAction<{
    name:string
    email:string
    password:string
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
  const [Login, setLogin] = useState({
    name:"joao",
    email:"teste@BsEmojiGrimaceFill.com",
    password:"123"
});
  return(
    <MyContext.Provider value={{ Login, setLogin}}>
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