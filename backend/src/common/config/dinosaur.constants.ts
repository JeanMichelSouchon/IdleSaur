/**
 * Fichier regroupant les constantes de base pour les dinosaures.
 * Ces valeurs servent de référence pour le calcul des valeurs finales et sont
 * utilisées lors de la création d'un dinosaure.
 */
export const DINOSAUR_CONSTANTS = {
  // energie
    BASE_MAX_ENERGY: 5000,
    ENERGY_DECAY_PER_SECOND: 80,
    ENERGY_RECOVERY_PER_SECOND: 500,
    INITIAL_ENERGY: 5000,
  // nourriture
    BASE_MAX_FOOD: 5000,
    INITIAL_FOOD: 7500,
    BASE_MAX_HUNGER: 5000,
  // faim
    INITIAL_HUNGER: 0,
    HUNGER_INCREASE_PER_SECOND: 50,
    HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY: 250,
    // Karma system constants
    KARMA_REDUCTION_FACTOR_AFTER_DEATH: 0.5,
    KARMA_GAIN_AFTER_DEATH_REDUCTION: 500,
    KARMA_WIDTH: 100000,
    // AfterLife system constants
    EXP_TO_SOUL_POINTS_CONVERSION_RATIO: 0.1,
  // Limits for Sleeping and Waking Conditions
    MIN_ENERGY_TO_WAKE_UP: 1000,
    // Age
    INITIAL_AGE_FACTOR: 5000,
  };
  