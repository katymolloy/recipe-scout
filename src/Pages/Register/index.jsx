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
    const [errorMsg, SetErrorMsg] = useState([]);

    const registerHandler = (e) => {
        e.preventDefault();

        newUser(db, email, password, firstName, lastName, onRegister, SetErrorMsg);
        navigate('/cookbook')
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
                        <div>
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
