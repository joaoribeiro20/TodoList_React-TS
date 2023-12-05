import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import MainToDo from '../pages/MainToDo';

import Cadastro from '../pages/Cadastro';

/* import ErrorPage from './componets/errorPage.js'; */



function router() {
  return  (
    <>
    <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/task' element={<MainToDo />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
          {/* <Route errorElement={<ErrorPage />}/> */}
        </Routes>
      </Router>
    </>
      
  );
}

export default router