import { Link } from "react-router-dom"
import './footer.scss'


/**
 * Footer Component
 */
export default function Footer() {

    return (

        <footer className="scoutFooter">
            <div className="footerText">

                <span>
                    <img src="/images/recipelogo.png" className="logo" alt="Recipe Scout Logo" />
                    <div>Recipe Scout</div>
                </span>
                <span className="gap">
                    <img src="https://www.edamam.com/assets/img/small-logo.png" alt="Edmam API Logo"></img>
                    <div>Powered by Edamam API</div>
                </span>
            </div>
            
            {/* Footer Links */}
            <div className="footerLink">
                <Link to={'/'}>Recipes</Link>
                <Link to={'/cookbook'}>My Cookbook</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Sign Up</Link>
            </div>
        </footer>

    )

}