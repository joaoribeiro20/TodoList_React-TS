import { createContext, useContext, ReactNode } from 'react';

type MyContextType = {
  value: string; // ou qualquer outro tipo que você esteja usando
};

const MyContext = createContext<MyContextType | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
  value: string;
};

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children, value }) => {
  return <MyContext.Provider value={{ value }}>{children}</MyContext.Provider>;
};

export { MyContext, MyContextProvider };