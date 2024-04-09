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

    /* Nutrients */
    const [carbs, setCarbs] = useState('')
    const [protein, setProtein] = useState('')
    const [fat, setFat] = useState('')
    const [unitCarb, setUnitCarb] = useState('')
    const [unitProtein, setUnitProtein] = useState('')
    const [unitFat, setUnitFat] = useState('')

    /* Health Labels */
    const [fixedHealthLabels, setFixedHealthLabel] = useState(['Gluten-Free', 'Egg-Free', 'Peanut-Free', 'Pork-Free', 'Alcohol-Free', 'Sugar-Conscious']);
    const [hasSameLabels, setHasSameLabels] = useState(false);

    /* Calories */
    const [cals, setCals] = useState('')

    useEffect(() => {
        if (uri !== undefined) {

            viewRecipe(uri)
                .then(data => {
                    const first = data.hits[0]
                    addApiCall(1)
                    console.log(first.recipe)
                    setRecipe(first.recipe)

                    setIngredients(first.recipe.ingredientLines)
                    setHealthLabels(first.recipe.healthLabels)
                    setDietLabels(first.recipe.dietLabels)

                    setTotalNutrients(first.recipe.totalNutrients)

                    setCals(first.recipe.calories.toFixed(0))

                    setCarbs(first.recipe.totalNutrients.CHOCDF.quantity.toFixed(0))
                    setProtein(first.recipe.totalNutrients.PROCNT.quantity.toFixed(0))
                    setFat(first.recipe.totalNutrients.FAT.quantity.toFixed(0))
                    setUnitCarb(first.recipe.totalNutrients.CHOCDE.unit)
                    setUnitProtein(first.recipe.totalNutrients.PROCNT.unit)
                    setUnitFat(first.recipe.totalNutrients.FAT.unit)

                    //setDairy(first.recipe.healthLabels.)

                }).catch(error => {
                    console.log('Error retrieving recipe data: ', error)
                })

        }
    }, [])


    /* useEffect for the health labels */
    useEffect(() => {

        // Checks to see if any of the healthLabels relate to the fixedHealthLabels array
        const hasSameHealthLabels = fixedHealthLabels.some(label => healthLabels.includes(label));

        if (hasSameHealthLabels) {
            setHasSameLabels(true);
        }

    }, [healthLabels, fixedHealthLabels])


    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="recipePage">

                <div className="topSection">
                    <h1>
                        {recipe.label}{' '}
                    </h1>
                    <h1>
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

                        <ol>
                            {ingredients.map((ingredient, index) => {
                                return <li key={index}>{ingredient}</li>
                            })}
                        </ol>


                        <div className='top-section'>

                            <div className="quickInfo">

                                <div className='small-heading'>Nutrition Data</div>

                                <div className='yield'>Per {recipe.yield} Serving Size</div>

                                <div className='recipe-information'>
                                    <div>
                                        <ul>
                                            {/* <li className = 'carbs'>{recipe.totalNutrients.CHOCDF.label}</li>
            <li className = 'protein'>{recipe.totalNutrients.PROCNT.label}</li>
            <li className = 'fats'>{recipe.totalNutrients.FAT.label}</li> */}
                                            <li className='carbs'>Carbs</li>
                                            <div>{carbs} {unitCarb}</div>
                                        </ul>
                                        <ul>
                                            <li className='protein'>Protein</li>
                                            <div>{protein} {unitProtein}</div>
                                        </ul>
                                        <ul>
                                            <li className='fats'>Fat</li>
                                            <div>{fat} {unitFat}</div>
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


                            <div className='image-container'>
                                <img src={recipe.image} alt={recipe.label}></img>
                            </div>

                        </div>


                        <ul>
                            {healthLabels.map((label, index) => {
                                return <li key={index}>{label}</li>
                            })}
                        </ul>


                        <div className='recipe-steps'>

                            {/* Replace all the stuff below with the database logic */}
                            <div className='recipe-steps-heading'>
                                <div className='medium-heading'>Health Labels</div>
                                <div className='step-counter'>5 steps</div>
                            </div>



                            <h2>Step 1</h2>

                            <div className='steps-description'>
                                Heat the olive oil in a skillet over medium heat. Add the ground beef. Season with 1/4 tsp of salt
                                and cook for about 8-10 minutes, stirring occassionally. Drain the meat and set it aside.
                            </div>

                            <h2>Step 2</h2>

                            <div className='steps-description'>
                                Heat the olive oil in a skillet over medium heat. Add the ground beef. Season with 1/4 tsp of salt
                                and cook for about 8-10 minutes, stirring occassionally. Drain the meat and set it aside.
                            </div>

                            <h2>Step 3</h2>

                            <div className='steps-description'>
                                Heat the olive oil in a skillet over medium heat. Add the ground beef. Season with 1/4 tsp of salt
                                and cook for about 8-10 minutes, stirring occassionally. Drain the meat and set it aside.
                            </div>

                        </div>


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