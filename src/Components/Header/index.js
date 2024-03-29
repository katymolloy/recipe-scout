import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header() {
    const [scroll, setScroll] = useState(false);

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
                    <li><Link to='/' className='link'>Recipes</Link></li>
                    <li><Link to='/cookbook' className='link'>My Cookbook</Link></li>
                </ul>
            </nav>
            <div className='login-reg'>
                <ul>
                    <li><Link to='/login' className='link'>Login</Link></li>
                    <li><Link to='/register' className='cta'>Sign Up</Link></li>
                </ul>
            </div>
        </header>
    );
}
