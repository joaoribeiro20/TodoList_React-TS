import MainToDo from './pages/MainToDo'

import { MyContextProvider } from './hooks/teste';

function App() {


  return (
    <>


      <MyContextProvider>
        <MainToDo />
      </MyContextProvider>

    </>
  )
}

export default App
