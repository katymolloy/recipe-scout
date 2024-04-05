import { useEffect, useState } from "react"
import './widget.scss'
import RecipeCard from "../RecipeCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getSearchResults } from "../../Utilities/api";

export default function Widget({ food, userLoggedIn, currentUser, addApiCall }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        let currCount = addApiCall(1)
        if (currCount === true) {
            getWidgetData()
        } else {
            clearTimeout(apiTimeout)
            addApiCall(1)
            let apiTimeout = setTimeout(getWidgetData, 20000);
        }
    }, [food]);


    const getWidgetData = () => {
        getSearchResults(food)
            .then((data) => {
                let widgetData = data.hits.slice(0, 8)
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
                    <div>More recipes here!<FaArrowRight /></div>
                </Link>
            </div>
        </div>
    );
}