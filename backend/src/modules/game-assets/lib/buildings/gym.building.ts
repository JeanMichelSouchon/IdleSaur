import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Bâtiment "Gym" (Salle de sport)
 * Entraîne votre dinosaure pour améliorer son énergie.
 */
export const gymBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "Gym",
    description: "Entraîne votre dinosaure pour améliorer son énergie.",
    price: 700,
    minLevelToBuy: 4,
    maxLevel: 5,
    improvementTree: [
      {
        id: 1,
        name: "Entraînement de Base",
        description: "Augmente la récupération d'énergie de 10%.",
        cost: 350,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "energy_recovery_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 2,
        name: "Conditionnement Avancé",
        description: "Augmente la récupération d'énergie de 15%.",
        cost: 500,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "energy_recovery_multiplier", type: "additive", value: 0.15 }
        ]
      },
      {
        id: 3,
        name: "Système de Récupération Optimisé",
        description: "Multiplie la récupération d'énergie par 1.2.",
        cost: 800,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "energy_recovery_multiplier", type: "multiplicative", value: 1.2 }
        ]
      },
      {
        id: 4,
        name: "Programme de Renforcement Intensif",
        description: "Augmente l'énergie maximale de 10%.",
        cost: 1000,
        prerequisites: [2, 3],
        statModifiers: [
          { source: "building", target: "base_max_energy", type: "additive", value: 500 }
        ]
      },
      {
        id: 5,
        name: "Optimisation Globale",
        description: "Augmente la récupération d'énergie et l'énergie maximale de façon significative.",
        cost: 1500,
        prerequisites: [4],
        statModifiers: [
          { source: "building", target: "energy_recovery_multiplier", type: "additive", value: 0.2 },
          { source: "building", target: "base_max_energy", type: "additive", value: 800 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "base_max_energy", type: "additive", value: 3000 },
      { source: "building", target: "energy_recovery_multiplier", type: "additive", value: 0.2 }
    ]
  }
];
