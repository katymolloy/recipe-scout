import { Link } from 'react-router-dom'
import './header.scss'
export default function Header() {
    return (
        <header>
            <h1>Recipe Scout</h1>
            <nav>
                <ul>
                    <li><Link to='/'>Recipes</Link></li>
                    <li><Link to='/cookbook'>My Cookbook</Link></li>
                </ul>
            </nav>
            <div className='login-reg'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Sign Up</Link>

            </div>
        </header>
    )
}