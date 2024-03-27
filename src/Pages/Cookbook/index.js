import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { getFirestoreInstance } from "../../firebase";
import { IoEllipseSharp } from "react-icons/io5";

export default function Cookbook({ isLoggedIn, currentUser }) {
    const [name, setName] = useState('');
    const [savedRecipes, setSavedRecipes] = useState([])

    const db = getFirestoreInstance();

    useEffect(() => {
        if (isLoggedIn === true) {
            const getUserData = async () => {
                const docRef = doc(db, 'users', currentUser)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data())
                    setName(docSnap.data().first)
                    setSavedRecipes(docSnap.data().recipes)
                    if (savedRecipes.length > 0) {
                        getSavedRecipes();
                    }
                } else {
                    console.log('No data for current user')
                }
            }
            getUserData();
        } else {
            return;
        }
    }, [])


    const getSavedRecipes = () => {
        console.log(savedRecipes)
        // api calls to grab all the recipes here
        const baseUrl = 'https://api.edamam.com/api/recipes/v2/by-uri?'
        const cred = '&app_id=d521788b&app_key=c569f8cb415ada401f91221c983f3608'
        savedRecipes.forEach((recipeUri) => {
            let url = baseUrl + recipeUri + cred;
            fetch(url)
                .then(() => {
                    console.log('data retrieved')
                }).catch((error) => {
                    console.log(`Error getting saved recipes from API: ${error}`); 
                })
        })


    }

    return (
        <>
            {isLoggedIn ?

                <div>
                    <div className="header"> <h1>My Cookbook</h1> <Link to={'/'}>Home</Link></div>
                    <div>Welcome back {name}!</div>

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
        </>
    )
}