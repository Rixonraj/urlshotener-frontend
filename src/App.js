
import './App.css';
import { BrowserRouter, Routes, Route, useParams, Link, Navigate } from 'react-router-dom'
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Forgotpassword from './Components/Forgotpassword';
import Emailverify from './Components/Emailverify';
import Newpassword from './Components/Newpassword';
import GoTo from './Components/GoTo';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/reset' element={<Forgotpassword />}></Route>
        <Route path='/emailVerification/:id' element={<Emailverify />}></Route>
        <Route path='/updatePassword/:id' element={<Newpassword />}></Route>
        <Route path='/goto/:id' element={<GoTo />}></Route>
        <Route path='/home'>
          <Route path=':userid' element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
