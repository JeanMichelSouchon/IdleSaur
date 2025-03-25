import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import { fetchDinosaurActions, getNextLevelXp } from '../../services/dinosaurService';
import DinosaurInfo from '../../components/Dashboard/DinosaurInfo';
import Actions, { ActionDetail } from '../../components/Dashboard/Actions';
import EventOverlay from '../../components/Dashboard/EventOverlay';
import './DashboardPage.css';
import { User } from '../../types/User';
import { Dinosaur } from '../../types/Dinosaur';
import { fetchDinosaurFromBackend, fetchUserFromBackend } from '../../services/authService';
import BackgroundOverlay from '../../components/Dashboard/BackgroundOverlay';
import Gauge_XP from '../../components/Dashboard/utils/Gauge_XP';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import DinoDisplay from '../../components/Dashboard/DinoDisplay';
import { useOverlay } from '../../contexts/OverlayContext';
import InventoryOverlay from '../../components/Dashboard/overlays/InventoryOverlay';
import BuildingsOverlay from '../../components/Dashboard/overlays/BuildingsOverlay';
import ShopOverlay from '../../components/Dashboard/overlays/ShopOverlay';
import RankingOverlay from '../../components/Dashboard/overlays/RankingOverlay';
import PvpOverlay from '../../components/Dashboard/overlays/PvpOverlay';
import ClickableStatDetailOverlay from '../../components/Dashboard/overlays/ClickableStatDetailOverlay';
import DinoSoulOverlay from '../../components/Dashboard/overlays/DinoSoulOverlay';

/**
 * Composant fonctionnel représentant la page Dashboard.
 * Affiche les informations de l'utilisateur, les informations du dinosaure, et les actions possibles.
 */
const DashboardPage: React.FC = () => {
    // États pour stocker les informations de l'utilisateur et du dinosaure
    const [user, setUser] = useState<User | null>(null);
    const [maxExperience, setMaxExperience] = useState<number>(0);
    const [dinosaur, setDinosaur] = useState<Dinosaur | null>(null);
    const [availableActions, setAvailableActions] = useState<ActionDetail[]>([]);
    const [lastEvent, setLastEvent] = useState<DinosaurEvent | null>(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const [isActionInProgress, setIsActionInProgress] = useState<ActionDetail | null>(null);
    const [levelUp, setLevelUp] = useState<boolean>(false);

    // Récupération du contexte d'overlays (pour Inventaire, Bâtiments, Shop, etc.)
    const { currentOverlay, closeOverlay, openOverlay, statDetailTarget } = useOverlay();
    const navigate = useNavigate();

    const initializePage = async () => {
        try {
            // Récupération des données utilisateur depuis le backend
            const fetchedUser = await fetchUserFromBackend();
            // Récupération des données dinosaure depuis le backend
            const fetchedDinosaur = await fetchDinosaurFromBackend();
            // Récupération des actions disponibles depuis le backend
            const fetchedActions = await fetchDinosaurActions();
            // Récupération de l'expérience maximale du prochain niveau
            const maxExperienceResponse = await getNextLevelXp();

            // Mise à jour des états avec les données récupérées
            setUser(fetchedUser);
            setDinosaur(fetchedDinosaur);
            setAvailableActions(fetchedActions.availableActions);
            setMaxExperience(maxExperienceResponse.nextLevelXp);
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la page :", error);
            // Optionnel : rediriger ou afficher une alerte
        }
    };

    /**
     * Fonction asynchrone pour rafraîchir les données du dinosaure et les actions disponibles.
     */
    const refreshDinosaur = async () => {
        try {
            const updatedDinosaur = await fetchDinosaurFromBackend();
            const updatedActions = await fetchDinosaurActions();
            const maxExperienceResponse = await getNextLevelXp();
            const maxXP = maxExperienceResponse.nextLevelXp;

            if (dinosaur && updatedDinosaur.level > dinosaur.level) {           
                setDinosaur(updatedDinosaur);
                setLevelUp(true);
                setTimeout(() => {
                    setLevelUp(false);
                }, 2000); // Durée de l'animation
            }              

            setDinosaur(updatedDinosaur);
            setAvailableActions(updatedActions.availableActions);
            setMaxExperience(maxXP);
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données du dinosaure :', error);
        }
    };

    /**
     * Fonction pour gérer l'affichage de l'événement.
     * @param event L'événement à afficher.
     */
    const handleEventDisplay = (event: DinosaurEvent) => {
        setTimeout(() => {
            setLastEvent(event);
            setIsActionInProgress(null); // Arrête l'animation du dinosaure
            // Cache l'overlay après 3 secondes
            setTimeout(() => setLastEvent(null), 2500);
        }, 500);
    };

    /**
     * Fonction pour indiquer le début d'une action.
     */
    const handleActionStart = (action: ActionDetail) => {
        setIsActionInProgress(action); // Démarre l'animation du dinosaure
    };

    // Initialiser les données au montage du composant
    useEffect(() => {
        initializePage();
    }, []);

    // Mettre en place un intervalle qui rafraîchit les données toutes les 1,1 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            if(isActionInProgress || levelUp) {
                return; // Pour éviter les conflits
            }
            refreshDinosaur();
        }, 1100);
        return () => clearInterval(interval);
    }, [isActionInProgress, levelUp, dinosaur]);

    // Calcul de l'expérience actuelle pour la jauge
    const experience = dinosaur ? dinosaur.experience : 0;

    return (
        <>
            {/* Overlay d'image dynamique */}
            {dinosaur && (
                <BackgroundOverlay 
                    dinosaur={dinosaur} 
                    action={isActionInProgress} 
                    lastEvent={lastEvent} 
                    levelUp={levelUp}
                />
            )}
            {/* Composant Header commun à toutes les pages */}
            <Header />
            {/* Conteneur principal de la page Dashboard */}
            <div id="main">
                {/* Section Infos contenant les informations de l'utilisateur et du dinosaure */}
                <div id="Infos" className="desktop-only">
                    {user && (
                        <div className="user-info">
                            <p>Bienvenue, {user.username} !</p>
                            {/* Bouton d'accès à l'administration pour les utilisateurs admin */}
                            {user.isAdmin && (
                                <button
                                    className="admin-access-btn"
                                    onClick={() => navigate('/admin')}
                                >
                                    Accéder à l'administration
                                </button>
                            )}
                        </div>
                    )}
                    {dinosaur && <DinosaurInfo dinosaur={dinosaur} />}
                </div>

                {/* Section Middle contenant la barre XP et l'image du dinosaure */}
                <div id="Middle">
                    <div className="topMiddle">
                        {/* Jauge XP avec infobulle pour le multiplicateur d'expérience */}
                        <Gauge_XP
                            label={`level: ${dinosaur ? dinosaur.level : "NaN"}`}
                            current={experience}
                            max={maxExperience}
                            color="blue"
                        />
                        {/* Bouton pour afficher l'overlay en mode mobile */}
                        <button
                            className="mobile-only overlay-button"
                            onClick={() => setIsOverlayVisible(true)}
                        >
                            Voir infos du dinosaure
                        </button>
                    </div>
                    <div className="bottomMiddle" style={{ position: 'relative' }}>
                        {/* Insertion des icônes de toggle d'overlays */}
                        {dinosaur && (
                            <div className="overlay-icons-bar">
                                {/* 1) Dino Soul Overlay */}
                                <span
                                    className="overlay-icon"
                                    onClick={() => openOverlay('dino-soul')}
                                    title="Dino Soul"
                                >
                                    💀
                                </span>
                                {/* 2) Inventaire */}
                                <span
                                    className="overlay-icon"
                                    onClick={() => openOverlay('inventory')}
                                    title="Inventaire"
                                >
                                    👜
                                </span>
                                {/* 3) Bâtiments */}
                                <span
                                    className="overlay-icon"
                                    onClick={() => openOverlay('buildings')}
                                    title="Bâtiments"
                                >
                                    🏠
                                </span>
                                {/* 4) Shop */}
                                <span
                                    className="overlay-icon"
                                    onClick={() => openOverlay('shop')}
                                    title="Boutique"
                                >
                                    🛒
                                </span>
                            </div>
                        )}
                        <div className="middleContent">
                            {/* Affichage conditionnel de l'image du dinosaure */}
                            {dinosaur && (
                                <DinoDisplay 
                                    dinosaur={dinosaur} 
                                    action={isActionInProgress} 
                                    lastEvent={lastEvent}
                                    levelUp={levelUp}
                                />
                            )}
                            {/* Affichage de l'overlay si un événement est présent */}
                            {lastEvent && <EventOverlay event={lastEvent} />}
                        </div>
                    </div>
                </div>

                {/* Section Actions */}
                <div id="Actions">
                    {dinosaur && (
                        <Actions
                            dinosaur={dinosaur}
                            refreshDinosaur={refreshDinosaur}
                            availableActions={availableActions}
                            onActionEvent={handleEventDisplay}
                            onActionStart={handleActionStart}
                        />
                    )}
                </div>
            </div>
            <Footer />

            {/* Overlay pour afficher les informations du dinosaure en mode mobile */}
            {isOverlayVisible && (
                <div className="overlay active">
                    <div className="overlay-content">
                        <span
                            className="close-button"
                            onClick={() => setIsOverlayVisible(false)}
                        >
                            &times;
                        </span>
                        {dinosaur && <DinosaurInfo dinosaur={dinosaur} />}
                    </div>
                </div>
            )}

            {/* Overlays déclenchés via le Header */}
            {currentOverlay === 'dino-soul' && dinosaur && (
                <DinoSoulOverlay 
                  dinosaur={dinosaur} 
                  onClose={closeOverlay} 
                  active={true}
                />
            )}
            {currentOverlay === 'inventory' && dinosaur && (
                <InventoryOverlay 
                  dinosaur={dinosaur}
                  onDinosaurUpdate={setDinosaur}
                  onClose={closeOverlay}
                  active={true}
                />
            )}
            {currentOverlay === 'buildings' && dinosaur && (
                <BuildingsOverlay 
                  dinosaur={dinosaur}
                  onDinosaurUpdate={setDinosaur}
                  onClose={closeOverlay}
                  active={true}
                />
            )}
            {currentOverlay === 'shop' && dinosaur && user && (
                <ShopOverlay 
                  onDinosaurUpdate={setDinosaur} 
                  active={true}
                  dinosaur={dinosaur}
                  user={user}
                />
            )}
            {currentOverlay === 'ranking' && dinosaur && (
                <RankingOverlay onClose={closeOverlay} active />
            )}
            {currentOverlay === 'pvp' && dinosaur && (
                <PvpOverlay onClose={closeOverlay} active />
            )}
            {currentOverlay === 'stat-detail' && dinosaur && statDetailTarget && (
                <ClickableStatDetailOverlay 
                  dinosaur={dinosaur} 
                  target={statDetailTarget} 
                  onClose={closeOverlay}
                />
            )}
        </>
    );
};

export default DashboardPage;
