import { useEffect, useState } from "react"
import './widget.scss'
import RecipeCard from "../RecipeCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getSearchResults } from "../../Utilities/api";

export default function Widget({ food, userLoggedIn, currentUser }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getWidgetData()
    }, [food]);


    const getWidgetData = () => {
        // provides 8 recipes with the food prop provided
        let pagination = 12
        getSearchResults(food, pagination, 8)
            .then((data) => {
                let widgetData = data.hits
                setRecipes(widgetData);
            })
    }


    return (
        <div className="widgetContainer">
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
                    <div>More {food} Recipes <FaArrowRight /></div>
                </Link>
            </div>
        </div>
    );
}