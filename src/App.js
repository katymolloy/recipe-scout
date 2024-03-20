import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Pages/RecipeLanding';
import Cookbook from './Pages/Cookbook';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  const login = () => {
    setAuthenticated(true);
    console.log('user is logged in')
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/cookbook' element={<Cookbook/>} />
          <Route path='/login' element={<Login onLogin={login} />} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
