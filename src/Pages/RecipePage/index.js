import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewRecipe } from "../../Utilities/api";
import { FaFire } from "react-icons/fa6";

import "./RecipePage.scss";

export default function RecipePage() {
    const { uri } = useParams();
    const [ingredients, setIngredients] = useState([])
    const [healthLabels, setHealthLabels] = useState([])
    const [dietLabels, setDietLabels] = useState([])
    const [recipe, setRecipe] = useState([])
    const [cals, setCals] = useState('')

    useEffect(() => {
        if (uri !== undefined) {
            viewRecipe(uri)
                .then(data => {
                    const first = data.hits[0]
                    console.log(first.recipe)
                    setRecipe(first.recipe)
                    setIngredients(first.recipe.ingredientLines)
                    setHealthLabels(first.recipe.healthLabels)
                    setDietLabels(first.recipe.dietLabels)
                    setCals(first.recipe.calories.toFixed(0))

                }).catch(error => {
                    console.log('Error retrieving recipe data: ', error)
                })
        }

    }, [])


    return (
        <>
            <Header />
            <div className="recipePage">
                {recipe ?
                    <div className="titleCard">
                        <div className="topSection">
                            <h1>{recipe.label}</h1>
                        </div>
                        <div className="quickInfo">
                            <div><FaFire />{cals} Calories</div>
                            <div>     {dietLabels.map((label, index) => {
                                return <p key={index}>{label}</p>
                            })}</div>
                        </div>
                        <img src={recipe.image} alt={recipe.label}></img>
                        <ul>
                            {ingredients.map((ingredient, index) => {
                                return <li key={index}>{ingredient}</li>
                            })}
                        </ul>
                        <ul>
                            {healthLabels.map((label, index) => {
                                return <li key={index}>{label}</li>
                            })}
                        </ul>

                        <div className="recipeLink">
                            <a href={recipe.url}> Grab the recipe here!</a>

                        </div>
                    </div>
                    :
                    <h1>Loading ... </h1>
                }
            </div>
            <Footer />
        </>
    )
}