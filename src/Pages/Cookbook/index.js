import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

import { getFirestoreInstance, getUserData } from "../../firebase";
import RecipeCard from "../../Components/RecipeCard";
import { IoEllipseSharp } from "react-icons/io5";

export default function Cookbook({ isLoggedIn, currentUser }) {
    const [name, setName] = useState('');
    const [savedRecipes, setSavedRecipes] = useState([])

    const db = getFirestoreInstance();

    useEffect(() => {
        if (isLoggedIn === true) {
            getUserData(db, currentUser, setName, setSavedRecipes, savedRecipes);
        } else {
            return;
        }
    }, [currentUser]);



    return (
        <>
            <Header />
            <div className="cookbook">

                {isLoggedIn ?
                    <>
                        <div className="hero">
                            <h1>My Cookbook</h1>
                            <div>Welcome back, {name}!</div>
                        </div>
                        <div className="recipeCardContainer">

                            {savedRecipes.map((recipe, index) => (
                                <RecipeCard recipe={recipe} index={index} />
                            ))}

                        </div>
                    </>

                    :
                    <div className="hero register">
                        <h3>Not yet a Recipe Scout user? <br></br>Sign up to Save Your Favourite Recipes</h3>
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