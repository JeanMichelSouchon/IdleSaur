import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Définition par défaut d'un bâtiment "Jardin" pour les herbivores.
 */
export const gardenBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "Jardin",
    description: "Aide à récolter de la nourriture végétarienne pour votre dinosaure.",
    price: 500,
    minLevelToBuy: 5,
    maxLevel: 6,
    improvementTree: [
      {
        id: 1,
        name: "Irrigation",
        description: "Augmente la quantité de végétaux récoltés de 10%.",
        cost: 250,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 2,
        name: "Permaculture",
        description: "Augmente la quantité de végétaux récoltés de 5%.",
        cost: 150,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "additive", value: 0.05 }
        ]
      },
      {
        id: 3,
        name: "Animaux fermiers",
        description: "Augmente la quantité de végétaux récoltés de 5%.",
        cost: 150,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "additive", value: 0.05 }
        ]
      },
      {
        id: 4,
        name: "Augmentation de la surface",
        description: "Augmente l'efficacité globale de la récolte de végétaux de 100%.",
        cost: 750,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "multiplicative", value: 1 },
          { source: "building", target: "food_production", type: "additive", value: 1 }
        ]
      },
      {
        id: 5,
        name: "Irrigation lvl2",
        description: "Augmente la quantité de végétaux récoltés de 10%.",
        cost: 500,
        prerequisites: [4],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 6,
        name: "Coopérative agricole",
        description: "Augmente l'efficacité globale de la récolte de végétaux de 200%.",
        cost: 2500,
        prerequisites: [5, 2, 3],
        statModifiers: [
          { source: "building", target: "earn_food_herbi_multiplier", type: "multiplicative", value: 2 },
          { source: "building", target: "food_production", type: "additive", value: 3 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "base_max_food", type: "additive", value: 10000 },
      { source: "building", target: "earn_food_herbi_multiplier", type: "additive", value: 0.5 },
      { source: "building", target: "food_production", type: "additive", value: 1 }
    ]
  }
];
