import AppRouter from "./routes/router";
import { MyContextProvider } from './hooks/InfoUser';

function App() {
  return (
    <>
     <MyContextProvider>
      <AppRouter />
     </MyContextProvider>
      
    </>
  )
}

export default App
