import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Définition par défaut d'un bâtiment "Pasture" pour les carnivores.
 */
export const pastureBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "Pasture",
    description: "Aide à récolter de la nourriture carnivore pour votre dinosaure.",
    price: 500,
    minLevelToBuy: 5,
    maxLevel: 6,
    improvementTree: [
      {
        id: 1,
        name: "Abattage Basique",
        description: "Augmente la quantité de viande récoltée de 10%.",
        cost: 300,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 2,
        name: "Boucherie Artisanale",
        description: "Augmente la quantité de viande récoltée de 5%.",
        cost: 200,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "additive", value: 0.05 }
        ]
      },
      {
        id: 3,
        name: "Abattoir Moderne",
        description: "Augmente la quantité de viande récoltée de 5%.",
        cost: 200,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "additive", value: 0.05 }
        ]
      },
      {
        id: 4,
        name: "Expansion des Installations",
        description: "Augmente l'efficacité globale de la récolte de viande de 100%.",
        cost: 800,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "multiplicative", value: 1 },
          { source: "building", target: "food_production", type: "additive", value: 1 }
        ]
      },
      {
        id: 5,
        name: "Technologie d'Abattage Avancée",
        description: "Augmente la quantité de viande récoltée de 10%.",
        cost: 600,
        prerequisites: [4],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 6,
        name: "Coopérative Boucherie",
        description: "Augmente l'efficacité globale de la récolte de viande de 200%.",
        cost: 3000,
        prerequisites: [5, 2, 3],
        statModifiers: [
          { source: "building", target: "earn_food_carni_multiplier", type: "multiplicative", value: 2 },
          { source: "building", target: "food_production", type: "additive", value: 3 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "base_max_food", type: "additive", value: 10000 },
      { source: "building", target: "earn_food_carni_multiplier", type: "additive", value: 0.5 },
      { source: "building", target: "food_production", type: "additive", value: 1 }
    ]
  }
];
