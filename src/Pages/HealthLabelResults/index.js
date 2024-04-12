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

    useEffect(() => {
        getRecipeByDiet(searchItem)
            .then(data => {
                setRecipes(data.hits)
                let pageArray = []
                pageArray.push(data._links.next.href)
                setNextPage(pageArray[0]);
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }, [searchItem])


    const nextPageHandler = () => {
        getNextPage(nextPage)
            .then(data => {
                setRecipes(data.hits)
                let pageArray = [... nextPage]
                pageArray.push(data._links.next.href)
                setNextPage(pageArray);
                console.log(nextPage)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }


    const backPageHandler = () => {
        let previousPage = nextPage.splice(nextPage.length - 1, 1)
        setNextPage(previousPage)
        getNextPage(nextPage[nextPage.length - 1])
            .then(data => {
                setRecipes(data.hits)
                let pageArray = [... nextPage]
                pageArray.push(data._links.next.href)
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
                        <li onClick={nextPageHandler}>Next<IoMdArrowRoundForward /></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}