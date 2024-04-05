import { FaHeart, FaFire } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { saveRecipe, getFirestoreInstance, removeRecipe } from "../../firebase";
import { FaHeartBroken } from "react-icons/fa";

import './RecipeCard.scss';

export default function RecipeCard({ recipe, index, isLoggedIn, currentUser, isCookbook, updateRecipes }) {
    const db = getFirestoreInstance();

    const handleSaveRecipe = () => {
        saveRecipe(db, recipe.uri, currentUser);
    };

    const handleRemoveRecipe = () => {
       let updatedRecipes =  removeRecipe(db, currentUser, recipe.uri);
        updateRecipes(updatedRecipes);
    }


    const truncateLabel = (label) => {
        label = label.trim(); // Remove leading and trailing spaces
        if (label.length > 26) {
            return label.substring(0, 30) + '...';
        }
        return label;
    };

    return (
        <div>
            <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`} key={index} className="recipeCard">
                <img src={recipe.image} alt={recipe.label}></img>
            </Link >
            <div className="recipeHeading">
                <h2>{truncateLabel(recipe.label)}</h2>

                {isLoggedIn && !isCookbook && (
                    <div onClick={handleSaveRecipe}>
                        <FaHeart />
                    </div>
                )}
                {isLoggedIn && isCookbook && (
                    <div onClick={handleRemoveRecipe}>
                        <FaHeartBroken />
                    </div>
                )}
            </div>
            <div className="recipeInfo">
                <div>
                    <GiMeal />
                    {recipe.mealType}
                </div>
                <div>
                    <FaFire />
                    {recipe.calories.toFixed(0)} Calories
                </div>
                <div>
                    {recipe.yield} Servings
                </div>
            </div>

        </div >
    );
}
