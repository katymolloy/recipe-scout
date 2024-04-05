
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

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userId, setUserId] = useState('');
  const [apiCalls, setApiCalls] = useState(0)

  useEffect(() => {
    console.log(apiCalls)
    const intervalId = setInterval(() => {
      console.log('api call reset')
        setApiCalls(0); // Reset API call count to 0 every minute
    }, 60000); 
    return () => clearInterval(intervalId);
}, []);

  const setLoggedIn = (state, user) => {
    setAuthenticated(state);
    setUserId(user)
  }

  const increaseCallNum = (num) => {
    if (apiCalls >= 10) {
      setApiCalls(0)
      return false;
    } if (apiCalls < 10) {
      setApiCalls(prevCount => prevCount + num);
      return true;
    }
  }




  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId} addApiCall={increaseCallNum} />} />
          <Route path='/recipe/:uri' element={<RecipePage isLoggedIn={authenticated} changeLogin={setLoggedIn} addApiCall={increaseCallNum} />} />
          <Route path='/search/:searchItem' element={<RecipeResult isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId} addApiCall={increaseCallNum} />} />
          <Route path='/cookbook' element={<Cookbook isLoggedIn={authenticated} changeLogin={setLoggedIn} currentUser={userId} addApiCall={increaseCallNum} />} />
          <Route path='/login' element={<Login onLogin={setLoggedIn} />} />
          <Route path='/register' element={<Register onRegister={setLoggedIn} />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
