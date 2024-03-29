
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Pages/RecipeLanding';
import Cookbook from './Pages/Cookbook';
import Register from './Pages/Register';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import RecipePage from './Pages/RecipePage';
import RecipeResult from './Pages/RecipeResults';
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState('')

  const setLoggedIn = (state, user) => {
    setAuthenticated(state);
    setUserId(user)
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing isAuthenticated={authenticated} currentUser={userId}/>} />
          <Route path='/recipe/:uri' element={<RecipePage />} />
          <Route path='/search/:searchItem' element={<RecipeResult />} />
          <Route path='/cookbook' element={<Cookbook isLoggedIn={authenticated} currentUser={userId} />} />
          <Route path='/login' element={<Login onLogin={setLoggedIn}  />} />
          <Route path='/register' element={<Register onRegister={setLoggedIn} />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
