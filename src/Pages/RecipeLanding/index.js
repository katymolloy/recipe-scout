import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import Widget from "../../Components/RecipeWidget"
import CTA from "../../Components/RegisterCTA"
import {useState } from "react"


export default function Landing({isAuthenticated, currentUser}) {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('')


    const searchHandler = () => {
        console.log('heyy')
    }

    return (
        <>
            <Header />
            <h1>Explore Over 1 Million Unique Recipes</h1>
            <input type="text"></input><button type="button" onClick={searchHandler}>Search</button>

            <h2>Fuel the Gains</h2>
            <Widget food={'chicken'} userLoggedIn={isAuthenticated} currentUser={currentUser}/>

    <CTA />
            <h2>Delicious Desserts</h2>
            <Widget food={'dessert'} userLoggedIn={isAuthenticated} currentUser={currentUser}/>
            <h2>Fresh Salad Ideas</h2>
            <Widget food={'salad'} userLoggedIn={isAuthenticated} currentUser={currentUser}/>
            <Footer />
        </>
    )
}