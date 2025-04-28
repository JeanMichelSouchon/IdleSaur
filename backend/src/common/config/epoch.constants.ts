import { DINOSAUR_CONSTANTS } from "./dinosaur.constants";

// Definition des constantes pour les paliers
export const EPOCH_CONSTANTS = {
    MIN_EPOCH_DURATION: 30000 * DINOSAUR_CONSTANTS.INITIAL_AGE_FACTOR,      // Durée minimale de chaque palier en ms 
    MAX_EPOCH_DURATION: 300000 * DINOSAUR_CONSTANTS.INITIAL_AGE_FACTOR,     // Durée maximale que chaque en ms
    CURVE_STEEPNESS: 1.5,        // Facteur de contrôle pour la progression de la courbe 
    };


