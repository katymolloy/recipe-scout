import { useEffect, useState } from "react"
import './widget.scss'
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { getFirestoreInstance, getRecipes, saveRecipe } from "../../firebase";

export default function Widget({ food, userLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])


    useEffect(() => {
        getRecipes(db, food, setRecipes);

    }, [])


    // const formatData = (recipes) => {
    //     let newData = [...recipes]
    //         newData.forEach((recipe) => {
    //         let title = recipe.recipe.label;
    //         let captalize = title.split(" ");
    //         let fixedTitle = []

    //         for (let i = 0; i < captalize.length; i++) {
    //             let fixedWord = captalize[i].charAt(0).toUpperCase() + captalize[i].slice(1);
    //             fixedTitle.push(fixedWord)
    //         }
    //        let newTitle =  fixedTitle.join(" ")
    //         recipe.recipe.label === newTitle
    //     })
    // }

    return (
        <div className="widgetContainer">
            {recipes.map((recipe, index) => (

                <div key={index} className="widgetCard">
                    {userLoggedIn ? <div onClick={() => saveRecipe(db, recipe.recipe, currentUser, setSavedRecipes, savedRecipes)}> <FaHeart /></div> : ''}
                    <img src={recipe.recipe.image} alt={recipe.recipe.label}></img>
                    <Link to={`/${recipe.recipe.uri}`}> <h2>{recipe.recipe.label}</h2></Link>
                    <div className="recipeInfo">
                        <div><FaThumbsUp />

                            <div>{recipe.recipe.dietLabels[0]} </div>
                            <div>  {recipe.recipe.dietLabels[1]}</div>
                            <div>  {recipe.recipe.dietLabels[2]}</div>


                        </div>
                        <div><GiMeal />{recipe.recipe.mealType}</div>
                        <div><FaFire />{recipe.recipe.calories.toFixed(0)} Calories</div>
                    </div>
                </div>
            ))}
            <div className="expandCTA">
                <div>More recipes here!<FaArrowRight /></div>

            </div>
        </div>
    )
}