import { DinosaurBuildingDTO } from '../../models/dinosaur-building.dto';

/**
 * Bâtiment "Shaolin Temple"
 * Temple légendaire offrant des entraînements d'exception, améliorant les points de compétence et réduisant la faim et la dégradation énergétique.
 */
export const shaolinTempleBuilding: DinosaurBuildingDTO[] = [
  {
    id: 0,
    name: "Shaolin Temple",
    description: "Un temple légendaire offrant des entraînements d'exception.",
    price: 2000,
    minLevelToBuy: 8,
    maxLevel: 5,
    improvementTree: [
      {
        id: 1,
        name: "Meditative Focus",
        description: "Réduit l'augmentation de la faim de 10% et diminue l'usure énergétique de 10%.",
        cost: 1000,
        prerequisites: [],
        statModifiers: [
          { source: "building", target: "hunger_increase_multiplier", type: "additive", value: -0.1 },
          { source: "building", target: "energy_decay_multiplier", type: "additive", value: -0.1 }
        ]
      },
      {
        id: 2,
        name: "Martial Discipline",
        description: "Réduit l'augmentation de la faim de 15% et diminue l'usure énergétique de 15%.",
        cost: 1500,
        prerequisites: [1],
        statModifiers: [
          { source: "building", target: "hunger_increase_multiplier", type: "additive", value: -0.15 },
          { source: "building", target: "energy_decay_multiplier", type: "additive", value: -0.15 }
        ]
      },
      {
        id: 3,
        name: "Shaolin Mastery",
        description: "Donne un boost exceptionnel aux points de compétence tout en réduisant encore la faim et l'usure.",
        cost: 2500,
        prerequisites: [2],
        statModifiers: [
          { source: "building", target: "earn_skill_point_multiplier", type: "additive", value: 0.2 },
          { source: "building", target: "hunger_increase_multiplier", type: "additive", value: -0.1 },
          { source: "building", target: "energy_decay_multiplier", type: "additive", value: -0.1 }
        ]
      },
      {
        id: 4,
        name: "Zen Enlightenment",
        description: "Améliore tous les aspects de la condition physique et mentale.",
        cost: 3000,
        prerequisites: [3],
        statModifiers: [
          { source: "building", target: "earn_skill_point_multiplier", type: "additive", value: 0.15 },
          { source: "building", target: "hunger_increase_multiplier", type: "additive", value: -0.05 },
          { source: "building", target: "energy_decay_multiplier", type: "additive", value: -0.05 }
        ]
      }
    ],
    statModifiers: [
      { source: "building", target: "earn_skill_point_multiplier", type: "additive", value: 0.3 },
      { source: "building", target: "hunger_increase_multiplier", type: "additive", value: -0.2 },
      { source: "building", target: "energy_decay_multiplier", type: "additive", value: -0.2 }
    ]
  }
];
