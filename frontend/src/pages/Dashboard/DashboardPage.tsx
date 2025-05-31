import React, { useEffect, useState } from 'react';
import { fetchDinosaurActions, getNextLevelXp } from '../../services/dinosaurService';
import DinosaurInfo from '../../components/Dashboard/DinosaurInfo';
import Actions, { ActionDetail } from '../../components/Dashboard/Actions';
import EventOverlay from '../../components/Dashboard/EventOverlay';
import Header from '../../components/Common/Header';
import Footer from '../../components/Common/Footer';
import './DashboardPage.css';
import { User } from '../../types/User';
import { Dinosaur } from '../../types/Dinosaur';
import { fetchDinosaurFromBackend, fetchUserFromBackend } from '../../services/authService';
import BackgroundOverlay from '../../components/Dashboard/BackgroundOverlay';
import Gauge_XP from '../../components/Dashboard/utils/Gauge_XP';
import { DinosaurEvent } from '../../types/DinosaurEvent';
import DinoDisplay from '../../components/Dashboard/DinoDisplay';
import { useOverlay } from '../../contexts/OverlayContext';
import RankingOverlay from '../../components/Dashboard/overlays/RankingOverlay';
import DinoSoulOverlay from '../../components/Dashboard/overlays/DinoSoulOverlay';

/**
 * Composant fonctionnel représentant la page Dashboard.
 * Affiche les informations de l'utilisateur, les informations du dinosaure, et les actions possibles.
 */
const DashboardPage: React.FC = () => {
    // États pour stocker les informations de l'utilisateur et du dinosaure
    const [user, setUser] = useState<User | null>(null);
    const [max_experience, setMAX_XP] = useState<number>(0);
    const [dinosaur, setDinosaur] = useState<Dinosaur | null>(null);
    const [availableActions, setAvailableActions] = useState<ActionDetail[]>([]); // État pour les actions
    const [lastEvent, setLastEvent] = useState<DinosaurEvent | null>(null); // État pour l'événement affiché
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false); // Overlay pour les infos du dinosaure en mobile
    const [isActionInProgress, setIsActionInProgress] = useState<ActionDetail | null>(null); // État pour l'animation du dinosaure
    const [levelUp, setLevelUp] = useState<boolean>(false);
  
    // Récupération du contexte d'overlays (pour Inventaire, Bâtiments, Shop, etc.)
    const { currentOverlay, closeOverlay, openOverlay, statDetailTarget } = useOverlay();

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
            // Supposons que l'API retourne un objet { nextLevelXp: 1000 }
            // Extraire directement la valeur numérique
            const maxExperience = maxExperienceResponse.nextLevelXp;

            // Mise à jour des états avec les données récupérées
            setMAX_XP(maxExperience);
            setUser(fetchedUser);
            setDinosaur(fetchedDinosaur);
            setAvailableActions(fetchedActions.availableActions);
        } catch (error) {
            console.error("Erreur lors de l'initialisation de la page :", error);
            // Optionnel : Rediriger vers la page d'accueil ou afficher un message d'erreur
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
            const maxExperience = maxExperienceResponse.nextLevelXp;

            if (dinosaur && updatedDinosaur.level > dinosaur.level) {           
                setDinosaur(updatedDinosaur);
                setLevelUp(true);
                setTimeout(() => {
                    setLevelUp(false);
                }, 2000); // Durée de l'animation
            }              

            setDinosaur(updatedDinosaur);
            setAvailableActions(updatedActions.availableActions);
            setMAX_XP(maxExperience);
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
    }, []);

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
                    {dinosaur && <DinosaurInfo dinosaur={dinosaur} />}
                </div>
                {/* Section Middle contenant la barre XP et l'image du dinosaure */}
                <div id="Middle">
                    <div className="topMiddle">
                        {/* Jauge XP avec infobulle pour le multiplicateur d'expérience */}
                        <Gauge_XP
                            label={`level: ${dinosaur ? dinosaur.level : "NaN"}`}
                            current={experience}
                            max={max_experience}
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
                        {/* Insertion des icones de toogle d'overlays */}
                        {dinosaur 
                        && (
                            <div className="overlay-icons-bar">

                            {/* 1) Dino Soul Overlay */}
                            {/* <span
                                className="overlay-icon"
                                onClick={() => openOverlay('dino-soul')}
                                title="Dino Soul"
                            >
                                💀
                            </span> */}
                            </div>
                        )}
                        {/* La div "middleContent" reçoit un style inline pour position relative */}
                        <div className="middleContent">
                            {/* Affichage conditionnel de l'image du dinosaure selon son régime alimentaire et son type */}
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
                    {/* Affichage conditionnel du composant Actions */}
                    {dinosaur && (
                        <Actions
                            dinosaur={dinosaur}
                            refreshDinosaur={refreshDinosaur}
                            availableActions={availableActions}
                            onActionEvent={handleEventDisplay}
                            onActionStart={handleActionStart} // Nouvelle prop
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

            {/* Overlay pour afficher les informations des viues passées du dino (DinoSoulOverlay) */}
            {currentOverlay === 'dino-soul' && dinosaur && (
                <DinoSoulOverlay 
                  dinosaur={dinosaur} 
                  onClose={closeOverlay} 
                  active={true}
                />
            )}
            {currentOverlay === 'ranking' && dinosaur && (
                <RankingOverlay onClose={closeOverlay} active />
            )}

        </>
    );
};

export default DashboardPage;
