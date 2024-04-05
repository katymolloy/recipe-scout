import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getSearchResults } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";

import './recipeResults.scss'

export default function RecipeResult({ isLoggedIn, currentUser, changeLogin, addApiCall }) {
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getSearchResults(searchItem)
            .then(data => {
                addApiCall(1)
                setRecipes(data.hits)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }, [searchItem])


    return (
        <>
           <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="recipeResultContainer">
                <div className="itemHero">
                <Link to={'/'}>Back</Link>
                    <h1>{searchItem} Recipes</h1>
                </div>
                <div className="cardContainer">
                    {recipes.map((recipe, index) => (
                        <RecipeCard recipe={recipe.recipe} index={index} isLoggedIn={isLoggedIn} currentUser={currentUser} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}