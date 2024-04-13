import React, { useState, useEffect } from 'react';
import { signOutUser } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import Hamburger from "../Hamburger";


/**
 * Header Component
 */
export default function Header({ isLoggedIn, changeLogin }) {

    const [scroll, setScroll] = useState(false);
    const navigate = useNavigate();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    // Handling the Scrolling
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

    // Sign Out Handling
    const signOutHandler = () => {
        signOutUser()
        if (true) {
            changeLogin(false, '')
            navigate('/')
        }
    }

    // The Toggle of the Hamburger Menu
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }


    return (

        <header className={scroll ? 'scroll' : ''}>

            {/* Logo and Name */}
            <Link to={'/'} className='logolink'>
                <img src="/images/recipelogowhite.png" className="logo" alt="Recipe Scout Logo" />
                <div className='appName'>Recipe Scout</div>
            </Link>

            {/* The Navigation Part of the Header */}
            <nav>
                
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>

                <ul>
                    <li><Link to='/' className='link'>Recipes</Link></li>
                    <li><Link to='/cookbook' className='link'>My Cookbook</Link></li>
                    {isLoggedIn ?
                        <li><Link className='link' onClick={signOutHandler}>Sign Out</Link></li>
                        :
                        <>
                            <li><Link to='/login' className='link'>Login</Link></li>
                            <li><Link to='/register' className='cta'>Sign Up</Link></li>
                        </>
                    }
                </ul>

            </nav>

            <style jsx>{`
@media (max-width: 1000px){

    header nav ul{
        display: ${hamburgerOpen ? 'flex' : 'none'};
        flex-direction: column;
        width:400px;
        position: fixed;
        right: 0;
        top: 50px;
        background-color: #00983F;
        padding: 20px;
        border-radius: 10px
    }
}



`}</style>

        </header>

    );

}
