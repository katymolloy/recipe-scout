import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getSearchResults } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";

import './recipeResults.scss'

export default function RecipeResult({ isLoggedIn, currentUser, changeLogin, addApiCall }) {
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])
    const [pagination, setPagination] = useState(1);
    const [resultCount, setResultCount] = useState(0);
    // const [pageNum, setPageNum] = useState([])

    useEffect(() => {
        // getRecipes();
        getSearchResults(searchItem, pagination, 30)
        .then(data => {
            addApiCall(1)
            console.log(data)
            setRecipes(data.hits)
            setResultCount(data.count)
            // setPageNum((resultCount / 30))
        }).catch(error => {
            console.log('Error retrieving recipe data: ', error)
        })
    }, [searchItem, pagination])


    const increasePageNum = () => {
        let newPage = pagination + 20;
        setPagination(newPage)
        console.log(pagination)
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="recipeResultContainer">
                <div className="itemHero">
                    <Link to={'/'}>Back</Link>
                    <h1>{searchItem} Recipes</h1>
                </div>
                <div className="cardContainer">
                    {recipes.map((recipe, index) => (
                        <RecipeCard recipe={recipe.recipe} key={index} isLoggedIn={isLoggedIn} currentUser={currentUser} />
                    ))}
                </div>
                <div className="paginationContainer">
                    <ul>
                <li onClick={increasePageNum}>click me</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}