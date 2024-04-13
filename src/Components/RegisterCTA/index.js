import { Link } from "react-router-dom"
import './cta.scss'


/**
 * Create Account Component Used for the Recipe Landing Page 
 */
export default function CTA() {

    return (

        <div className="signUpCTA">
            <div className='description'>
                <div className='heading'>Sign Up For Recipe Scout</div>
                <div className = 'teaser'>Save your favourite desserts, snacks, and more, all in one place.</div>
            </div>

            <Link to={'/register'} className="CTAbutton">Create Account</Link>
        </div>

    )
}