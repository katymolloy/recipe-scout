import { FaHeart, FaFire } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { saveRecipe, getFirestoreInstance, removeRecipe } from "../../firebase";
import { FaHeartBroken } from "react-icons/fa";

import './RecipeCard.scss';


/**
 * Recipe Card Component for Recipes
 */
export default function RecipeCard({ recipe, index, isLoggedIn, currentUser, isCookbook, updateRecipes }) {

    const db = getFirestoreInstance();

    // Save Recipe
    const handleSaveRecipe = () => {
        saveRecipe(db, recipe.uri, currentUser);
    };

    // Remove Recipe
    const handleRemoveRecipe = () => {
        let updatedRecipes = removeRecipe(db, currentUser, recipe.uri);
        updateRecipes(updatedRecipes);
    }

    return (

        <div className="recipeCard">

            <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`} key={index}>
                <img src={recipe.image} alt={recipe.label} loading="lazy"></img>
            </Link >

            {/* Recipes' Heading */}
            <div className="recipeHeading">
                <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`} key={index}>
                    <h2>{recipe.label}</h2>
                </Link >
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

            {/* Recipes' Information */}
            <div className="recipeInfo">
                <div>
                    <GiMeal />
                    {recipe.mealType[0]}
                </div>
                <div>
                    <FaFire />
                    {recipe.calories.toFixed(0)} Calories
                </div>
                <div>
                    {recipe.yield.toFixed(0)} Servings
                </div>
            </div>

        </div>

    );

}
