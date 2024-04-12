
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './Pages/RecipeLanding';
import Cookbook from './Pages/Cookbook';
import Register from './Pages/Register';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import RecipePage from './Pages/RecipePage';
import RecipeResult from './Pages/RecipeResults';
import { useEffect, useState } from 'react';
import HealthLabelResult from './Pages/HealthLabelResults';

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState('');


  // function to manage if the user is logged in, as well as store their uid
  const setLoggedIn = (state, user) => {
    setAuthenticated(state);
    setUserId(user)
  }


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId}  />} />
          <Route path='/recipe/:uri' element={<RecipePage isLoggedIn={authenticated} changeLogin={setLoggedIn}  />} />
          <Route path='/search/:searchItem' element={<RecipeResult isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId}  />} />
          <Route path='/diet/:searchItem' element={<HealthLabelResult isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId}  />} />
          <Route path='/cookbook' element={<Cookbook isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId}  />} />
          <Route path='/login' element={<Login onLogin={setLoggedIn} />} />
          <Route path='/register' element={<Register onRegister={setLoggedIn} />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
