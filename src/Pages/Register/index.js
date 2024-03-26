import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getFirestoreInstance } from "../../firebase";
import './register.scss'

export default function Register() {

    const db = getFirestoreInstance();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, SetErrorMsg] = useState([]);


    const registerHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/cookbook')
            })
            .catch((error) => {
                let errArray = []
                if (error.code === 'auth/email-already-in-use') {
                    errArray.push( <>
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





    return (

        <form className="registerPage">
            <Link to={"/"}>Home</Link>
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
                Register
            </button>
        </form>
    )
}