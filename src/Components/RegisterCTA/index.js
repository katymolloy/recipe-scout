import { Link } from "react-router-dom"
import './cta.scss'

export default function CTA() {

    return (
        <div className="signUpCTA">
            <div>
                <h2>Sign up for Recipe Scout and start building your cookbook!</h2>
                <div>Save your favourite desserts, snacks, and more, all in one place.</div>
            </div>
            <div className="CTAbutton">
                <Link to={'/register'}>Create Account</Link>
            </div>
        </div>
    )
}