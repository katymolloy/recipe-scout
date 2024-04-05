import { useEffect, useState } from "react"
import './widget.scss'
import RecipeCard from "../RecipeCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getFirestoreInstance, getRecipes } from "../../firebase";
import { getSearchResults } from "../../Utilities/api";

export default function Widget({ food, userLoggedIn, currentUser, addApiCall }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([]);


    useEffect(() => {
        // getRecipes(db, food, setRecipes);
        getSearchResults(food)
            .then((data) => {
            addApiCall(1)
                let widgetData = data.hits.slice(0, 8)
                setRecipes(widgetData);
            })
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