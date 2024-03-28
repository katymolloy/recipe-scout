import { FaFire } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

export default function RecipeCard({ recipe, index }) {
    return (
        <div key={index}>
            <img src={recipe.image} alt={recipe.label}></img>
            <h2>{recipe.label}</h2>
            <div className="recipeInfo">
                <div><GiMeal />{recipe.mealType}</div>
                <div><FaFire />{recipe.calories.toFixed(0)} Calories</div>
            </div>
        </div>
    )
}