import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header() {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScroll(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={scroll ? 'scroll' : ''}>
            <span>
                <div className='iconbg'>
                    <img src="/images/recipelogo.png" className="logo" alt="Recipe Scout Logo" />
                </div>
                <h1>Recipe Scout</h1>
            </span>
            <nav>
                <ul>
                    <li><Link to='/'>Recipes</Link></li>
                    <li><Link to='/cookbook'>My Cookbook</Link></li>
                </ul>
            </nav>
            <div className='login-reg'>
                <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Sign Up</Link></li>
                </ul>
            </div>
        </header>
    );
}
