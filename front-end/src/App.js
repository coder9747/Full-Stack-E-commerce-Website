import logo from './logo.svg';
import './App.css';
import SignIn from './Components/Signin/Singin';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignUp from './Components/SignUp/Signup';
import UserContext from './Components/Context/UserContext';

function App() {
  return (
    <UserContext>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </UserContext>


  );
}

export default App;
