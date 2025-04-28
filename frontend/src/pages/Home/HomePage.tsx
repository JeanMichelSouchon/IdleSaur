import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa'; 
import LoginForm from '../../components/Auth/LoginForm';
import SignupForm from '../../components/Auth/SignupForm';
import './HomePage.css'; 

// Définition du composant fonctionnel HomePage
const HomePage: React.FC = () => {
    // États pour gérer l'affichage des formulaires de connexion et d'inscription
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

    // Fonction pour ouvrir le formulaire de connexion et fermer celui d'inscription
    const openLogin = () => {
        setIsSignupOpen(false);
        setIsLoginOpen(true);
    };

    // Fonction pour ouvrir le formulaire d'inscription et fermer celui de connexion
    const openSignup = () => {
        setIsLoginOpen(false);
        setIsSignupOpen(true);
    };

    // Fonction pour fermer les deux formulaires
    const closeForms = () => {
        setIsLoginOpen(false);
        setIsSignupOpen(false);
    };

    return (
        <div className="home-page">
            {/* Icône permettant d'accéder à la gestion des utilisateurs */}
            {/* <a href="/admin" className="user-management-icon" title="Gestion des utilisateurs">
                <FaUserCog />
            </a> */}

            {/* Bloc central contenant le titre et les boutons de connexion et d'inscription */}
            <div className="central-block">
                <h1>🦖The IdleSaur🦖</h1>
                <br />
                <button className="btn-login" onClick={openLogin}>
                    <span>Se Connecter</span>
                </button>
                <button className="btn-signup" onClick={openSignup}>
                    <span>S'inscrire</span>
                </button>
            </div>

            {/* Overlay qui affiche les formulaires de connexion ou d'inscription selon l'état */}
            <div className={`overlay ${isLoginOpen || isSignupOpen ? 'show' : ''}`}>
                {/* Affichage conditionnel du formulaire de connexion */}
                {isLoginOpen && <LoginForm onClose={closeForms} />}

                {/* Affichage conditionnel du formulaire d'inscription */}
                {isSignupOpen && <SignupForm onClose={closeForms} />}
            </div>
        </div>
    );
};

export default HomePage;
