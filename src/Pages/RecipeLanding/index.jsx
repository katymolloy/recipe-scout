import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import Widget from "../../Components/RecipeWidget"
import CTA from "../../Components/RegisterCTA"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5";

import "./landing.scss";


export default function Landing({ isAuthenticated, currentUser }) {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('')


    const searchHandler = () => {
        console.log('heyy')
    }

    return (
        <>
            <Header />
            <div className="hero">
                <h1>Explore Over 1 Million+ Unique Recipes</h1>
                <span>
                    <form action="" className='search-bar'>
                        <IoSearchOutline />
                        <input
                            type="text"
                            placeholder="Search Recipes . . ."
                            maxLength="100"
                        />
                        <button type="submit">
                            Search
                        </button>
                    </form>
                </span>
            </div>
            <h2>Fuel the Gains</h2>
            <Widget food={'chicken'} userLoggedIn={isAuthenticated} currentUser={currentUser} />


            <h2>Delicious Desserts</h2>
            <Widget food={'dessert'} userLoggedIn={isAuthenticated} currentUser={currentUser} />
            <CTA />
            <h2>Fresh Salad Ideas</h2>
            <Widget food={'salad'} userLoggedIn={isAuthenticated} currentUser={currentUser} />
            <Footer />
        </>
    )
}