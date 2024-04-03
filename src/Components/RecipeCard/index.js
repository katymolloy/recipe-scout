import { FaFire } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { saveRecipe, getFirestoreInstance, getUserData } from "../../firebase";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";


export default function RecipeCard({ recipe, index, isLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [savedRecipes, setSavedRecipes] = useState([])

    return (
        <div key={index}>
            {isLoggedIn ? <div onClick={() => saveRecipe(db, recipe.uri, currentUser, setSavedRecipes, savedRecipes)}> <FaHeart /></div> : ''}
            <img src={recipe.image} alt={recipe.label}></img>
            <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`}> <h2>{recipe.label}</h2></Link>
            <div className="recipeInfo">
                <div><GiMeal />{recipe.mealType}</div>
                <div><FaFire />{recipe.calories.toFixed(0)} Calories</div>
            </div>
        </div>
    )
}