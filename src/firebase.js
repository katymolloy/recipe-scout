// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc,  arrayUnion, setDoc  } from 'firebase/firestore'; 
// Import necessary Firebase functionsimport 'firebase/auth';
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



//
export const getUserData = async (db, currentUser, setName, setSavedRecipes, savedRecipes) => {
    const docRef = doc(db, 'users', currentUser)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data())
        setName(docSnap.data().first)
        setSavedRecipes(docSnap.data().recipes)
        if (savedRecipes.length > 0) {
            // getSavedRecipes();
        }
    } else {
        console.log('No data for current user')
    }
} 


export const getRecipes = async (db, food, setRecipes) => {
    let docName = food + 'Widget'
    const docRef = doc(db, 'recipes', docName)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        console.log('Widget data retrieved')
        setRecipes(docSnap.data().recipes)
    } else {
        console.log('Error retrieving widget data from db')
    }
}


export const saveRecipe = async (db, uri, currentUser, setSavedRecipes, savedRecipes) => {
    const recipeRef = doc(db, 'users', currentUser);
    const docRef = doc(db, 'users', currentUser);

    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        setSavedRecipes(docSnap.data().recipes)
        if (savedRecipes.length > 0) {
            savedRecipes.forEach((recipe) => {
                if (recipe !== uri) {
                    setDoc(recipeRef, {
                        recipes: arrayUnion(uri)
                    }, { merge: true })
                } else {
                    console.log('Recipe already saved')
                }
            })
        } else {
            setDoc(recipeRef, {
                recipes: arrayUnion(uri)
            }, { merge: true })
        }
    } else {
        console.log('Error retrieving user recipes from database')
    }
}