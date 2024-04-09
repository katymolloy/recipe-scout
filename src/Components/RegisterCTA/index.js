import { Link } from "react-router-dom"
import './cta.scss'

export default function CTA() {

    return (
        <div className="signUpCTA">

            <div className = 'description'>
                <div className = 'heading'>Sign Up For Recipe Scout</div>
                <div>Save your favourite desserts, snacks, and more, all in one place.</div>
            </div>

            <div className="CTAbutton">
                <Link to={'/register'}>Create Account</Link>
            </div>

        </div>
    )
}