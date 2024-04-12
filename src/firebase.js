// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, arrayUnion, setDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

// function that returns the Firestore instance after Firebase is initialized
export const getFirestoreInstance = () => {
    return getFirestore(app);
};



//////////////////////////////////////////////////////////////////// All Firestore functions below
/**
 * returns all user data, including their saved recipes
 * @param {function} db 
 * @param {string} currentUser 
 * @param {string} setName 
 * @param {array} setSavedRecipes 
 * @param {array} savedRecipes 
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
 * saves recipe URI to users collection in database
 * @param {function} db 
 * @param {string} uri 
 * @param {string} currentUser  
 */
export const saveRecipe = async (db, uri, currentUser) => {
    const docRef = doc(db, 'users', currentUser);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        let savedRecipes = docSnap.data().recipes;
        if (savedRecipes.length > 0) {
            savedRecipes.forEach((savedRecipe) => {
                if (savedRecipe !== uri) {
                    setDoc(docRef, {
                        recipes: arrayUnion(uri)
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
                recipes: arrayUnion(uri)
            }, { merge: true })
            return;
        }
    } else {
        console.log('Error retrieving user recipes from database')
        return;
    }
}



/**
 * removes a recipe from user's collection 
 * @param {function} db 
 * @param {string} currentUser 
 * @param {string} uri 
 * @returns updated recipes
 */
export const removeRecipe = async (db, currentUser, uri) => {
    const docRef = doc(db, 'users', currentUser);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        let updatedRecipes = docSnap.data().recipes.filter(recipe => recipe !== uri)
        await updateDoc(docRef, {
            recipes: updatedRecipes
        });
        return updatedRecipes;
    } else {
        console.log('Error retrieving user recipes from database')
        return;
    }
}



/**
 * writes user data to db on register
 * @param {function} db 
 * @param {string} user 
 * @param {string} email 
 * @param {string} firstName 
 * @param {string} lastName 
 */
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


////////////////////////////////////////////////////////////////////  All Firebase Login/Register/Logout functions below
/**
 * function used to create a user account in firebase; writes to db as well as creates auth
 * @param {function} db 
 * @param {string} email 
 * @param {string} password 
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {function} onRegister 
 * @param {array} SetErrorMsg 
 */
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
                // if the email already exists, they're prompted to login instead
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



/**
 * function used to sign in users
 * @param {string} email 
 * @param {string} password 
 * @param {function} onLogin 
 * @param {array} SetErrorMsg 
 */
export const signInUser = (email, password, onLogin, SetErrorMsg) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user.uid;
            onLogin(true, user);
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



/**
 * used to sign users out
 */
export const signOutUser = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log('User signed out')
        return true
    }).catch((error) => {
        console.log(`Error signing user out: ${error}`);
        return false;
    })
}