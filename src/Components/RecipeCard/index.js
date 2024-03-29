import { FaFire } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, index }) {
    return (
        <div key={index}>
            <img src={recipe.image} alt={recipe.label}></img>
            <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`}> <h2>{recipe.label}</h2></Link>
            <div className="recipeInfo">
                <div><GiMeal />{recipe.mealType}</div>
                <div><FaFire />{recipe.calories.toFixed(0)} Calories</div>
            </div>
        </div>
    )
}