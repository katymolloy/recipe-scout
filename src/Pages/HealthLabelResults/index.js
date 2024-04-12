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
    const [paginationLink, setPaginationLink] = useState([])
    // const [nextPage, setNextPage] = useState('')
    // const [lastPage, setLastPage] = useState('')
    const [limit, setLimit] = useState(false)

    // initially uses getRecipeByDiet function and provides the diet to search for
    useEffect(() => {
        getRecipeByDiet(searchItem)
            .then(data => {
                setRecipes(data.hits)
                // the next page link is stored in an array for pagination\
                let nextPage = [data._links.next.href]
                setPaginationLink(nextPage)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
        // will update when the search item is changed
    }, [searchItem])




    // function to execute when user clicks next
    const nextPageHandler = () => {
        // first data is retrieved from endpoint
        getNextPage(paginationLink[paginationLink.length - 1])
            .then(data => {
                // if the data is undefined, the 'next' button is blocked out
                if (data === undefined) {
                    setLimit(true);
                    return;
                } else {
                    // if data is not defined, the recipes are set and the next page is stored in state
                    setRecipes(data.hits)
                    let updatedPagination = [...paginationLink, data._links.next.href]
                    setPaginationLink(updatedPagination)
                    console.log('From next, updated pagination', paginationLink)
                }
            }).catch(error => {
                setLimit(true)
                console.log('Error retrieving recipe data: ', error)
            })
    }

    const backPageHandler = () => {
        let updatedPagination = [...paginationLink]
        let newPagination = updatedPagination.slice(0, -1); // Removes the last link
        setPaginationLink(newPagination);
        console.log('From back, updated pagination', newPagination)

        let link = newPagination[newPagination.length - 1];
        getNextPage(link)
            .then(data => {
                setRecipes(data.hits);
                let newPagination = [...paginationLink, data._links.next.href];
                setPaginationLink(newPagination)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error);
            });
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