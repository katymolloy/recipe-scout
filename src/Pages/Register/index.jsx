import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getFirestoreInstance, newUser } from "../../firebase";

import { IoArrowBack } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

import "./register.scss";


/**
 * Register User Page
 */
export default function Register({ onRegister }) {

  // Variables and Hooks
  const db = getFirestoreInstance();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [view, setView] = useState("password");

  // Handling the Registration from the User
  const registerHandler = (e) => {
    e.preventDefault();
    // Validating the inputs
    const validate = [];

    if (firstName < 1) {
      validate.push("Your first name should be more than 1 character long");
    } else if (firstName === "") {
      validate.push("First name is required");
    }

    if (lastName < 2) {
      validate.push("Your last name should be more than 2 characters long");
    } else if (lastName === "") {
      validate.push("Last name is required");
    }

    if (email < 10) {
      validate.push("Your email must have at least 10 characters");
    } else if (email === "") {
      validate.push("Email is required");
    }

    if (password < 5) {
      validate.push("Your password must be more than 5 characters long");
    } else if (password === "") {
      validate.push("Password is required");
    }

    if (confirmPassword === "") {
      validate.push("Password confirmation is required");
    }

    if (password !== confirmPassword) {
      validate.push("Passwords do not match; please try again");
    }

    setErrorMsg(validate);

    if (validate.length > 0) {
      // Invalid data
      console.log("Validate:", validate);
      setErrorMsg(validate);
    } else {
      // Clear out the inputs
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");

      newUser(
        db,
        email,
        password,
        firstName,
        lastName,
        onRegister,
        setErrorMsg
      );
      navigate("/cookbook");
    }
  };

  // Visibility Modification
  const changeVisibility = () => {
    if (view === "password") {
      setView("text");
    }
    if (view === "text") {
      setView("password");
    }
  };

  return (

    <div className="container registerContainer">

      <div className="card">
        <Link to={"/"} className="backLink">
          <IoArrowBack />
        </Link>
        <img
          src="/images/recipelogo.png"
          className="logo"
          alt="Recipe Scout Logo"
        ></img>
        <h1 className="title">Create An Account</h1>
        <p className="sub">Lets Get You Started</p>

        {/* Register Page Form */}
        <form className="registerPage">
          {errorMsg.length > 0 && (
            <div className="register-validate">
              Invalid Data:
              <ul>
                {errorMsg.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>

          {/* Email Address */}
          <div>
            <input
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          {/* Password */}
          <div>
            <input
              type={view}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <FaEye onClick={changeVisibility} />
          </div>
          <div>
            <input
              type={view}
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          {/* Submission */}
          <button type="submit" onClick={registerHandler}>
            Create Account
          </button>
        </form>
      </div>

    </div>
  );

}
