import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { getFirestoreInstance, getUserData } from "../../firebase";
import RecipeCard from "../../Components/RecipeCard";
import { viewRecipe } from "../../Utilities/api";

export default function Cookbook({ isLoggedIn, currentUser, changeLogin, addApiCall }) {
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
        // if no recipes to grab, function is exited
        if (savedRecipes.length === 0) {
            return;
        }
        let currCount = addApiCall(savedRecipes.length)
        if (currCount === true) {
            getRecipes();
            return;
        } else {
            clearTimeout(apiTimeout)
            addApiCall(1)
            let apiTimeout = setTimeout(getRecipes, 20000);
        }

    }, [name])



    const getRecipes = () => {
        let promises = savedRecipes.map((recipe) => viewRecipe(recipe));
        Promise.all(promises)
            .then((data) => {
                let recipeData = data.map((data) => data.hits[0].recipe)
                setRecipes(recipeData);
                return;
            }).catch((error) => {
                console.log('Error retrieving user recipes: ', error);
                return;
            })
    }

    // function to update recipe state; will remove deleted recipes
    const updateRecipes = (newRecipes) => {
        newRecipes.then((newRecipes) => {
            let newArray = []
            for (let i = 0; i < recipes.length; i++) {
                if (newRecipes.includes(recipes[i].uri) === true) {
                    newArray.push(recipes[i])
                }
            }
            setRecipes(newArray)
            return;
        }).catch((error) => {
            console.log('Error updating user recipes: ', error);
            return;
        })
    }


    return (
        <>
            <Header isLoggedIn={isLoggedIn} changeLogin={changeLogin} />
            <div className="cookbook">
                {isLoggedIn ?
                    <>
                        <div className="hero">
                            <h1>My Cookbook</h1>
                            <div>Welcome back, {name}!</div>
                        </div>
                        {savedRecipes.length !== 0 ?
                            <div className="recipeCardContainer">
                                {
                                    recipes.map((recipe, index) => (
                                        <RecipeCard recipe={recipe} index={index} isLoggedIn={isLoggedIn} currentUser={currentUser} isCookbook={isCookbook} updateRecipes={updateRecipes} />
                                    ))
                                }
                            </div>
                            :
                            <div className="noRecipeCta">
                                <p>It doesn't look like you have any saved recipes yet</p>
                                <Link to={'/'}>Check out the explore page for fresh ideas!</Link>
                            </div>
                        }
                    </>
                    :
                    <div className="hero register">
                        <h3>Not yet a Recipe Scout user? <br></br>Sign up to Save Your Favourite Recipes</h3>
                        <div className="pleaseRegister">
                            <Link to={'/register'}>Create An Account</Link>
                            <Link to={'/login'}>Already a member? Login!</Link>
                        </div>
                    </div>}
            </div>
            <Footer />
        </>
    )
}