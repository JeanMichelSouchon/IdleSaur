import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Bâtiment "Place of Worship"
 * Un lieu sacré pour renforcer le karma de votre dinosaure.
 */
export const worshipBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "Place of Worship",
    description: "Un lieu sacré pour renforcer le karma de votre dinosaure.",
    price: 900,
    minLevelToBuy: 5,
    maxLevel: 5,
    improvementTree: [
      {
        id: 1,
        name: "Prières Basique",
        description: "Augmente le karma gagné de 10%.",
        cost: 450,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "earn_karma_multiplier", type: "additive", value: 0.1 }
        ]
      },
      {
        id: 2,
        name: "Méditation Spirituelle",
        description: "Augmente le karma gagné de 15%.",
        cost: 600,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_karma_multiplier", type: "additive", value: 0.15 }
        ]
      },
      {
        id: 3,
        name: "Rituels Sacrés",
        description: "Multiplie le karma gagné par 1.2.",
        cost: 800,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "earn_karma_multiplier", type: "multiplicative", value: 1.2 }
        ]
      },
      {
        id: 4,
        name: "Sermon Inspirant",
        description: "Augmente globalement le karma gagné de 10%.",
        cost: 1000,
        prerequisites: [2, 3],
        statModifiers: [
          { source: "building", target: "earn_karma_multiplier", type: "additive", value: 0.1 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "earn_karma_multiplier", type: "additive", value: 0.25 }
    ]
  }
];
