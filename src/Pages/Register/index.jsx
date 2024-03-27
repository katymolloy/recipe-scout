import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getFirestoreInstance } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { IoArrowBack } from "react-icons/io5";

import './register.scss'

export default function Register({ onRegister }) {

    const db = getFirestoreInstance();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, SetErrorMsg] = useState([]);


    const registerHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user.uid;
                writeToDatabase(user);
                onRegister(true, user);
                navigate('/cookbook')
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
            });
    }


    const writeToDatabase = async (user) => {
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


    return (

        <div className='container registerContainer'>
            <div className="card">
                <Link to={"/"} className="backLink">
                    <IoArrowBack />
                </Link>
                <h1 className="title">Create An Account</h1>
                <p className="sub">Lets get you Started</p>
                <form className="registerPage">
                    {errorMsg.length > 0 && (
                        <div >
                            <ul>
                                {errorMsg.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        ></input>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>

                    <button type="submit" onClick={registerHandler}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}