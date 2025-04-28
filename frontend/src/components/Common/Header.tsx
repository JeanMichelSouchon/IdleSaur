import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useOverlay } from '../../contexts/OverlayContext';
import { FaWindows } from 'react-icons/fa';

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.assign(`https://frontend-service-400887177421.europe-west9.run.app`);
};

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openOverlay } = useOverlay();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header-container">
      {/* -- Zone gauche (desktop) : Profil / Disconnect -- */}
      <div className="desktop-left">
        <Link to="/user-profile" className="header-btn-left">
          Profil&nbsp;👤
        </Link>
        <button
          className="header-btn-left"
          onClick={() => {
            handleLogout();
          }}
        >
          Disconnect&nbsp;🚪
        </button>
      </div>

      {/* -- Titre au centre (desktop) -- */}
      <div className="Title">IdleSaur🦖</div>

      {/* -- Zone droite (desktop) : PvP / Classements -- */}
      <div className="desktop-right">

        <button
          className="header-btn-right"
          onClick={() => openOverlay('ranking')}
        >
          Classements&nbsp;🏆
        </button>
      </div>

      {/* -- Icône burger (mobile) -- */}
      <div
        className={`burger-icon ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 
        -- Nav (mobile) : 
        overlay plein écran + grille 2×2 dans la partie haute.
      */}
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <div className="nav-grid">
          <Link
            to="/user-profile"
            onClick={toggleMenu}
          >
            Profil&nbsp;👤
          </Link>
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          >
            Disconnect&nbsp;🚪
          </button>
          <button
            onClick={() => {
              openOverlay('ranking');
              toggleMenu();
            }}
          >
            Classements&nbsp;🏆
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
