import React, { useEffect, useState } from 'react';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import { changeDinoName, fetchDinosaurFromBackend, fetchUserFromBackend, resetPassword } from '../../services/authService';
import { User } from '../../types/User';
import { Dinosaur } from '../../types/Dinosaur';
import './UserProfilePage.css';

const UserProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [dinosaur, setDinosaur] = useState<Dinosaur | null>(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [changedDinoName, setDinoName] = useState('');

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const fetchedUser = await fetchUserFromBackend();
                const fetchedDinosaur = await fetchDinosaurFromBackend();
                setUser(fetchedUser);
                setDinosaur(fetchedDinosaur);
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur :', error);
            }
        };
        initializeUser();
    }, []);

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setPasswordError('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }

        resetPassword({ email: user?.email, currentPassword, newPassword });
        console.log("Mot de passe changé avec succès !");
        
        setPasswordError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleDinoNameChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await changeDinoName({ name: changedDinoName });
            console.log("Nom du dinosaure changé avec succès !");
            setDinoName('');
        } catch (error) {
            console.error("Erreur lors du changement de nom du dinosaure :", error);
        }
    };

    return (
        <>
            <div id="main2">
                <Header />
                <div id='container'>
                {/* Informations utilisateur */}
                <div className="user-info-container">
                    <h2>Profil Utilisateur</h2>
                    {user ? (
                        <div className="user-details">
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Nom d'utilisateur:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Date de création:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                    ) : (
                        <p>Chargement des informations...</p>
                    )}
                </div>

                {/* Modification du mot de passe */}
                <div className="password-change-container">
                    <h2>Changer le mot de passe</h2>
                    <form onSubmit={handlePasswordChange}>
                        <label>
                            <p>Ancien mot de passe :</p>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <p>Nouveau mot de passe :</p>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <p>Confirmer le nouveau mot de passe :</p>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                            />
                        </label>
                        {passwordError && <p className="error">{passwordError}</p>}
                        <button type="submit">Modifier le mot de passe</button>
                    </form>
                </div>

                {/* Modification du nom du dinosaure */}
                <div className="dino-name-change-container">
                    <h2>Dinosaure</h2>
                    <p><strong>Nom du Dinosaure : </strong> {dinosaur?.name}</p>
                    <form onSubmit={handleDinoNameChange}>
                        <label>
                            <p>Nouveau Nom :</p>
                            <input
                                type="text"
                                value={changedDinoName}
                                onChange={(e) => setDinoName(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Modifier le nom</button>
                    </form>
                </div>
                </div>
                

                <Footer />
            </div>
        </>
    );
};

export default UserProfilePage;
