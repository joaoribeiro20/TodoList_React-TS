
import { TasksContextProvider } from './hooks/UseContextAllTasks'
import MainToDo from './pages/toDoList/MainToDo'

function App() {


  return (
    <>
     <TasksContextProvider >
      <MainToDo />
    </TasksContextProvider>
     
    </>
  )
}

export default App
