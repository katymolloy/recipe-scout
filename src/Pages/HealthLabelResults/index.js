import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getRecipeByDiet, getMoreResults } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";
import { IoMdArrowRoundBack } from "react-icons/io";

import './recipeResults.scss'

/**
 * Health Label Results Page
 */
export default function HealthLabelResult({ isLoggedIn, currentUser, changeLogin }) {
    // Hooks
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])
    const [paginationLink, setPaginationLink] = useState('')
    const [limit, setLimit] = useState(false)

    // Initially uses getRecipeByDiet function and provides the diet to search for
    useEffect(() => {
        getRecipeByDiet(searchItem)
            .then(data => {
                setRecipes(data.hits)
                setPaginationLink(data._links.next.href)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
        // will update when the search item is changed
    }, [searchItem])


    // Function to execute when user clicks more results
    const moreResults = () => {
        getMoreResults(paginationLink)
            .then(data => {
                if (data.more === false) {
                    setLimit(true);
                    return;
                }
                // old recipes are concatenated with new data
                let currRecipes = [...recipes, ...data.hits]
                setRecipes(currRecipes)
                setPaginationLink(data._links.next.href)

            }).catch(error => {
                setLimit(true)
                console.log('Error retrieving recipe data: ', error)
            })
    }



    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />

            {/* The Recipe Result's Container */}
            <div className="recipeResultContainer">

                {/* The Hero for the Search Item's Recipe */}
                <div className="itemHero">
                    <Link to={'/'}><IoMdArrowRoundBack /></Link>
                    <h1>{searchItem} Recipes</h1>
                </div>

                <div className="cardContainer">
                    {recipes.map((recipe, index) => (
                        <RecipeCard recipe={recipe.recipe} key={index} isLoggedIn={isLoggedIn} currentUser={currentUser} />
                    ))}
                </div>

                {/* Pagination Container */}
                <div className="paginationContainer">
                    <ul>
                        {limit === true ?
                            <li className="notActive">End of Results</li>
                            :
                            <li onClick={moreResults}>More Results</li>
                        }
                    </ul>
                </div>

            </div>
            <Footer />
        </>

    )

}