
import React, { createContext, useContext, FC, useEffect, useState } from "react";
import { IDataDefaultTask } from "../interfaces/IDataDefaultTask";

// Definindo os tipos do contexto
type TasksContextType = {
  allTasks: IDataDefaultTask[] | null;
  setAllTasks: React.Dispatch<React.SetStateAction<IDataDefaultTask[] | null>>;
};

// Criando o contexto
const AContext = createContext<TasksContextType | undefined>(undefined);

// Hook customizado para usar o contexto


// Provedor do contexto
type TasksContextProviderProps = {
  children: React.ReactNode;
};

export const TasksContextProvider: FC<TasksContextProviderProps> = ({ children }) => {
  const [allTasks, setAllTasks] = useState<IDataDefaultTask[] | null>(null);



  const value: TasksContextType = {
    allTasks,
    setAllTasks,
  };
  return (
    <AContext.Provider value={value}>
      {children}
    </AContext.Provider>
  );
};


export const useTasksContext = () => {
  const context = useContext(AContext);
  if (!context) {
    throw new Error('useTasksContext deve ser usado dentro de um TasksContextProvider');
  }
  return context;
};