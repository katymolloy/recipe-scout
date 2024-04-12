import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Widget from "../../Components/RecipeWidget";
import CTA from "../../Components/RegisterCTA";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

import "./landing.scss";
import { useNavigate } from "react-router-dom";

export default function Landing({
  isLoggedIn,
  currentUser,
  changeLogin,
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${query}`);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
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
        <h2>Fuel The Gains</h2>
        <Widget
          food={"chicken"}
          userLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />

        <h2>Delicious Desserts</h2>
        <Widget
          food={"dessert"}
          userLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
        <CTA />
        <h2>Fresh Salad Ideas</h2>
        <Widget
          food={"salad"}
          userLoggedIn={isLoggedIn}
          currentUser={currentUser}
        />
      </div>
      <Footer />
    </>
  );
}
