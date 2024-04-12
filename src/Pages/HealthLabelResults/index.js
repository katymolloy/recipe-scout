import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { getRecipeByDiet } from "../../Utilities/api";
import RecipeCard from "../../Components/RecipeCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";

import './recipeResults.scss'

export default function HealthLabelResult({ isLoggedIn, currentUser, changeLogin }) {
    const { searchItem } = useParams();
    const [recipes, setRecipes] = useState([])
    const [pagination, setPagination] = useState(1);

    useEffect(() => {
        getRecipeByDiet(searchItem, pagination, 28)
            .then(data => {
                setRecipes(data.hits)
            }).catch(error => {
                console.log('Error retrieving recipe data: ', error)
            })
    }, [searchItem, pagination])


    // pagination functions below
    const increasePageNum = () => {
        let newPage = pagination + 28;
        setPagination(newPage)
    }

    const decreasePageNum = () => {
        console.log('back')
        if (pagination > 28) {
            let newPage = pagination - 28;
            console.log(newPage)
            setPagination(newPage)
        } else {
            return;
        }
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
                        <li onClick={decreasePageNum}><IoMdArrowRoundBack />Back</li>
                        <li onClick={increasePageNum}>Next<IoMdArrowRoundForward /></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}