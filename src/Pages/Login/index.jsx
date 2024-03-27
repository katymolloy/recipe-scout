import { useState } from "react";
import "./login.scss";
import { useNavigate, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, SetErrorMsg] = useState([]);

  const loginHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        onLogin(true, user);

        navigate("/cookbook");
        // ...
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
  };

  return (
    <div className="container loginContainer">
      <div className="card">
        <Link to={"/"} className="backLink">
          <IoArrowBack />
        </Link>
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
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button type="submit" onClick={loginHandler}>
            Login
          </button>

          <p className="sub">
            Don't have an account? <Link to={"/register"}>Sign up here!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
