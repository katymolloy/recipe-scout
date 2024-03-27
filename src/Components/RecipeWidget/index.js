import { useEffect, useState } from "react"
import './widget.scss'
import { FaHeart } from "react-icons/fa";
import { doc, setDoc } from 'firebase/firestore'
import { getFirestoreInstance } from "../../firebase";

export default function Widget({ food, userLoggedIn }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([])
    const apiEnd = 'https://api.edamam.com/search?app_id=adae4dea&app_key=c5651d467486b3320642ff5762e7442c&q='

    useEffect(() => {
        const getRecipes = async () => {
            try {
                let getData = apiEnd + food
                const response = await fetch(getData)
                const recipes = await response.json();
                console.log(recipes.hits)
                let apiResponse = recipes.hits
                let topFourRecipe = apiResponse.slice(1, 5)
                setRecipes(topFourRecipe)
            } catch {
                console.log('Error retreiving recipes')

            }
        }
        getRecipes();
    })

    const saveRecipe = async (uri) => {
    //     await setDoc(doc(db, "users", currentUser), {
    //         recipes:
    //   });
    }

    return (
        <div className="widgetContainer">
            {recipes.map((recipe, index) => (

                <div key={index} className="widgetCard">
                    {userLoggedIn ? <div onClick={() => saveRecipe(recipe.recipe.uri)}> <FaHeart /></div> : ''}
                    <img src={recipe.recipe.image} alt={recipe.recipe.label}></img>
                    <h2>{recipe.recipe.label}</h2>
                    <div className="recipeInfo">
                        {recipe.recipe.mealType}
                        {recipe.recipe.calories.toFixed(0)} Calories
                    </div>
                </div>
            ))}
        </div>
    )
}