import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Bâtiment "University"
 * Fournit une éducation avancée pour booster l'expérience et les gains monétaires.
 */
export const universityBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "University",
    description: "Fournit une éducation avancée pour booster l'expérience et les gains monétaires.",
    price: 1000,
    minLevelToBuy: 5,
    maxLevel: 5,
    improvementTree: [
      {
        id: 1,
        name: "Cours Fondamentaux",
        description: "Augmente l'expérience gagnée de 10%.",
        cost: 500,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_experience_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 2,
        name: "Séminaires Avancés",
        description: "Augmente les gains monétaires de 10%.",
        cost: 600,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_money_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 3,
        name: "Ateliers Pratiques",
        description: "Augmente l'expérience gagnée de 5% supplémentaires.",
        cost: 400,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_experience_multiplier", type: "additive", value: 0.05 }
        ]
      },
      {
        id: 4,
        name: "Double Diplôme",
        description: "Multiplie les gains monétaires par 1.2.",
        cost: 800,
        prerequisites: [2],
        statModifiers: [
          { source: "building", target: "earn_money_multiplier", type: "multiplicative", value: 1.2 }
        ]
      },
      {
        id: 5,
        name: "Formation d'Elite",
        description: "Augmente globalement l'expérience et la monnaie gagnée.",
        cost: 1200,
        prerequisites: [3, 4],
        statModifiers: [
          { source: "building", target: "earn_experience_multiplier", type: "additive", value: 0.1 },
          { source: "building", target: "earn_money_multiplier", type: "additive", value: 0.1 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "earn_experience_multiplier", type: "additive", value: 0.2 },
      { source: "building", target: "earn_money_multiplier", type: "additive", value: 0.2 }
    ]
  }
];
