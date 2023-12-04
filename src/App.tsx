import MainToDo from './pages/MainToDo'

import { MyContextProvider } from './hooks/teste';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';


function App() {


  return (
    <>
       <Router>
        <Routes>
        <MyContextProvider>
          <Route path="/a" element={<Login />} />
          <Route path="/tasks" element={<MainToDo />} />
        </MyContextProvider>
        </Routes>
      </Router>



    </>
  )
}

export default App
