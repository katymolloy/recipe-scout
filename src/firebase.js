// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/auth';
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