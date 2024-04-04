import React, { useState, useEffect } from 'react';
import { signOutUser } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';

export default function Header({ isLoggedIn, changeLogin }) {
    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 30;
            setScroll(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const signOutHandler = () => {
        signOutUser()
        if (true) {
            changeLogin(false, '')
            navigate('/')
        }
    }

    return (
        <header className={scroll ? 'scroll' : ''}>
            <Link to={'/'} className='logolink'>
                <div className='iconbg'>
                    <img src="/images/recipelogo.png" className="logo" alt="Recipe Scout Logo" />
                </div>
                <h1>Recipe Scout</h1>
            </Link>
            <nav>
                <ul>
                    <li><Link to='/' className='link'>Recipes</Link></li>
                    <li><Link to='/cookbook' className='link'>My Cookbook</Link></li>
                </ul>
            </nav>
            <div className='login-reg'>

                {isLoggedIn ?
                    <ul>
                        <li className='link' onClick={signOutHandler}><div>Sign Out</div></li>
                    </ul>
                    :
                    <ul>
                        <li><Link to='/login' className='link'>Login</Link></li>
                        <li><Link to='/register' className='cta'>Sign Up</Link></li>
                    </ul>
                }


            </div>
        </header>
    );
}
