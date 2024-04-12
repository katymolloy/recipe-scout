import { useState } from "react";
import "./login.scss";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { signInUser } from "../../firebase";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, SetErrorMsg] = useState([]);

  const loginHandler = (e) => {
    e.preventDefault();

    signInUser(email, password, onLogin, SetErrorMsg);
    // once user is successfully logged in, they're redirected to the cookbook page
    navigate("/cookbook");
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
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
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
