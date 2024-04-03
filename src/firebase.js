// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5IlShjVEBxtRCPHGk7EcC4Amh83naZzU",
    authDomain: "recipe-scout.firebaseapp.com",
    projectId: "recipe-scout",
    storageBucket: "recipe-scout.appspot.com",
    messagingSenderId: "1020171529170",
    appId: "1:1020171529170:web:21288be640c0677d27f60b"
};

const app = initializeApp(firebaseConfig);

// Export a function that returns the Firestore instance after Firebase is initialized
export const getFirestoreInstance = () => {
    return getFirestore(app);
};





// All Firestore functions below
/**
 * 
 * @param {*} db 
 * @param {*} currentUser 
 * @param {*} setName 
 * @param {*} setSavedRecipes 
 * @param {*} savedRecipes 
 */
export const getUserData = async (db, currentUser, setName, setSavedRecipes) => {
    const docRef = doc(db, 'users', currentUser)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setName(docSnap.data().first)
        setSavedRecipes(docSnap.data().recipes)
        return;
    } else {
        console.log('No data for current user');
        return;
    }
}

/**
 * 
 * 
 */

export const getRecipes = async (db, food, setRecipes) => {
    let docName = food + 'Widget'
    const docRef = doc(db, 'recipes', docName)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        setRecipes(docSnap.data().recipes)
        return;
    } else {
        console.log('Error retrieving widget data from db');
        return;
    }
}


export const saveRecipe = async (db, recipe, currentUser, setSavedRecipes, savedRecipes) => {
    const docRef = doc(db, 'users', currentUser);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        setSavedRecipes(docSnap.data().recipes)
        if (savedRecipes.length > 0) {
            savedRecipes.forEach((savedRecipe) => {
                if (savedRecipe.uri !== recipe.uri) {
                    setDoc(docRef, {
                        recipes: arrayUnion(recipe.uri)
                    }, { merge: true })
                    console.log('Recipe saved')
                    return;
                } else {
                    console.log('Recipe already saved')
                    return;
                }
            })
        } else {
            setDoc(docRef, {
                recipes: arrayUnion(recipe)
            }, { merge: true })
            return;
        }
    } else {
        console.log('Error retrieving user recipes from database')
        return;
    }
}

// 

export const writeToDatabase = async (db, user, email, firstName, lastName) => {
    await setDoc(doc(db, 'users', user), {
        email: email,
        first: firstName,
        last: lastName,
        recipes: [],
    }).then(() => {
        console.log('New user added to db')
    }).catch((error) => {
        console.log('Error writing user to database: ', error)
    })
}





// All Firebase Login/Register/Logout functions below
export const newUser = (db, email, password, firstName, lastName, onRegister, SetErrorMsg) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user.uid;
            writeToDatabase(db, user, email, firstName, lastName);
            onRegister(true, user);
        })
        .catch((error) => {
            let errArray = []
            if (error.code === 'auth/email-already-in-use') {
                errArray.push(<>
                    Email is already in use. Would you like to{' '}
                    <Link to="/login">sign in instead?</Link>
                </>)
            }
            if (error.code === 'auth/weak-password') {
                errArray.push('Password is too weak, please try again')
            }
            SetErrorMsg(errArray)
            console.log(`Error registering user: ${error.code}`);
        })
}


export const signInUser = (email, password, onLogin, SetErrorMsg) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user.uid;
            onLogin(true, user);


            // ...
        })
        .catch((error) => {
            let errArray = []
            if (error.code === 'auth/invalid-email') {
                errArray.push(<>
                    No user found, would you like to{' '}
                    <Link to="/register">register instead?</Link>
                </>)
            }
            SetErrorMsg(errArray)
        });
}