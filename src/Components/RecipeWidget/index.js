import { useEffect, useState } from "react"
import './widget.scss'
import { FaHeart } from "react-icons/fa";
import { arrayUnion, doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirestoreInstance } from "../../firebase";

export default function Widget({ food, userLoggedIn, currentUser }) {
    const db = getFirestoreInstance();
    const [recipes, setRecipes] = useState([])

    // matt's api credentials: 
    // const apiEnd = 'https://api.edamam.com/search?app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608&q='

    // my (katy) api end
    // const apiEnd = 'https://api.edamam.com/search?app_id=adae4dea&app_key=c5651d467486b3320642ff5762e7442c&q='

    useEffect(() => {
        const getRecipes = async () => {
            let docName = food + 'Widget'
            const docRef = doc(db, 'recipes', docName)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log('Widget data retrieved')
                setRecipes(docSnap.data().recipes)
            } else {
                console.log('Error retrieving widget data from db')
            }
        }
        getRecipes();
    }, [])


    // have to first check for duplicated
    const saveRecipe = async (uri) => {
        console.log(uri)
        console.log(currentUser)
        const recipeRef = doc(db, 'users', currentUser);

        await setDoc(recipeRef, {
            recipes: arrayUnion(uri)
        }, { merge: true })
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