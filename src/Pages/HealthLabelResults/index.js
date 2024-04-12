import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getRecipeByDiet, getNextPage } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

import './recipeResults.scss'

export default function HealthLabelResult({ isLoggedIn, currentUser, changeLogin }) {
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])
    const [nextPage, setNextPage] = useState([])
    const [limit, setLimit] = useState(false)

    // initially uses getRecipeByDiet function and provides the diet to search for
    useEffect(() => {
        getRecipeByDiet(searchItem)
            .then(data => {
                setRecipes(data.hits)
                // the next page link is stored in an array for pagination
                let pageArray = [data._links.next.href]
                setNextPage(pageArray);
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
        // will update when the search item is changed
    }, [searchItem])

    useEffect(() => {
        console.log('Last page: ', nextPage[nextPage.length -1])
    }, [nextPage])


    // function to execute when user clicks next
    const nextPageHandler = () => {
        // first data is retrieved from endpoint
        getNextPage(nextPage)
            .then(data => {
                // if the data is undefined, the 'next' button is blocked out
                if (data === undefined) {
                    setLimit(true);
                    return;
                } else {
                    // if data is not defined, the recipes are set and the next page is stored in state
                    setRecipes(data.hits)
                    let pageArray = [...nextPage, data._links.next.href]
                    setNextPage(pageArray);
                }
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }


    const backPageHandler = () => {
        // to go back, the state is copied, and the item at the last index is removed
        let lastPage = [...nextPage]
        lastPage.splice(lastPage.length - 1, 1);
        // state is then updated
        setNextPage(lastPage)
        
        // api is then called based on the new last item in array
        getNextPage(nextPage[nextPage.length - 1])
            .then(data => {
                setRecipes(data.hits)
                // the next page is added to state
                let pageArray = [...nextPage, data._links.next.href]
                setNextPage(pageArray);
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
                        <li onClick={backPageHandler}><IoMdArrowRoundBack />Back</li>
                        {limit === true ?
                            <li className="notActive">Next<IoMdArrowRoundForward /></li>
                            :
                            <li onClick={nextPageHandler}>Next<IoMdArrowRoundForward /></li>
                        }
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}