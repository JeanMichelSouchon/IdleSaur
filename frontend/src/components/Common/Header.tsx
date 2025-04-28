
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const HandleLogout = () => {
    localStorage.removeItem('token');
};

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle menu open/close
    };

    return (
        <header>
            <div className="Title">
                IdleSaur🦖
            </div>
            
            {/* Hamburger icon with spans */}
            <div className={`burger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navigation menu */}
            <nav className={menuOpen ? 'nav open' : 'nav'}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user-profile" onClick={toggleMenu}>Profil</Link>
                <Link to="/" onClick={() => { HandleLogout(); toggleMenu(); }}>Disconnect</Link>
            </nav>
        </header>
    );
};

export default Header;

