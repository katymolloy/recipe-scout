import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { getFirestoreInstance, getUserData } from "../../firebase";
import RecipeCard from "../../Components/RecipeCard";
import { IoEllipseSharp } from "react-icons/io5";
import { viewRecipe } from "../../Utilities/api";

export default function Cookbook({ isLoggedIn, currentUser, changeLogin }) {
    const [name, setName] = useState('');
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [recipes, setRecipes] = useState([])
    const [isCookbook, setIsCookbook] = useState(true)
    const db = getFirestoreInstance();

    useEffect(() => {
        if (isLoggedIn === true) {
            getUserData(db, currentUser, setName, setSavedRecipes, savedRecipes);
        } else {
            return;
        }
    }, [currentUser]);


    useEffect(() => {
        if (savedRecipes.length === 0) {
            console.log('Function exited')
            return;
        }

        let promises = savedRecipes.map((recipe) => viewRecipe(recipe));
        Promise.all(promises)
            .then((data) => {
                let recipeData = data.map((data) => data.hits[0].recipe)
                setRecipes(recipeData)
            }).catch((error) => {
                console.log('Error retrieving user recipes: ', error)
            })

    }, [savedRecipes])




    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="cookbook">

                {isLoggedIn ?
                    <>
                        <div className="hero">
                            <h1>My Cookbook</h1>
                            <div>Welcome back, {name}! Here are your saved recipes.</div>
                        </div>

                        <div className="recipeCardContainer">

                            {
                                recipes.map((recipe, index) => (
                                    <RecipeCard recipe={recipe} index={index} isCookbook={isCookbook} />
                                ))
                            }
                        </div>

                    </>

                    :
                    <div className="hero register">
                        <h3>Not yet a Recipe Scout user? <br></br>Sign up to Save Your Favourite Recipes</h3>
                        <Link to={'/login'}>Already a member? Sign in here!</Link>
                        <div className="pleaseRegister">
                            <Link to={'/register'}>Create An Account</Link>
                            <Link to={'/'}>Back To The Explore Page</Link>
                        </div>
                    </div>}
            </div>
            <Footer />
        </>
    )
}