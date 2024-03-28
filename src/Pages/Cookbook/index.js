import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"

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
    }, [currentUser])



    return (
        <div className="cookbook">
            {isLoggedIn ?
                <div>
                    <div className="header"> <h1>My Cookbook</h1> <Link to={'/'}>Home</Link></div>
                    <div>Welcome back {name}!</div>
                    <div className="recipeCardContainer">

                        {savedRecipes.map((recipe, index) => (
                            <RecipeCard recipe={recipe} index={index} />
                        ))}

                    </div>
                </div>

                :
                <div>
                    <h3>Not yet a Recipe Scout user? Sign up to access all benefits of membership!</h3>
                    <div>
                        <ul>
                            <li>Save recipes for later use</li>
                        </ul>
                    </div>
                    <div className="pleaseRegister">
                        <Link to={'/register'}>Count me in!</Link>
                        <Link to={'/'}>No thanks, I'm just looking. Take me back to the explore page!</Link>
                    </div>
                </div>}
        </div>
    )
}