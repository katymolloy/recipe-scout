import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getSearchResults } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";
import { IoMdArrowRoundBack } from "react-icons/io";

import './recipeResults.scss'


/**
 * Recipe Results Page
 */
export default function RecipeResult({ isLoggedIn, currentUser, changeLogin }) {

    // Hooks
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])
    const [pagination, setPagination] = useState(1);
    const [limit, setLimit] = useState(false)

    useEffect(() => {
        getSearchResults(searchItem, pagination, 28)
            .then(data => {
                setRecipes(data.hits)
                console.log(data)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }, [searchItem])


    // gives more results
    const moreResults = () => {
        let newPage = pagination + 28;
        // set limit for results
        setPagination(newPage)

        getSearchResults(searchItem, pagination, 28)
            .then(data => {
                // if there isn't more data, limit is true
                if (data.more === false) {
                    setLimit(true);
                    return;
                }
                // old recipes are concatenated with new data
                let currRecipes = [...recipes, ...data.hits]
                setRecipes(currRecipes)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }


    return (

        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="recipeResultContainer">

                <div className="itemHero">
                    <Link to={'/'}><IoMdArrowRoundBack /></Link>
                    <h1>{searchItem} Recipes</h1>
                </div>

                <div className="cardContainer">
                    {recipes.map((recipe, index) => (
                        <RecipeCard recipe={recipe.recipe} key={index} isLoggedIn={isLoggedIn} currentUser={currentUser} />
                    ))}
                </div>

                <div className="paginationContainer">
                    <ul>
                        {limit === true ?
                            <li className="notActive">End of Results</li> :
                            <li onClick={moreResults}>More Results</li>
                        }
                    </ul>
                </div>

            </div>
            <Footer />
        </>

    )

}