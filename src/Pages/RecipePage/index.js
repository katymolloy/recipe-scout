import Header from "../../Components/Header"
import Footer from "../../Components/Footer"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewRecipe } from "../../Utilities/api";

export default function RecipePage() {
    const { uri } = useParams();
    const [recipeId, setRecipeId] = useState(uri)
    const [recipe, setRecipe] = useState([])

    useEffect(() => {
        if (uri !== undefined) {
            viewRecipe(uri)
                .then(data => {
                    setRecipe(data.hits)
                }).catch(error => {
                    console.log('Error retrieving recipe data: ', error)
                })
        }
        console.log(recipe)

    }, [recipeId])


    return (
        <div>
            {/* <Header /> */}
            {recipe ?
                <div className="titleCard">

                    <h1>{recipe.label}</h1>
                    {recipe.image}
                </div>
                :
                <h1>Loading ... </h1>
            }

            {/* <Footer /> */}

        </div>
    )
}