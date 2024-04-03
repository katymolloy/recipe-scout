import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { getFirestoreInstance, newUser } from "../../firebase";
import { IoArrowBack } from "react-icons/io5";

import "./register.scss";

export default function Register({ onRegister }) {
    const db = getFirestoreInstance();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState([]);

    const registerHandler = (e) => {
        e.preventDefault();

        // Validating the inputs
        const validate = [];

        if (firstName < 1) {
            validate.push('Your first name should be more than 1 character long');
        } else if (firstName === '') {
            validate.push('You must write your first name');
        }

        if (lastName < 2) {
            validate.push('Your last name should be more than 2 characters long');
        } else if (lastName === '') {
            validate.push('You must write your last name');
        }

        if (email < 10) {
            validate.push('Your email must have at least 10 characters');
        } else if (email === '') {
            validate.push('You must write your email');
        }

        if (password < 5) {
            validate.push('Your password must be more than 5 characters long');
        } else if (password === '') {
            validate.push('Your password is missing');
        }

        setErrorMsg(validate);

        if (validate.length > 0) {

            // Invalid data
            console.log('Validate:', validate);
            setErrorMsg(validate);

        } else {

            // Clear out the inputs
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');

            newUser(db, email, password, firstName, lastName, onRegister, setErrorMsg);
            navigate('/cookbook')

        }
    };

    return (
        <div className="container registerContainer">
            <div className="card">
                <Link to={"/"} className="backLink">
                    <IoArrowBack />
                </Link>
                <h1 className="title">Create An Account</h1>
                <p className="sub">Lets get you Started</p>
                <form className="registerPage">

                    {errorMsg.length > 0 && (
                        <div className = 'register-validate'>
                            Invalid Data:
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
    );
}
