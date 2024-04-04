import { useEffect, useState } from "react"
import './widget.scss'
import RecipeCard from "../RecipeCard";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { getFirestoreInstance, getRecipes, saveRecipe } from "../../firebase";

export default function Widget({ food, userLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    useEffect(() => {
        getRecipes(db, food, setRecipes);
    }, []);

    return (
        <div className="widgetContainer">
            {/* Map recipes using the RecipeCard component */}
            {recipes.map((recipe, index) => (
                <RecipeCard
                    key={index}
                    recipe={recipe.recipe}
                    index={index}
                    isLoggedIn={userLoggedIn}
                    currentUser={currentUser}
                />
            ))}
            <div className="expandCTA">
                <Link to={`/search/${food}`}>
                    <div>More recipes here!<FaArrowRight /></div>
                </Link>
            </div>
        </div>
    );
}