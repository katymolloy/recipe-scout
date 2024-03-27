import { Link } from "react-router-dom"
import './cookbook.scss'
import { useEffect, useState } from "react"
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { getFirestoreInstance } from "../../firebase";
import { IoEllipseSharp } from "react-icons/io5";

export default function Cookbook({ isLoggedIn, currentUser }) {
    const [name, setName] = useState('');

    const db = getFirestoreInstance();

    useEffect(() => {
        if(isLoggedIn === true){
            const getUserData = async () => {
                const docRef = doc(db, 'users', currentUser)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log(docSnap.data())
                    setName(docSnap.data().first)
                } else {
                    console.log('No data for current user')
                }
            }
            getUserData();
        }else{
            return;
        }
       
    })
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