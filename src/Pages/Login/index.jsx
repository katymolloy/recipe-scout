import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInUser } from "../../firebase";

import { IoArrowBack } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

import "./login.scss";



export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, SetErrorMsg] = useState([]);
  const [view, setView] = useState('password')

  const loginHandler = (e) => {
    e.preventDefault();

    signInUser(email, password, onLogin, SetErrorMsg);
    // once user is successfully logged in, they're redirected to the cookbook page
    navigate("/cookbook");
  };

  
  const changeVisibility = () => {
    if (view === "password") {
      setView("text");
    }
    if (view === "text") {
      setView("password");
    }
  };

  return (
    <div className="container loginContainer">
      <div className="card">
        <Link to={"/"} className="backLink">
          <IoArrowBack />
        </Link>
        <img
          src="/images/recipelogo.png"
          className="logo"
          alt="Recipe Scout Logo"
        ></img>
        <h1 className="title">Welcome Back</h1>
        <p className="sub">Please Sign In to get Started</p>
        <form className="loginForm">
          {errorMsg.length > 0 && (
            <div className="login-errorBox">
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
              type={view}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <FaEye onClick={changeVisibility} />
          </div>

          <button type="submit" onClick={loginHandler}>
            Login
          </button>

          {/* cta added if users do not have an account */}
          <p className="sub">
            Don't have an account? <Link to={"/register"}>Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
