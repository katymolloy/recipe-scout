import { useEffect, useState } from "react"
import './widget.scss'
import { FaHeart } from "react-icons/fa";
import { getFirestoreInstance, getRecipes, saveRecipe } from "../../firebase";

export default function Widget({ food, userLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([])
    const [savedRecipes, setSavedRecipes] = useState([])

    // matt's api credentials: 
    // const apiEnd = 'https://api.edamam.com/search?app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608&q='

    // my (katy) api end
    // const apiEnd = 'https://api.edamam.com/search?app_id=adae4dea&app_key=c5651d467486b3320642ff5762e7442c&q='

    useEffect(() => {
        getRecipes(db, food, setRecipes);
        // console.log(recipes)
    }, [])



    return (
        <div className="widgetContainer">
            {recipes.map((recipe, index) => (

                <div key={index} className="widgetCard">
                   {userLoggedIn ? <div onClick={() => saveRecipe(db, recipe.recipe, currentUser, setSavedRecipes, savedRecipes)}> <FaHeart /></div> : ''}
                    <img src={recipe.recipe.image} alt={recipe.recipe.label}></img>
                    <h2>{recipe.recipe.label}</h2>
                    <div className="recipeInfo">
                        {recipe.recipe.mealType}
                        {recipe.recipe.calories.toFixed(0)} Calories
                    </div>
                </div>
            ))}
        </div>
    )
}