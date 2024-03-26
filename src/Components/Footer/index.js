import { Link } from "react-router-dom"
import './footer.scss'

export default function Footer() {
    return (
        <footer className="scoutFooter">
            <div className="footerText">
                <div>Recipe Scout</div>
                <div>Powered by Edamam API</div>
            </div>
            <div className="footerLink">
                <div><Link to={'/cookbook'}>My Cookbook</Link></div>
                <div><Link to={'/login'}>Login</Link></div>
                <div><Link to={'/register'}>Register</Link></div>
            </div>
        </footer>
    )
}