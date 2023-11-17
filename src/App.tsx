import MainToDo from './pages/toDoList/MainToDo'

import { MyContextProvider } from './hooks/teste';

function App() {
  const contextValue = "Valor do contexto";

  return (
    <>


      <MyContextProvider value={contextValue}>
        <MainToDo />
      </MyContextProvider>

    </>
  )
}

export default App
