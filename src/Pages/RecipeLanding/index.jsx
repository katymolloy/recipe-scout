import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Widget from "../../Components/RecipeWidget";
import CTA from "../../Components/RegisterCTA";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getSearchResults } from "../../Utilities/api";

import "./landing.scss";
import { useNavigate } from "react-router-dom";

export default function Landing({ isAuthenticated, currentUser }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (query.includes(" ") || query.includes(",")) {
        let searchArr = query.split(' ')
      console.log("contains multiple items", searchArr);
    }
    navigate(`/search/${query}`);
  };

  return (
    <>
      <Header />
      <div className="hero">
        <h1>
          Explore Over <strong>1 Million+</strong> <br></br>Unique Recipes
        </h1>
        <span>
          <form action="" className="search-bar">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search Recipes . . ."
              maxLength="100"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" onClick={searchHandler}>
              Search
            </button>
          </form>
        </span>
      </div>
      <div className="container">
        <h2>Fuel the Gains</h2>
        <Widget
          food={"chicken"}
          userLoggedIn={isAuthenticated}
          currentUser={currentUser}
        />

        <h2>Delicious Desserts</h2>
        <Widget
          food={"dessert"}
          userLoggedIn={isAuthenticated}
          currentUser={currentUser}
        />
        <CTA />
        <h2>Fresh Salad Ideas</h2>
        <Widget
          food={"salad"}
          userLoggedIn={isAuthenticated}
          currentUser={currentUser}
        />
      </div>
      <Footer />
    </>
  );
}
