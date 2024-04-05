import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewRecipe } from "../../Utilities/api";
import { FaFire } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";

import "./RecipePage.scss";

export default function RecipePage({ isLoggedIn, changeLogin, addApiCall }) {

    const { uri } = useParams();
    const [ingredients, setIngredients] = useState([])
    const [healthLabels, setHealthLabels] = useState([])
    const [dietLabels, setDietLabels] = useState([])
    const [totalNutrients, setTotalNutrients] = useState([])
    const [recipe, setRecipe] = useState([])
    const [cals, setCals] = useState('')

    useEffect(() => {
        if (uri !== undefined) {

            viewRecipe(uri)
                .then(data => {
                    const first = data.hits[0]
                    addApiCall(1)
                    setRecipe(first.recipe)
                    setIngredients(first.recipe.ingredientLines)
                    setHealthLabels(first.recipe.healthLabels)
                    setDietLabels(first.recipe.dietLabels)
                    setTotalNutrients(first.recipe.totalNutrients);
                    setCals(first.recipe.calories.toFixed(0))

                }).catch(error => {
                    console.log('Error retrieving recipe data: ', error)
                })

        }
    }, [])


    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="recipePage">

                <div className="topSection">
                    <h1>
                        {recipe.label}{' '}
                        {recipe.totalTime > 0 && (
                            <>
                                <FaRegClock /> {recipe.totalTime} min
                            </>
                        )}
                    </h1>
                </div>

                {recipe ?

                    <div className="titleCard">

                        <div className='medium-heading'>Ingredients</div>

                        <ul>
                            {ingredients.map((ingredient, index) => {
                                return <li key={index}>{ingredient}</li>
                            })}
                        </ul>

                        <div className="quickInfo">

                            <div className='small-heading'>Nutrition Data</div>

                            <div className='yield'>Per {recipe.yield} Serving Size</div>

                            <div className='recipe-information'>
                                <div>
                                    <ul>
                                        {/* <li className = 'carbs'>{recipe.totalNutrients.CHOCDF.label}</li>
                                        <li className = 'protein'>{recipe.totalNutrients.PROCNT.label}</li>
                                        <li className = 'fats'>{recipe.totalNutrients.FAT.label}</li> */}
                                        <li className='carbs'>Carb</li>
                                        <li className='protein'>Protein</li>
                                        <li className='fats'>Fat</li>
                                    </ul>
                                </div>
                                <div className='calory-section'><FaFire />{cals} cals</div>
                            </div>

                            {/* <div>
                                {dietLabels.map((label, index) => {
                                    return <p key={index}>{label}</p>
                                })}
                            </div> */}
                        </div>

                        <img src={recipe.image} alt={recipe.label}></img>

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