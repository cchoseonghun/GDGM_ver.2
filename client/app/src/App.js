import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Groups from './components/Groups';
import Nav from './components/Nav';
import Register from './components/Register';

function App() {
  let state = useSelector((state)=> state );

  return (
    <div className="App">
      <Nav />
      <Routes>
        {
          state.user.isLogin ?
          <Route path='/' element={ <Groups /> }></Route> :
          <Route path='/' element={ <Login /> }></Route>
        }
        <Route path='/login' element={ <Login /> }></Route>
        <Route path='/register' element={ <Register /> }></Route>
        {/* <Route path='/raid' element={ <Raid /> }></Route> */}
      </Routes>
    </div>
  );
}

export default App;
