import { FaHeart, FaFire } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { Link } from "react-router-dom";
import { saveRecipe, getFirestoreInstance } from "../../firebase";
import { useEffect, useState } from "react";

import './RecipeCard.scss';

export default function RecipeCard({ recipe, index, isLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [savedRecipes, setSavedRecipes] = useState([]);

    const handleSaveRecipe = () => {
        saveRecipe(db, recipe.uri, currentUser, setSavedRecipes, savedRecipes);
    };

    const truncateLabel = (label) => {
        label = label.trim(); // Remove leading and trailing spaces
        if (label.length > 26) {
            return label.substring(0, 30) + '...';
        }
        return label;
    };

    return (
        <Link to={`/recipe/${encodeURIComponent(recipe.uri)}`} key={index} className="recipeCard">
            <img src={recipe.image} alt={recipe.label}></img>
            <div className="recipeHeading">
                <h2>{truncateLabel(recipe.label)}</h2>
                {isLoggedIn && (
                    <div onClick={handleSaveRecipe}>
                        <FaHeart />
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
        </Link >
    );
}
