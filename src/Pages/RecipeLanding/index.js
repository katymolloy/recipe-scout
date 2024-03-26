import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import Widget from "../../Components/RecipeWidget"
import CTA from "../../Components/RegisterCTA"
import { useEffect, useState } from "react"


export default function Landing() {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('')

    // const appIdKey = '&app_id=adae4dea&app_key=c5651d467486b3320642ff5762e7442c'
    // useEffect(() => {
    //     const getRecipes = async () => {
    //         try {
    //             const response = await fetch('https://api.edamam.com/search?q=&diet=omnivore&')
    //         } catch {

    //         }
    //     }

    // }, [])

    const searchHandler = () => {
        console.log('heyy')
    }

    return (
        <>
            <Header />
            <h1>Explore Over 1 Million Unique Recipes</h1>
            <input type="text"></input><button type="button" onClick={searchHandler}>Search</button>

            <h2>Fuel the Gains</h2>
            <Widget food={'chicken'}></Widget>

    <CTA />
            <h2>Delicious Desserts</h2>
            <Widget food={'dessert'}></Widget>
            <h2>Fresh Salad Ideas</h2>
            <Widget food={'salad'}></Widget>
            <Footer />
        </>
    )
}