import { Link } from "react-router-dom"
import './cookbook.scss'

export default function Cookbook({ isLoggedIn }) {
    return (
        <>
            {isLoggedIn ?

                <div>
                    <div className="header"> <h1>My Cookbook</h1> <Link to={'/'}>Home</Link></div>

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