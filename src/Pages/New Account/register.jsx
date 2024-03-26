import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase";
import "./register.scss";
import { db } from "../../database/firebase";

import { redirectUri, clientId } from "../../util/spotify";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

/**
 * This function is the main component of the register page. It contains the form for registering a new user, as well as the logic for registering the user and writing their information to the database.
 * @returns {JSX.Element} The RegisterPage component.
 */
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [username, setUsername] = useState("");
  const [unavailUsers, setUnavailUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  /**
   * Executes an effect after the component is mounted to retrieve existing usernames from the database.
   * These usernames are then stored in the state for further use.
   * @function useEffect
   * @param {Function} effect - The function containing the side effect to be executed.
   * @param {Array} dependencies - An array of dependencies for the effect. If empty, the effect only runs once after the initial render.
   */
  useEffect(() => {
    const unavailableUsernames = [];

    /**
     * Retrieves existing usernames from the 'usernames' collection in the database and sets them in the component state.
     * @function retrieveUsernames
     * @returns {Promise} A Promise that resolves once the usernames are retrieved and set in the state.
     */
    const retrieveUsernames = async () => {
      const querySnapshot = await getDocs(collection(db, "usernames"));
      querySnapshot.forEach((doc) => {
        unavailableUsernames.push(doc.id);
      });
      // console.log('Existing Users: ', unavailableUsernames);
      setUnavailUsers(unavailableUsernames);
      return unavailableUsernames;
    };
    retrieveUsernames();
  }, []);

  /**
   * @description 
   * - Writes user data to the database.   *
   * - The provided user ID is used as the document ID in the 'users' collection.   *
   * - Additionally, the username is used as the document ID in the 'usernames' collection.
   * @async
   * @function writeToDb
   * @param {string} userId - The unique identifier of the user.
   * @returns {Promise<void>} A Promise that resolves once the user data is successfully written to the database.
   */
  const writeToDb = async (userId) => {
    try {
      await setDoc(doc(db, "users", userId), {
        uid: userId,
        username: username,
        password: password,
        email: email,
      });

      await setDoc(doc(db, "usernames", username), {
        username: username,
        password: password,
        email: email,
        uid: userId,
      });
      // console.log("Data added successfully");

      navigate("/home");
    } catch (error) {
      console.log(`Error writing to database: ${error}`);
    }
  };

  /**
   * Registers a new user with the provided email and password.
   * If there are no error messages, the user is created with the provided credentials
   * and their UID is written to the database.
   * @async
   * @function registerUser
   * @returns {Promise} A Promise that resolves once the user is successfully registered and written to the database.
   */
  const registerUser = async () => {
    if (errorMsg.length === 0) {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          writeToDb(user.uid);
        }
      );
    }
  };


  /**
   * This function is the event handler for the form submission. It validates the form data and, if valid, registers the user.
   * @param {Event} e The form submission event.
   */

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = [];

    // check for invalid/missing data
    if (unavailUsers.includes(username) === true) {
      validate.push(
        `Username '${username}' is taken, please try a different one`
      );
    }
    if (username.length < 3) {
      validate.push("Please enter a valid username with at least 3 characters");
    }
    if (email.length < 8) {
      validate.push("Please enter a valid email with 8 or more characters");
    }
    if (password.length < 5) {
      validate.push("Please enter a password with at least 5 characters");
    }
    if (password !== passwordConfirm) {
      validate.push("Passwords do not match");
    }

    setErrorMsg(validate);

    // run when no data is invalid/missing
    if (validate.length === 0) {
      registerUser();
    }
  };

  return (
    <div className="container registerContainer">
      <div className="card">
        <Link to={"/"} className="backLink">
          <IoArrowBack />
        </Link>
        <img
          className="logo"
          src="..."
          alt="Recipe-Scout"
        ></img>
        <h1 className="title">Create Account</h1>
        <p className="sub">Please Enter All Fields to get set up</p>
        <form className="loginForm">
          {errorMsg.length > 0 && (
            <div className="errorBox">
              Invalid data:
              <ul>
                {errorMsg.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <input
              placeholder="User Name"
              type="text"
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>

          <div>
            <input
              placeholder="Email Address"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div>
            <input
              placeholder="Password"
              // type="password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div>
            <input
              placeholder="Confirm Password"
              type="text"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
          </div>

          <button type="submit" onClick={submitHandler}>
            Create Account
          </button>
          {/* } */}

        </form>
      </div>
    </div>
  );
}
