import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './routes/Login';

function App() {
  const navigate = useNavigate();    

  return (
    <div className="App">
      hello react
      <button onClick={()=>{navigate('/')}}>홈</button>
      <button onClick={()=>{navigate('/login')}}>로그인</button>
      <Routes>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </div>
  );
}

export default App;
